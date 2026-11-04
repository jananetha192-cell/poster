/* Jananetha anonymous counts. Sends only: a random id stored on this browser, the page name, the event (view/download/share) and the poster id. No name, photo or phone number is sent. */
(function(){
  var URL='https://script.google.com/macros/s/AKfycbwK2vu-B6KfL3rJ8XJ_nphYLeJpcz_evbyay7jnV7PJGUiy8mTgiEVRkNTwK-vMV5SD/exec';
  function vid(){try{var v=localStorage.getItem('jn_vid');if(!v){v='v'+Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('jn_vid',v)}return v}catch(e){return 'nostore'}}
  function send(ev,poster){
    try{var b=JSON.stringify({v:vid(),e:ev,p:location.pathname.split('/').pop()||'index',t:poster||''});
      if(navigator.sendBeacon)navigator.sendBeacon(URL,new Blob([b],{type:'text/plain'}));
      else fetch(URL,{method:'POST',mode:'no-cors',body:b,keepalive:true})}catch(e){}
  }
  function pid(){try{return TPL.id}catch(e){return ''}}
  send('view');
  function hook(id,ev){var el=document.getElementById(id);if(el)el.addEventListener('click',function(){send(ev,pid())},true)}
  hook('dl','download');hook('sh','share');
})();
