/* జననేత: రోజువారీ స్వయంచాలక పోస్టర్ స్లాట్.
   repo లోని daily.json (రోజు తేదీ, శీర్షిక, మధ్య బొమ్మ మార్గం) చదివి,
   తేదీ ఈరోజు/రాబోయే రోజు అయితే హోమ్ పేజీ కార్డ్ + స్టూడియో టెంప్లేట్‌గా చేరుస్తుంది.
   గత తేదీ అయితే ఏమీ చేర్చదు - సైట్ సాధారణంగానే ఉంటుంది.
   ప్రచురణ: ప్రతి ఉదయం daily.json + daily-middle.jpg ను ఒకే కమిట్‌గా మార్చడం చాలు. */
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

fetch('daily.json?nc='+Date.now()).then(function(r){return r.json()}).then(function(d){
  if(!d||!d.date||!d.title||!d.img)return;
  var today=istToday();
  if(d.date<today)return; /* గత తేదీ పోస్టర్ చూపించము */
  var id='daily-'+d.date;
  var isPath=/^[\w][\w.\-\/]*$/.test(d.img);
  var art=isPath?d.img+'?d='+d.date:d.img; /* data: URL కు క్యాష్-బస్ట్ వద్దు */
  var tpl={id:id,title:d.title,frame:'sq',w:1122,h:1402,art:art,middleOnly:true,date:d.date,sq:{commonFrame:true,headFit:true}};

  /* ---- స్టూడియో: టెంప్లేట్ పికర్‌లో మొదటి ఎంపికగా చేర్చు ---- */
  if(isStudio){
    if(!window.JN_TEMPLATES)return;
    if(!window.JN_TEMPLATES.some(function(x){return x.id===id}))window.JN_TEMPLATES.unshift(tpl);
    if(typeof window.showTpls==='function'){try{window.showTpls()}catch(e){}}
    afterLoad(function(){
      /* ప్రత్యక్ష లింక్ ?template=daily-... వస్తే ఆ టెంప్లేట్‌కు మార్చు */
      var req=null;try{req=new URLSearchParams(location.search).get('template')}catch(e){}
      if(req===id&&(!window.TPL||window.TPL.id!==id)&&typeof window.useTpl==='function')window.useTpl(tpl);
    });
    return;
  }

  /* ---- హోమ్ పేజీ: ఈ రోజు / రాబోయే స్లయిడ్‌లో కార్డ్ చేర్చు ---- */
  afterLoad(function(){
    var tr=document.getElementById('track');if(!tr||!tr.children.length)return;
    var cat=d.date===today?1:2;
    var slide=tr.children[cat];if(!slide)return;
    var href=studioPage+'?template='+id;
    if(document.querySelector('a.go[href="'+href+'"]'))return;
    var b=slide.querySelector('.daybadge');var label=b?b.textContent:(cat===1?'ఈ రోజు':'రాబోయే');
    var empty=slide.querySelector('.empty');if(empty)empty.closest('.pcard').remove();
    var div=document.createElement('div');
    div.className='pcard';
    div.innerHTML='<div class="daybadge">'+label+'</div><img src="'+art+'" alt="'+d.title+'" loading="lazy"><div class="ptitle">'+d.title+'</div><div class="psub">మీ పేరు, మీ ఫోటోతో పోస్టర్</div><a class="go" href="'+href+'">పోస్టర్ చేసుకోండి</a><div class="pdate">'+teDate(d.date)+'</div>';
    slide.insertBefore(div,slide.firstChild);
    try{if(typeof window.upd==='function')window.upd()}catch(e){}
  });
}).catch(function(){/* daily.json లేకపోయినా/లోపమైనా సైట్ సాధారణంగానే పనిచేస్తుంది */});
})();
