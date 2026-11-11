/* జననేత పార్టీ విభజన (పరీక్ష కాపీ): ఎంచుకున్న పార్టీ పోస్టర్లు + అందరికీ (పండుగ/జయంతి) పోస్టర్లు మాత్రమే కనిపిస్తాయి.
   ఒక పార్టీవారి పోస్టర్లు మరో పార్టీవారికి కనిపించవు. ఎంపిక ఈ ఫోన్‌లోనే సేవ్ అవుతుంది (localStorage 'jn_party'). */
window.JNParty=(function(){
if(window.JNParty)return window.JNParty;
var KEY='jn_party';
var PARTIES={bjp:{label:'బీజేపీ',col:'#f6871f'},brs:{label:'బీఆర్ఎస్',col:'#e7549b'},congress:{label:'కాంగ్రెస్',col:'#1a7f4b'}};
/* ప్రస్తుత పోస్టర్ల పార్టీ విభజన (template id లేదా href ప్రకారం). కొత్త పోస్టర్ జోడించినప్పుడు ఇక్కడ దాని పార్టీ చేర్చాలి.
   పార్టీ పేరు ఇక్కడ లేనిది 'common' (అందరికీ) గా భావించబడుతుంది. */
var MAP={
 'bjp-victory-20261029':'bjp','pmkisan24-20261029':'bjp','amit-padayatra':'bjp',
 'tricolour-modi-20261105':'bjp','poverty-20261104':'bjp','advani-99-20261108':'bjp',
 'tgfunds-poster.html':'bjp','bandi-poster.html':'bjp','mkb-poster.html':'bjp',
 '3-studio-amit.html':'bjp','3-studio-patel.html':'common',
 'mkb':'bjp','padayatra':'bjp',
 'lakshmi':'common','form18':'common','maps':'common',
 /* పండుగ టెంప్లేట్లు ఇప్పుడు పార్టీ-ప్రత్యేక కళాఖండాలతో (PARTY_ART) అందరికీ common */
 'patel-unity':'common','ap-avatarana-fields-20261101':'common','ap-avatarana-temple-20261101':'common',
 'tsunami-awareness-20261104':'common','rama-ekadashi-20261105':'common',
 'dhanteras-20261105':'common','dhanteras-lakshmi-20261105':'common',
 'ram-diwali-20261107':'common','cv-raman-common-20261107':'common','diwali-lamps-20261107':'common',
 'diwali-saffron-20261107':'common','karthika-masam-20261110':'common','karthika-masam-2-20261110':'common',
 'atla-taddi-maker.html':'bjp','valmiki-poster.html':'bjp','form18-poster.html':'bjp',
 'maps-poster.html':'common','voter-poster.html':'bjp','diwali-20261107':'common'
};
/* పండుగ/జయంతి టెంప్లేట్ల పార్టీ-ప్రత్యేక కళాఖండాలు: అదే పోస్టర్, ఎంచుకున్న పార్టీ నాయకులు/గుర్తులతో */
var PARTY_ART={
 'dhanteras-pot-20261105':{bjp:'dhanteras-pot-bjp.jpg',brs:'dhanteras-pot-brs.jpg',congress:'dhanteras-pot-congress.jpg'},
 'dhanteras-lakshmi-20261105':{bjp:'dhanteras-lakshmi-bjp.jpg',brs:'dhanteras-lakshmi-brs.jpg',congress:'dhanteras-lakshmi-congress.jpg'},
 'voter-fest-20261106':{bjp:'voter-bjp.jpg',brs:'voter-brs.jpg',congress:'voter-congress.jpg'},
 'form18-fest-20261025':{bjp:'form18-fest-bjp.jpg',brs:'form18-fest-brs.jpg',congress:'form18-fest-congress.jpg'},
 'atla-fest-20261028':{bjp:'atla-bjp.jpg',brs:'atla-brs.jpg',congress:'atla-congress.jpg'},
 'valmiki-fest-20261026':{bjp:'valmiki-bjp.jpg',brs:'valmiki-brs.jpg',congress:'valmiki-congress.jpg'}};
function artFor(id,def){var m=PARTY_ART[id];if(!m)return def;var p=get()||'bjp';return m[p]||m.bjp||def}
/* పాత స్వతంత్ర పేజీలు (atla-taddi-maker/valmiki-poster) బీజేపీ నాయకులతో బేక్ చేయబడ్డాయి: బీజేపీవారికి అవే పేజీలు,
   ఇతర పార్టీలకు స్టూడియో పార్టీ-ప్రత్యేక టెంప్లేట్లు */
var FEST_PAGES={'atla-taddi-maker.html':'atla-fest-20261028','valmiki-poster.html':'valmiki-fest-20261026','voter-poster.html':'voter-fest-20261106','form18-poster.html':'form18-fest-20261025'};
function localize(arr){var p=get();return filterPosters(arr.map(function(o){
  o=Object.assign({},o);
  var base=(o.href||'').split('?')[0];
  if(FEST_PAGES[base]){
    var tid=FEST_PAGES[base];
    if(p&&p!=='bjp')o.href='studio.html?template='+tid;
    o.img=artFor(tid,o.img);
  }
  var m=(o.href||'').match(/template=([A-Za-z0-9-]+)/);
  if(m&&PARTY_ART[m[1]])o.img=artFor(m[1],o.img);
  return o}))}
function get(){try{var v=localStorage.getItem(KEY);return PARTIES[v]?v:null}catch(e){return null}}
function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}
function partyOf(p){
  if(!p)return 'common';
  if(p.party&&PARTIES[p.party])return p.party;
  var id=p.id||'';
  if(!id&&p.href){var m=(p.href||'').match(/template=([A-Za-z0-9-]+)/);id=m?m[1]:String(p.href).split('?')[0]}
  return MAP[id]||'common';
}
function visible(p){var c=get();var t=partyOf(p);if(t==='common')return true;return c?t===c:false}
function filterPosters(arr){return (arr||[]).filter(visible)}
/* అడ్మిన్ ప్రచురిత టెంప్లేట్ల పార్టీ ఫీల్డ్ (t.party) కోసం */
function matchField(f){var c=get();var t=PARTIES[f]?f:'common';if(t==='common')return true;return c?t===c:false}
/* ప్రస్తుత Firebase టెంప్లేట్లలో పార్టీ ఫీల్డ్ లేనివి - ఒక్కొక్కటి చూసి ఇక్కడ గుర్తించినవి (యజమాని నిర్ధారణ పెండింగ్) */
var FIREBASE_PARTY={'jn-20261110-mwa8f5xt':'bjp','jn-20261111-mwbyv1d2':'bjp','jn-20261112-mwbv404v':'bjp','jn-20261111-mwbyv1d3':'bjp'};
function matchTemplate(t){var f=(t&&t.__id&&FIREBASE_PARTY[t.__id])||(t&&t.party);return matchField(f)}
function label(v){return PARTIES[v]?PARTIES[v].label:'అందరికీ'}

function injectCss(){
  var s=document.createElement('style');s.textContent=
  '#jnPartyChip{position:fixed;right:12px;bottom:12px;z-index:900;background:#3d2110;color:#ffc63f;border:1px solid #b96a2f;border-radius:999px;padding:10px 16px;font:inherit;font-size:13px;font-weight:700;box-shadow:0 2px 10px rgba(0,0,0,.5);cursor:pointer}'+
  '#jnPartyDlg{border:1px solid #b96a2f;border-radius:18px;background:#3d2110;color:#ffeedd;padding:22px;max-width:min(440px,calc(100% - 28px));font:inherit}'+
  '#jnPartyDlg::backdrop{background:#000b}'+
  '#jnPartyDlg h2{font-size:19px;color:#ffc63f;margin:0 0 6px}'+
  '#jnPartyDlg p{font-size:13.5px;line-height:1.7;color:#d8b596;margin:0 0 16px}'+
  '#jnPartyDlg .pb{display:block;width:100%;margin-top:10px;padding:14px;border:0;border-radius:12px;color:#fff;font:inherit;font-size:16px;font-weight:700;cursor:pointer}';
  document.head.appendChild(s);
}
function openDlg(){
  var d=document.getElementById('jnPartyDlg');if(d){if(!d.open)d.showModal();return}
  d=document.createElement('dialog');d.id='jnPartyDlg';
  d.innerHTML='<h2>మీ పార్టీ ఎంచుకోండి</h2><p>మీరు ఎంచుకున్న పార్టీ పోస్టర్లు, పండుగలు మరియు జయంతుల పోస్టర్లు మాత్రమే మీకు కనిపిస్తాయి. వేరే పార్టీ పోస్టర్లు కనిపించవు. మీ ఎంపిక ఈ ఫోన్‌లోనే ఉంటుంది; ఎప్పుడైనా కింది బటన్‌తో మార్చుకోవచ్చు.</p>';
  Object.keys(PARTIES).forEach(function(k){
    var b=document.createElement('button');b.type='button';b.className='pb';b.textContent=PARTIES[k].label;b.style.background=PARTIES[k].col;
    b.onclick=function(){set(k);location.reload()};
    d.appendChild(b);
  });
  document.body.appendChild(d);d.showModal();
}
function ensureChip(){
  if(document.getElementById('jnPartyChip'))return;
  var c=get();
  var chip=document.createElement('button');chip.id='jnPartyChip';chip.type='button';
  chip.textContent=c?('పార్టీ: '+PARTIES[c].label+' ✎'):'మీ పార్టీ ఎంచుకోండి ✎';
  chip.onclick=openDlg;
  document.body.appendChild(chip);
}
function boot(){injectCss();ensureChip();if(!get())openDlg()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
return {get:get,set:set,partyOf:partyOf,visible:visible,filterPosters:filterPosters,localize:localize,artFor:artFor,matchField:matchField,matchTemplate:matchTemplate,label:label,PARTIES:PARTIES,open:openDlg};
})();
