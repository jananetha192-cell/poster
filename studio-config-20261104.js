// Local profile only. No authentication or private cloud profile access.
window.JN_GUEST_MODE=true;
(function(){
 'use strict';
 var dbp=null,blocked=false,queue=Promise.resolve(),owner='local-profile';
 function db(){if(!dbp)dbp=new Promise(function(resolve,reject){var r=indexedDB.open('jananetha-local-profile-v1',1);r.onupgradeneeded=function(){r.result.createObjectStore('profile')};r.onsuccess=function(){resolve(r.result)};r.onerror=function(){reject(r.error)};r.onblocked=function(){reject(Error('storage-blocked'))}});return dbp}
 async function read(){var d=await db();return new Promise(function(resolve,reject){var tx=d.transaction('profile','readonly'),r=tx.objectStore('profile').get('current');r.onsuccess=function(){resolve(r.result||{main:null,assets:{}})};r.onerror=function(){reject(r.error)}})}
 async function write(value){var d=await db();return new Promise(function(resolve,reject){var tx=d.transaction('profile','readwrite');tx.objectStore('profile').put(value,'current');tx.oncomplete=function(){resolve()};tx.onerror=tx.onabort=function(){reject(tx.error||Error('storage-write-failed'))}})}
 function check(uid){if(uid!==owner)throw Error('local-only')}
 window.JN_TEST_STORE={onAuth:async function(cb){await cb({uid:owner,name:''})},signIn:async function(){},signOut:async function(){},getMain:async function(uid){check(uid);return (await read()).main},getAsset:async function(uid,k){check(uid);return (await read()).assets[k]||null},saveMain:async function(){throw Error('local-batch-required')},saveAsset:async function(){throw Error('local-batch-required')}};
 window.addEventListener('DOMContentLoaded',function(){
 ['scLogin','gOut'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove()});
 var who=document.getElementById('who');if(who)who.textContent='లాగిన్ అవసరం లేదు';
 var panel=document.createElement('section');panel.id='jnLocalProfile';panel.className='note';panel.style.cssText='margin:10px 0 18px;line-height:1.8';
 var p=document.createElement('p');p.textContent='మీ ఫోటో, పేరు, పదవి ఈ ఫోన్‌లోని ఈ బ్రౌజర్‌లో సేవ్ అవుతాయి. బ్రౌజర్ డేటా తొలగిస్తే లేదా వేరే ఫోన్ వాడితే మళ్లీ పెట్టాలి. ఈ ఫోన్ వాడే ఇతరులకు మీ వివరాలు కనిపించవచ్చు.';panel.appendChild(p);
 var clear=document.createElement('button');clear.type='button';clear.id='jnClearLocal';clear.className='gbtn';clear.textContent='ఈ బ్రౌజర్‌లోని నా ప్రొఫైల్ తొలగించండి';panel.appendChild(clear);
 var app=document.getElementById('scApp');if(app)app.prepend(panel);
 window.doSave=function(){if(blocked||window.HYD)return Promise.resolve();var st=curState(),tpl=TPL.id,assets={};if(ME)assets.photo=encFit(ME,420);for(var i=0;i<9;i++)if(CU[i])assets['l'+i]=encFit(CU[i],260);
 queue=queue.catch(function(){}).then(async function(){if(blocked)return;try{var prior=await read();var pos=prior.main&&prior.main.pos||{};pos[tpl]=st.pos;await write({main:{name:st.name,desg:st.desg,ns:st.ns,pos:pos},assets:assets});if(blocked)return;var sv=document.getElementById('sv');sv.className='note';sv.textContent='ఈ బ్రౌజర్‌లో సేవ్ అయింది ✓'}catch(e){var sv=document.getElementById('sv');sv.className='note warn';sv.textContent='ఈ బ్రౌజర్‌లో సేవ్ కాలేదు. స్థలం లేదా బ్రౌజర్ అనుమతులు సరిచూడండి. పోస్టర్‌ను PNGగా డౌన్‌లోడ్ చేసుకోవచ్చు.'}});return queue};
 clear.onclick=async function(){if(!confirm('ఈ బ్రౌజర్‌లో సేవ్ చేసిన మీ ఫోటో, పేరు, పదవి, నాయకుల ఫోటోలు తొలగించాలా? పాత ఆన్‌లైన్ ఖాతాలు మారవు.'))return;blocked=true;clear.disabled=true;clearTimeout(window.saveT);window.HYD=true;try{await queue.catch(function(){});await write({main:null,assets:{}});location.reload()}catch(e){blocked=false;window.HYD=false;clear.disabled=false;document.getElementById('sv').textContent='తొలగించలేకపోయాం. మళ్లీ ప్రయత్నించండి.'}};
 });
})();
