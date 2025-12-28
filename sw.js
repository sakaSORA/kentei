const CACHE_NAME = 'shisetsu-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './questions.json',
  './manifest.json',
  './icon-512.png'
];

// 1. インストール時に指定したファイルをすべて保存する
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. ネットワークがオフラインでも、保存したファイルから取り出す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 保存済みならそれを返し、なければ通信する
      return response || fetch(event.request);
    })
  );
});
