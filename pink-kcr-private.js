async function drawPinkKcrFrame(){NB=null;DB=null;PB=null;if(!window.__jnBusy&&/100%/.test($("st").textContent))$("st").textContent="";
 /* fresh canvas element each draw: a reused context keeps its first (pre-webfont) font resolution */
 var W1=1122,H1=1419;
 var ord=[0];for(var oi=2;oi<NS+2;oi++)ord.push(oi);ord.push(1);var SEL=ord.map(function(i){return CU[i]}).filter(Boolean);
 var SELC=[];for(var ci=0;ci<NS+2;ci++)if(CU[ci])SELC.push(CU[ci]); /* circle row paints in tap order */
 /* the selected photos ARE the row (established 2-9 workflow): with any selection the pre-erased
    template is used and the chosen photos paint as auto-fitted discs left and right of the baked
    center; with no selection the original template and its baked row paint unchanged */
 if(SEL.length)await FourStyle.setLeadersFromCU(SEL);var ref=await img(ART);var commonTop=await img("pink-kcr-header.png");
 var meIm=ME?ME:null;
 g.clearRect(0,0,W1,H1);g.drawImage(ref,0,135,W1,W1);g.drawImage(commonTop,0,0,1122,135,0,0,1122,135);
 if(SEL.length&&$('fsSt').value==='5'){var LDP=leadLayout(SELC.length);
  for(var li=0;li<SELC.length;li++){var lIm=SELC[li];if(lIm)ldCircle(lIm,LDP[li].cx,LDP[li].cy,LDP[li].d)}}
 /* visitor photo: flush bottom-right, rising above the navy bar (same geometry as the approved template).
    Person cutouts bleed to the poster bottom edge exactly like the approved template.
    Oval/rectangle fallbacks get fitted fully inside with a small margin so nothing looks clipped. */
 /* visitor photo geometry - drawn after the plates so the boards pass behind the person (reference frame) */
 var mh=309,mw=0,pX=0,fit=false;
 if(meIm){
  mw=Math.round(meIm.width*mh/meIm.height);
  fit=false;
  if(mw>325){mw=325;mh=Math.round(meIm.height*mw/meIm.width)}
  var scale=(+$('ms').value)/100;mw=Math.round(mw*scale);mh=Math.round(mh*scale);
  pX=fit?(W1-16-mw):(W1-10-mw);
 }
 /* visitor photo first: name/designation plates and their text paint over it (user-ordered layering) */
 if(meIm){
  g.save();g.beginPath();g.rect(0,0,W1,1257);g.clip();
  var cr9=CROP||{x:0,y:0,w:meIm.width,h:meIm.height},s9=mw/meIm.width;
  /* recovery: if the photo's real (non-transparent) content would be effectively invisible above the
     footer band, restore the standard placement. Placements that show anything real are left untouched. */
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
 /* One joined footer: white name area above orange designation area. */
 var nm=$('nm').value||((EXP||(TPL&&TPL.id==='advani-99-20261108'))?'':'మీ పేరు');
 var tt=$('dg').value||((EXP||(TPL&&TPL.id==='advani-99-20261108'))?'':'మీ పదవి');
 g.save();g.shadowColor='rgba(0,0,0,0.35)';g.shadowBlur=10;g.shadowOffsetY=3;
 rr(g,9,1257,1104,148,16);g.fillStyle='rgb(255,255,255)';g.fill();g.restore();
 g.save();rr(g,9,1257,1104,148,16);g.clip();
 var og=g.createLinearGradient(9,0,1113,0);og.addColorStop(0,'rgb(159,15,104)');og.addColorStop(0.5,'rgb(180,20,121)');og.addColorStop(1,'rgb(159,15,104)');
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
(function(){var oldLimits=applyLimits;applyLimits=function(){if(TPL&&TPL.pinkKcr){var el=$('lc').previousElementSibling.previousElementSibling;while(el&&el.id!=='ldF'){el.style.display='';el=el.nextElementSibling}}return oldLimits()};var original=drawCommonFrame;drawCommonFrame=function(){return TPL&&TPL.pinkKcr?drawPinkKcrFrame():original()};var oldPlace=placeBox;placeBox=function(el,B){if(TPL&&TPL.pinkKcr&&B&&el===hitEl){B=B.slice();B[3]=Math.max(0,Math.min(1257,B[1]+B[3])-B[1]);var was=TPL.sq.commonFrame;TPL.sq.commonFrame=false;try{return oldPlace(el,B)}finally{TPL.sq.commonFrame=was}}return oldPlace(el,B)};JN_TEMPLATES.unshift({id:'private-pink-kcr',title:'బీఆర్ఎస్ - పింక్ ఫ్రేమ్ నమూనా',date:'2026-11-12',frame:'sq',w:1122,h:1419,art:'middle.jpg',pinkKcr:true,sq:{commonFrame:true,headFit:true}})})();
