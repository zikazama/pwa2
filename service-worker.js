const CACHE_NAME = "JJY-v1";
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/ketentuan.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/jquery.js",
  "/js/nav.js",
  "/js/api.js",
  "/img/slider1.jpg",
  "/img/slider2.jpg",
  "/img/slider3.jpg",
  "/img/slider4.jpg",
  "/icon.png",
  "/maskable_icon.png",
  "/custom-icon.png",
  "/img/jajan1.jpg",
  "/img/jajan2.jpg",
  "/img/jajan3.jpg",
  "/manifest.json",
  "/js/sw-register.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  var base_url = "https://api.football-data.org/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
      event.respondWith(
          caches.match(event.request, { ignoreSearch: true }).then(function(response) {
              return response || fetch (event.request);
          })
      )
  }
});

self.addEventListener("activate", event => {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });