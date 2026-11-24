/* జననేత: అడ్మిన్ ప్రచురిత టెంప్లేట్లను సైట్‌లో చేర్చే స్క్రిప్ట్.
   ప్రస్తుత పేజీల కోడ్‌లో ఏ మార్పూ అవసరం లేదు - ఈ ఫైల్ + jn-shared.js ను
   <script> ట్యాగ్‌లతో చేర్చితే చాలు. అసలు రెండరింగ్/విధానాలు అలాగే ఉంటాయి. */
(function(){
var isStudio=/studio(-test)?\.html/.test(location.pathname);
var studioPage=location.pathname.indexOf('-test')>=0?'studio-test.html':'studio.html';

function afterLoad(fn){
  if(document.readyState==='complete')fn();
  else window.addEventListener('load',fn);
}
function istToday(){
  var p=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit',numberingSystem:'latn'}).formatToParts(new Date()),v={};
  p.forEach(function(x){v[x.type]=x.value});return v.year+'-'+v.month+'-'+v.day;
}
function teDate(ds){
  var p=ds.split('-');var d=new Date(+p[0],+p[1]-1,+p[2],12);
  return d.toLocaleDateString('te-IN',{day:'numeric',month:'long',year:'numeric',weekday:'long'});
}

/* ---- హోమ్ పేజీ: స్లయిడ్‌లో కార్డ్ చేర్చు (ఇప్పటికే ఉన్న నిర్మాణాన్ని వాడుతూ) ---- */
function injectHome(items){
  var tr=document.getElementById('track');if(!tr||!tr.children.length)return;
  var today=istToday();
  var labels=[];for(var i=0;i<3;i++){var b=tr.children[i]&&tr.children[i].querySelector('.daybadge');labels.push(b?b.textContent:'')}
  items.forEach(function(t){
    var href=studioPage+'?template='+t.__id;
    if(document.querySelector('a.go[href="'+href+'"]'))return;
    var cat=t.date===today?1:(t.date<today?0:2);
    if(cat===0&&window.yesterdayKey&&t.date!==window.yesterdayKey){var ol=document.getElementById('oldList'),of=document.getElementById('oldFolder');if(ol&&of){var od=document.createElement('div');od.style.marginTop='12px';od.innerHTML='<div class="pcard"><div class="daybadge">పాత పోస్టర్లు</div><img src="'+t.thumb+'" alt="'+t.title+'" loading="lazy"><div class="ptitle">'+t.title+'</div><div class="psub">'+(t.sub||'మీ పేరు, మీ ఫోటోతో పోస్టర్')+'</div><a class="go" href="'+href+'">పోస్టర్ చేసుకోండి</a><div class="pdate">'+teDate(t.date)+'</div></div>';ol.insertBefore(od,ol.firstChild);of.style.display='block';var oc=document.getElementById('oldCount');if(oc)oc.textContent='('+ol.children.length+')';return}}
    var slide=tr.children[cat];if(!slide)return;
    var empty=slide.querySelector('.empty');if(empty)empty.closest('.pcard').remove();
    var div=document.createElement('div');
    div.className='pcard';
    div.innerHTML='<div class="daybadge">'+labels[cat]+'</div><img src="'+t.thumb+'" alt="'+t.title+'" loading="lazy"><div class="ptitle">'+t.title+'</div><div class="psub">'+(t.sub||'మీ పేరు, మీ ఫోటోతో పోస్టర్')+'</div><a class="go" href="'+href+'">పోస్టర్ చేసుకోండి</a><div class="pdate">'+teDate(t.date)+'</div>';
    slide.insertBefore(div,slide.firstChild);
  });
  try{if(typeof window.upd==='function')window.upd()}catch(e){}
  buildTopSlider(items,today);
}

/* ---- హోమ్ పేజీ: పైన స్లయిడ్‌షో - రాబోయే పోస్టర్లు స్వయంచాలకంగా ---- */
function buildTopSlider(items,today){
  var sec=document.getElementById('topslider'),track=document.getElementById('tsTrack'),dots=document.getElementById('tsDots');
  if(!sec||!track||!dots||track.children.length)return;
  var up=items.filter(function(t){return t.date&&t.date>today&&t.thumb}).sort(function(a,b){return a.date.localeCompare(b.date)});
  if(!up.length)return;
  up.forEach(function(t,i){
    var a=document.createElement('a');a.className='tsSlide';a.href=studioPage+'?template='+t.__id;
    a.innerHTML='<span class="tsbadge">రాబోయే</span><img src="'+t.thumb+'" alt="'+t.title+'" loading="'+(i<2?'eager':'lazy')+'"><span class="tstitle">'+t.title+'</span>';
    track.appendChild(a);
    var d=document.createElement('i');if(i===0)d.className='on';dots.appendChild(d);
    d.onclick=function(){track.scrollTo({left:i*track.clientWidth,behavior:'auto'})};
  });
  track.style.touchAction='pan-y';
  sec.style.display='block';
  var cur=0,timer=null,touching=false;
  function sync(){cur=Math.round(track.scrollLeft/track.clientWidth);cur=Math.max(0,Math.min(up.length-1,cur));
    [].forEach.call(dots.children,function(d,j){d.className=j===cur?'on':''})}
  track.addEventListener('scroll',function(){requestAnimationFrame(sync)});
  function step(){if(document.hidden||touching)return;
    var n=cur+1>=up.length?0:cur+1;
    track.scrollTo({left:n*track.clientWidth,behavior:'smooth'})}
  function start(){if(timer||up.length<2)return;timer=setInterval(step,1500)}
  function stop(){if(timer){clearInterval(timer);timer=null}}
  track.addEventListener('pointerdown',function(){touching=true;stop()});
  track.addEventListener('pointerup',function(){touching=false;setTimeout(start,3000)});
  track.addEventListener('pointercancel',function(){touching=false;setTimeout(start,3000)});
  document.addEventListener('visibilitychange',function(){document.hidden?stop():start()});
  start();
}

/* ---- స్టూడియో: టెంప్లేట్ పికర్‌లో చేర్చు + పూర్తి బొమ్మ మార్పు ---- */
function injectStudio(items){
  if(!window.JN_TEMPLATES)return;
  items.forEach(function(t){
    if(!window.JN_TEMPLATES.some(function(x){return x.id===t.__id})){
      window.JN_TEMPLATES.unshift({id:t.__id,title:t.title,frame:'sq',w:1122,h:1402,art:t.thumb,jnArt:true,artFull:false,middleOnly:!!t.middleOnly,date:t.date||null,sq:{commonFrame:true,headFit:true}});
    }
  });
  if(typeof window.showTpls==='function'){try{window.showTpls()}catch(e){}}
}
function wrapStudio(){
  if(typeof window.useTpl==='function'&&!window.useTpl.__jnWrapped){
    var _useTpl=window.useTpl;
    var w=function(t){
      if(t&&t.jnArt&&!t.artFull){
        JNFS.getArtDataUrl(t.id).then(function(u){t.art=u;t.artFull=true;_useTpl(t)}).catch(function(){_useTpl(t)});
        return;
      }
      _useTpl(t);
    };
    w.__jnWrapped=true;window.useTpl=w;
  }
}
function openRequestedStudio(){
  /* ప్రత్యక్ష లింక్ ?template=jn-... : పూర్తి బొమ్మతో సరైన టెంప్లేట్‌కు మార్చు */
  var req=null;try{req=new URLSearchParams(location.search).get('template')}catch(e){}
  if(!req||req.indexOf('jn-')!==0||!window.JN_TEMPLATES)return;
  var t=window.JN_TEMPLATES.find(function(x){return x.id===req});if(!t)return;
  if(window.TPL&&window.TPL.id===req&&window.TPL.artFull)return;
  JNFS.getArtDataUrl(t.id).then(function(u){
    t.art=u;t.artFull=true;
    if(typeof window.useTpl==='function')window.useTpl(t);
  }).catch(function(){});
}

JNFS.registry(false).then(function(items){
  if(!items||!items.length)return;
  if(isStudio){
    injectStudio(items);
    afterLoad(function(){wrapStudio();openRequestedStudio()});
  }else{
    afterLoad(function(){injectHome(items)});
  }
}).catch(function(){/* ఆఫ్‌లైన్/కోటా అయినా సైట్ సాధారణంగానే పనిచేస్తుంది */});
})();
