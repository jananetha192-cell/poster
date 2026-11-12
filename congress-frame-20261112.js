/* జననేత: అడ్మిన్ పేజీ నుండి వచ్చే కాంగ్రెస్ మధ్య-చిత్ర (middleOnly) టెంప్లేట్లకు ఆమోదిత పై ఫ్రేమ్ -
   త్రివర్ణ పట్టీ, మధ్యలో ఎవరూ లేని సవరించగల నాయకుల వృత్తాలు (ఎడమ/కుడి), లేత ఆకుపచ్చ నేపథ్యం,
   కాంగ్రెస్ ఆకుపచ్చ పేరు/పదవి పలకలు. మధ్య చిత్రం కట్ చేయకుండా అలాగే.
   ఇది కేవలం party=congress + middleOnly అడ్మిన్ రికార్డులకు మాత్రమే వర్తిస్తుంది;
   మిగilin అన్ని టెంప్లేట్లు/రెండరర్లు (సాధారణ, పింక్, స్కీం-మధ్య) అలాగే ఉంటాయి. */
async function drawCongressMidFrame(){NB=null;DB=null;PB=null;if(!window.__jnBusy&&/100%/.test($("st").textContent))$("st").textContent="";
 var W1=1122,H1=1419;
 var ord=[0];for(var oi=2;oi<NS+2;oi++)ord.push(oi);ord.push(1);var SEL=ord.map(function(i){return CU[i]}).filter(Boolean);
 var SELC=[];for(var ci=0;ci<NS+2;ci++)if(CU[ci])SELC.push(CU[ci]); /* circle row paints in tap order */
 if(SEL.length)await FourStyle.setLeadersFromCU(SEL);var ref=await img(ART);var commonTop=await img(window.__JN_CONG_HDR||"congress-frame-header-20261112.png");
 var meIm=ME?ME:null;
 g.clearRect(0,0,W1,H1);
 g.drawImage(ref,0,135,W1,W1);g.drawImage(commonTop,0,0,1122,135,0,0,1122,135);
 if(SEL.length&&$('fsSt').value==='5'){var LDP=leadLayout(SELC.length);
  for(var li=0;li<SELC.length;li++){var lIm=SELC[li];if(lIm)ldCircle(lIm,LDP[li].cx,LDP[li].cy,LDP[li].d)}}
 var mh=309,mw=0,pX=0,fit=false;
 if(meIm){
  mw=Math.round(meIm.width*mh/meIm.height);
  fit=false;
  if(mw>325){mw=325;mh=Math.round(meIm.height*mw/meIm.width)}
  var scale=(+$('ms').value)/100;mw=Math.round(mw*scale);mh=Math.round(mh*scale);
  pX=fit?(W1-16-mw):(W1-10-mw);
 }
 if(meIm){
  g.save();g.beginPath();g.rect(0,0,W1,1257);g.clip();
  var cr9=CROP||{x:0,y:0,w:meIm.width,h:meIm.height},s9=mw/meIm.width;
  var ab=meIm.__jnAB||(meIm.__jnAB=jnAlphaBox(meIm));
  var cax=Math.max(cr9.x,ab.x),cay=Math.max(cr9.y,ab.y),caw=Math.min(cr9.x+cr9.w,ab.x+ab.w)-cax,cah=Math.min(cr9.y+cr9.h,ab.y+ab.h)-cay;
  if(caw<=0||cah<=0){cax=cr9.x;cay=cr9.y;caw=cr9.w;cah=cr9.h}
  var ex=pX+(+$('mx').value)+cax*s9,ey=H1-mh+(+$('my').value)+cay*s9;
  var visH=Math.min(cah*s9,1257-ey),visW=Math.min(caw*s9,W1-ex);
  if(visH<40||visW<40){
    $('ms').value='133';$('mx').value='-63';$('my').value='-47';
    mh=309;mw=Math.round(meIm.width*mh/meIm.height);if(mw>325){mw=325;mh=Math.round(meIm.height*mw/meIm.height)}
    mw=Math.round(mw*1.33);mh=Math.round(mh*1.33);
    s9=mw/meIm.width;pX=W1-10-mw;
    var ey2=H1-mh+cay*s9;if(ey2>1197){$('my').value=String(Math.round(1197-(H1-mh)-cay*s9))}
  }
  if(fit){g.drawImage(meIm,cr9.x,cr9.y,cr9.w,cr9.h,pX+cr9.x*s9,H1-16-mh+cr9.y*s9,cr9.w*s9,cr9.h*s9)}
  else{g.drawImage(meIm,cr9.x,cr9.y,cr9.w,cr9.h,pX+(+$('mx').value)+cr9.x*s9,H1-mh+(+$('my').value)+cr9.y*s9,cr9.w*s9,cr9.h*s9)}
  g.restore();
 }
 /* One joined footer: white name area above Congress-green designation area. */
 var nm=$('nm').value||((EXP||(TPL&&TPL.id==='advani-99-20261108'))?'':'మీ పేరు');
 var tt=$('dg').value||((EXP||(TPL&&TPL.id==='advani-99-20261108'))?'':'మీ పదవి');
 g.save();g.shadowColor='rgba(0,0,0,0.35)';g.shadowBlur=10;g.shadowOffsetY=3;
 rr(g,9,1257,1104,148,16);g.fillStyle='rgb(255,255,255)';g.fill();g.restore();
 g.save();rr(g,9,1257,1104,148,16);g.clip();
 var og=g.createLinearGradient(9,0,1113,0);og.addColorStop(0,'rgb(17,109,60)');og.addColorStop(0.5,'rgb(30,149,83)');og.addColorStop(1,'rgb(17,109,60)');
 g.fillStyle=og;g.fillRect(9,1327,1104,78);g.restore();
 PB=meIm?[pX+(+$('mx').value),H1-mh+(+$('my').value),mw,mh]:null;
 g.textAlign='center';g.textBaseline='middle';
 if(nm){var np=fitFont('Ramabhadra, "Noto Sans Telugu"','400',nm,1064,50,20);
  g.font=np+'px Ramabhadra, "Noto Sans Telugu", sans-serif';
  g.fillStyle='rgb(38,40,84)';g.fillText(nm,561+TX.nm[0],1293+TX.nm[1]);NB=[561-g.measureText(nm).width/2+TX.nm[0],1267+TX.nm[1],g.measureText(nm).width,np*1.35]}
 if(tt){var tp=fitFont('Ramabhadra, "Noto Sans Telugu"','400',tt,1064,54,22);
  g.font=tp+'px Ramabhadra, "Noto Sans Telugu", sans-serif';
  g.fillStyle='rgb(255,255,255)';g.fillText(tt,561+TX.dg[0],1367+TX.dg[1]);DB=[561-g.measureText(tt).width/2+TX.dg[0],1340+TX.dg[1],g.measureText(tt).width,tp*1.35]}
 if(SEL.length&&$('fsSt').value==='3'){window.JN_BOX_CORNERS=true;await FourStyle.setLeadersFromCU(SEL);await FourStyle.drawLeaders()}placeHit();window.DRAWN=1;var pl=document.getElementById('pload');if(pl)pl.style.display='none';
}
(function(){
 /* కాంగ్రెస్ middleOnly అడ్మిన్ రికార్డుల ids సేకరణ (registry క్యాష్ వాడుతుంది, అదనపు లోడ్ లేదు) */
 var CONG=window.__JN_CONG_MIDS=new Set();
 if(window.JNFS&&JNFS.registry){JNFS.registry(false).then(function(items){(items||[]).forEach(function(t){if(t&&t.middleOnly&&t.party==='congress'&&t.__id)CONG.add(t.__id)})}).catch(function(){})}
 /* రెండరర్ హుక్: congMid టెంప్లేట్లు మాత్రమే కొత్త ఫ్రేమ్; మిగilinవి అసలు మార్గం */
 var original=drawCommonFrame;drawCommonFrame=function(){return (window.TPL&&TPL.congMid)?drawCongressMidFrame():original()};
 /* నాయకుల నియంత్రణలు చూపు (పింక్ ఫ్రేమ్‌లాగే) */
 var oldLimits=applyLimits;applyLimits=function(){if(TPL&&TPL.congMid){var el=$('lc').previousElementSibling.previousElementSibling;while(el&&el.id!=='ldF'){el.style.display='';el=el.nextElementSibling}}return oldLimits()};
 /* హిట్-బాక్స్ పలకల పైన అతిక్రమించకుండా (పింక్‌లాగే) */
 var oldPlace=placeBox;placeBox=function(el,B){if(TPL&&TPL.congMid&&B&&el===hitEl){B=B.slice();B[3]=Math.max(0,Math.min(1257,B[1]+B[3])-B[1]);var was=TPL.sq.commonFrame;TPL.sq.commonFrame=false;try{return oldPlace(el,B)}finally{TPL.sq.commonFrame=was}}return oldPlace(el,B)};
 /* useTpl wrap: కాంగ్రెస్ middleOnly రికార్డ్ ఎంచుకుంటే స్కీం రెండరర్ బదులు ఈ ఫ్రేమ్ */
 function wrapUseTpl(){
  if(typeof window.useTpl==='function'&&!window.useTpl.__jnCongWrapped){
   var _u=window.useTpl;
   var w=function(t){if(t&&t.schemeMiddle&&CONG.has(t.id)){t.schemeMiddle=false;t.congMid=true;t.h=1419;t.sq={commonFrame:true,headFit:true}}return _u(t)};
   w.__jnCongWrapped=true;window.useTpl=w;
  }
 }
 if(document.readyState==='complete'||document.readyState==='interactive')wrapUseTpl();else window.addEventListener('DOMContentLoaded',wrapUseTpl);
 window.addEventListener('load',wrapUseTpl);
})();
