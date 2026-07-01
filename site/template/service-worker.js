/* Service worker for the Digital Literacy course.
   Precaches the built pages and assets so the site works offline after the
   first visit. The build script injects the precache list below.
   Strategy: cache-first for app shell, with network fallback that also caches
   newly fetched same-origin GET responses. */

var CACHE = 'digital-literacy-v1';

var PRECACHE = /*__PRECACHE__*/[];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(PRECACHE);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  // Network-first for page navigations (HTML) so content updates show right
  // away when online; falls back to cache when offline.
  var accept = (req.headers.get('accept') || '');
  if (req.mode === 'navigate' || accept.indexOf('text/html') !== -1) {
    event.respondWith(
      fetch(req).then(function (res) {
        var clone = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(req, clone); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (m) { return m || caches.match('./index.html'); });
      })
    );
    return;
  }

  // Cache-first for assets (CSS/JS are version-stamped; figures are stable).
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var clone = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, clone); });
        }
        return res;
      });
    })
  );
});
