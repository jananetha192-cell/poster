/* జననేత PWA - app shell cache only.
   Shell files (this page set, icons, manifest) open offline; template art,
   fonts, posters.js and the AI background-removal model always load from the
   network. Page navigations are network-first so site updates reach everyone;
   the cache is only the offline fallback. Bump the cache name on shell changes. */
var C = 'jananetha-pwa-v1';
var SHELL = ['./', './index.html', './studio.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-512-maskable.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(C).then(function (c) { return c.addAll(SHELL) }).then(function () { return self.skipWaiting() }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== C }).map(function (k) { return caches.delete(k) }));
  }).then(function () { return self.clients.claim() }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function (r) {
        var copy = r.clone();
        caches.open(C).then(function (c) { c.put(e.request, copy) });
        return r;
      }).catch(function () { return caches.match(e.request, { ignoreSearch: true }) })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || fetch(e.request) })
  );
});
