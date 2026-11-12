window.JNSchemeFrame=function(ctx,w,h,o){var geo={PB:null,NB:null,DB:null},s=w/1122,party=o.party,photos=o.leaders,header=o.header||190*s,col={bjp:['#c75e10','#ff9c26'],brs:['#b30e69','#e51983'],congress:['#12643c','#248753']}[party];
function circle(ctx,im,x,y,d){ctx.save();ctx.beginPath();ctx.arc(x,y,d/2,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.clip();var sc=Math.min((d-8)/im.width,(d-8)/im.height);ctx.drawImage(im,x-im.width*sc/2,y+d/2-im.height*sc,im.width*sc,im.height*sc);ctx.restore()}
 var gr=ctx.createLinearGradient(0,0,w,0);gr.addColorStop(0,col[0]);gr.addColorStop(1,col[1]);ctx.fillStyle=gr;ctx.fillRect(0,0,w,header);ctx.fillStyle='#fff';ctx.fillRect(0,76*s,w,114*s);
 if(photos.length){
 var d=Math.min(136*s,(w-32*s-12*s*(photos.length-1))/photos.length),gap=photos.length>1?(w-32*s-photos.length*d)/(photos.length-1):0;for(var j=0;j<photos.length;j++){var x=photos.length===1?w/2:16*s+d/2+j*(d+gap);circle(ctx,photos[j],x,76*s,d)}
 }
 ctx.fillStyle=party==='brs'?'#642046':'#175c36';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 '+28*s+'px "Noto Sans Telugu"';ctx.fillText(JNParty.label(party),w/2,167*s);
 // Shared lower area: personal photo stays left, text uses the remaining width.
 var footer=(o.footer||190)*s,fy=h-footer;ctx.fillStyle='#fff';ctx.fillRect(0,fy,w,footer/2);ctx.fillStyle=col[0];ctx.fillRect(0,fy+footer/2,w,footer/2);
 if(o.personal){var sc=Math.min(270*s/o.personal.width,330*s/o.personal.height)*o.scale,mw=o.personal.width*sc,mh=o.personal.height*sc;geo.PB=[12*s+o.mx,h-mh+o.my,mw,mh];o.drawPersonal(ctx,geo.PB,mw,mh)}
 var tx=310*s,max=w-tx-20*s;
 function text(value,y,size,color,off){if(!value)return null;var p=Math.max(18*s,size*s*(off[2]||1));ctx.font='700 '+p+'px "Noto Sans Telugu"';while(ctx.measureText(value).width>max&&p>16*s){p-=s;ctx.font='700 '+p+'px "Noto Sans Telugu"'}ctx.fillStyle=color;ctx.textAlign='left';ctx.textBaseline='middle';var x=tx+off[0],yy=y+off[1];ctx.fillText(value,x,yy,max);return [x,yy-p*.65,Math.min(ctx.measureText(value).width,max),p*1.3]}
 geo.NB=text(o.name,fy+footer*.25,48,'#282854',o.tx.nm);geo.DB=text(o.designation,fy+footer*.75,34,'#fff',o.tx.dg);return geo;
};
/* Two approved supplied middle artworks only. Existing storage and other renderers remain unchanged. */
(function(){
 var originalDraw=window.draw,originalFS=window.FS_ON,chain=Promise.resolve();
 function active(){return window.TPL&&TPL.schemeMiddle===true}
 window.FS_ON=function(){return active()?false:originalFS()};
 async function render(){
  var t=TPL,w=W,h=H,art=await img(t.art);await document.fonts.ready;
  if(TPL!==t)return;if(!art)throw Error('Template artwork unavailable');
  cv.width=w;cv.height=h;g=cv.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(art,0,190,w,w);
  var geo=JNSchemeFrame(g,w,h,{footer:330,party:JNParty.get()||'bjp',leaders:CU.slice(0,NS+2).filter(Boolean),personal:ME,name:$('nm').value,designation:$('dg').value,scale:+$('ms').value/100,mx:+$('mx').value,my:+$('my').value,tx:TX,drawPersonal:drawME});
  PB=geo.PB;NB=geo.NB;DB=geo.DB;placeHit();window.DRAWN=1;
  var load=$('pload');if(load)load.style.display='none';
 }
 window.draw=function(){if(!active())return originalDraw.apply(this,arguments);chain=chain.catch(function(){}).then(render);return chain.then(function(){schedSave()})};
 window.addEventListener('DOMContentLoaded',function(){if(active())draw()});
})();
