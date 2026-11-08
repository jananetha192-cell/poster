/* జననేత అడ్మిన్ టెంప్లేట్లు - భాగస్వామ్య Firebase REST సహాయకులు.
   Client config is public by Firebase design; security is enforced by
   Firestore rules (public read of template collections, admin-only write). */
window.JNFS_REAL=true;
window.JNFS=(function(){
var CFG={
  apiKey:"AIzaSyCLFMhrft4jp1edqecniq_yhrBFGA3hxR8",
  projectId:"jananeta-ec844",
  appId:"1:546582934492:web:1ca0c8a38ceb763455d519"
};
var BASE='https://firestore.googleapis.com/v1/projects/'+CFG.projectId+'/databases/(default)/documents';
var AUTH='https://identitytoolkit.googleapis.com/v1';
var TOKEN_URL='https://securetoken.googleapis.com/v1/token';

function qs(extra){return 'key='+CFG.apiKey+(extra||'')}
function tok(){try{return JSON.parse(localStorage.getItem('jn_admin_tok')||'null')}catch(e){return null}}
function saveTok(t){try{localStorage.setItem('jn_admin_tok',JSON.stringify(t))}catch(e){}}
function clearTok(){try{localStorage.removeItem('jn_admin_tok')}catch(e){}}

function saveSess(j){saveTok({id:j.idToken,ref:j.refreshToken,exp:Date.now()+ (parseInt(j.expiresIn,10)||3600)*1000 - 60000, email:j.email, uid:j.localId});return j.email}
function badCreds(){return new Error('ఇమెయిల్ లేదా పాస్‌వర్డ్ సరికాదు')}
function signIn(email,password){
  return fetch(AUTH+'/accounts:signInWithPassword?'+qs(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email,password:password,returnSecureToken:true})})
    .then(function(r){return r.json()}).then(function(j){
      if(!j.error)return saveSess(j);
      var m=j.error.message||'';
      if(m.indexOf('INVALID')>=0||m.indexOf('EMAIL_NOT_FOUND')>=0){
        // first run: create the admin account with these credentials, then signed in
        return fetch(AUTH+'/accounts:signUp?'+qs(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email,password:password,returnSecureToken:true})})
          .then(function(r2){return r2.json()}).then(function(j2){
            if(j2.error){var m2=j2.error.message||'';throw (m2.indexOf('EMAIL_EXISTS')>=0?badCreds():new Error(m2))}
            return saveSess(j2);
          });
      }
      throw new Error(m);
    });
}
function refresh(){
  var t=tok(); if(!t)return Promise.reject(new Error('no-token'));
  if(Date.now()<t.exp)return Promise.resolve(t.id);
  return fetch(TOKEN_URL+'?'+qs(),{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=refresh_token&refresh_token='+encodeURIComponent(t.ref)})
    .then(function(r){return r.json()}).then(function(j){
      if(j.error||!j.id_token){clearTok();throw new Error('session-expired')}
      saveTok({id:j.id_token,ref:j.refresh_token,exp:Date.now()+(parseInt(j.expires_in,10)||3600)*1000-60000,email:t.email});
      return j.id_token;
    });
}
function signedInEmail(){var t=tok();return t&&Date.now()<t.exp?t.email:null}

function docToFields(d){var o={},f=d.fields||{};for(var k in f){var v=f[k];o[k]=v.stringValue!==undefined?v.stringValue:(v.integerValue!==undefined?+v.integerValue:(v.booleanValue!==undefined?v.booleanValue:(v.timestampValue||null)))}return o}
function fieldsToDoc(o){var f={};for(var k in o){var v=o[k];f[k]=typeof v==='number'?{integerValue:String(v)}:(typeof v==='boolean'?{booleanValue:v}:{stringValue:String(v)})}return {fields:f}}

function readDoc(coll,id){
  return fetch(BASE+'/'+coll+'/'+id+'?'+qs()).then(function(r){
    if(r.status===404)return null;
    return r.json().then(function(j){if(j.error)throw new Error(j.error.message);return docToFields(j)});
  });
}
function listColl(coll){
  return fetch(BASE+'/'+coll+'?'+qs('&pageSize=300')).then(function(r){return r.json()}).then(function(j){
    if(j.error)throw new Error(j.error.message);
    return (j.documents||[]).map(function(d){var o=docToFields(d);o.__id=d.name.split('/').pop();return o});
  });
}
function writeDoc(coll,id,obj){
  return refresh().then(function(idTok){
    return fetch(BASE+'/'+coll+'/'+id+'?'+qs(),{method:'PATCH',headers:{'Content-Type':'application/json',Authorization:'Bearer '+idTok},body:JSON.stringify(fieldsToDoc(obj))})
      .then(function(r){return r.json()}).then(function(j){if(j.error)throw new Error(j.error.message);return true});
  });
}
function deleteDoc(coll,id){
  return refresh().then(function(idTok){
    return fetch(BASE+'/'+coll+'/'+id+'?'+qs(),{method:'DELETE',headers:{Authorization:'Bearer '+idTok}})
      .then(function(r){if(!r.ok&&r.status!==404)return r.json().then(function(j){throw new Error((j.error&&j.error.message)||'delete-failed')});return true});
  });
}
function bumpManifest(){return writeDoc('jn_meta','manifest',{v:Date.now()})}
function manifest(){
  return readDoc('jn_meta','manifest').then(function(d){return d?d.v:0}).catch(function(){return -1});
}

/* Registry with a manifest-version check: 1 small read per visit when nothing changed. */
var CKEY='jn_reg_cache_v1';
function registry(force){
  return manifest().then(function(v){
    var c=null;try{c=JSON.parse(localStorage.getItem(CKEY)||'null')}catch(e){}
    if(!force&&c&&c.v===v&&v>=0)return c.items;
    return listColl('jn_templates').then(function(items){
      items=items.filter(function(t){return t.live!==false}).sort(function(a,b){return (b.created||0)-(a.created||0)});
      try{localStorage.setItem(CKEY,JSON.stringify({v:v,items:items}))}catch(e){}
      return items;
    });
  });
}
function getArtDataUrl(id){
  return readDoc('jn_art',id).then(function(d){if(!d||!d.art)throw new Error('art-missing');return d.art});
}
return {CFG:CFG,signIn:signIn,signedInEmail:signedInEmail,signOut:clearTok,registry:registry,getArtDataUrl:getArtDataUrl,writeDoc:writeDoc,deleteDoc:deleteDoc,bumpManifest:bumpManifest,listColl:listColl};
})();
