const CACHE_NAME = "generator-v1";
const ASSETS = [
  "/",
  "https://github.com/Ringoandreu/grnd-helperweb/index.html",
  "https://github.com/Ringoandreu/grnd-helperweb/styles.css",
  "https://github.com/Ringoandreu/grnd-helperweb/script.js",
  "https://github.com/Ringoandreu/grnd-helperweb/icon-192x192.png",
  "https://github.com/Ringoandreu/grnd-helperweb/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});