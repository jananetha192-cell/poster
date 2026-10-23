var CACHE='jananetha-v3-portrait';
var ASSETS=[
 './','./index.html','./manifest.webmanifest',
 './icons/icon-192.png','./icons/icon-512.png',
 './assets/fonts/NotoSansTelugu.ttf','./assets/fonts/RaviPrakash.ttf','./assets/fonts/Mallanna.ttf',
 './assets/img/tpl_praja.jpg','./assets/img/cone_main.png','./assets/img/cone_alt1.png','./assets/img/cone_alt2.png','./assets/img/modi_cut.png'
];
self.addEventListener('install',function(e){
 e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
 e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
 if(e.request.method!=='GET')return;
 if(e.request.url.indexOf(location.origin)!==0)return;
 var path=new URL(e.request.url).pathname;
 var isHtml=e.request.mode==='navigate'||/\.html$/.test(path)||path.endsWith('/');
 if(isHtml){
  // network-first for pages: updates appear immediately, offline falls back to cache
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(function(r){
   if(r&&r.ok){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp)})}
   return r;
  }).catch(function(){return caches.match(e.request,{ignoreSearch:true})}));
  return;
 }
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){
  return hit||fetch(e.request).then(function(r){
   if(r&&r.ok){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp)})}
   return r});
 }));
});
