// ChefCost Service Worker — network-first, no aggressive caching
self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  // Always fetch from network; only fall back to cache if offline
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
