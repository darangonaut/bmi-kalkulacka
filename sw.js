// Bumpni verziu pri zmene appky → starý cache sa zmaže a klienti dostanú nové.
const CACHE = 'bmi-v2';
const ASSETS = ['/', 'index.html', 'manifest.json', 'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png'];

self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll(ASSETS);
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  // HTML/navigácia: network-first (nech sa update prejaví hneď), offline fallback na cache.
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(function () { return caches.match('index.html'); }));
    return;
  }
  // Ostatné: cache-first.
  event.respondWith(caches.match(req).then(function (r) { return r || fetch(req); }));
});
