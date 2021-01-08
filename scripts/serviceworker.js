//set up cache name and files to add to it
const CACHE_NAME = 'assignment-samp';
const CACHE_URLS = ['../index',
    '..',
    '../404',
    '../coffee',
    '../qualifications',
    '../skills',
    '../skillsdemo1',
    '../skillsdemo2',
    '../sources',
    '../manifest.json',
    '../images/android-chrome-192x192.png',
    '../images/android-chrome-512x512.png',
    '../images/apple-touch-icon.png',
    '../images/bg-full.jpg',
    '../images/cables-desktop.webp',
    '../images/cables-tablet.webp',
    '../images/cables-mobile.webp',
    '../images/cables-fallback.jpg',
    '../images/capacitors-desktop.webp',
    '../images/capacitors-tablet.webp',
    '../images/capacitors-mobile.webp',
    '../images/capacitors-fallback.jpg',
    '../images/circuitboard-desktop.webp',
    '../images/circuitboard-mobile.webp',
    '../images/circuitboard-fallback.jpg',
    '../images/coffee-desktop.webp',
    '../images/coffee-tablet.webp',
    '../images/coffee-mobile.webp',
    '../images/coffee-fallback.jpg',
    '../images/cpu-desktop.webp',
    '../images/cpu-tablet.webp',
    '../images/cpu-mobile.webp',
    '../images/cpu-fallback.jpg',
    '../images/favicon.ico',
    '../images/favicon-16x16.png',
    '../images/favicon-32x32.png',
    '../images/harddrive-desktop.webp',
    '../images/harddrive-tablet.webp',
    '../images/harddrive-mobile.webp',
    '../images/harddrive-fallback.jpg',
    '../images/installing-desktop.webp',
    '../images/installing-tablet.webp',
    '../images/installing-mobile.webp',
    '../images/installing-fallback.jpg',
    '../images/keyboard-desktop.webp',
    '../images/keyboard-tablet.webp',
    '../images/keyboard-mobile.webp',
    '../images/keyboard-fallback.jpg',
    '../images/microchip-solid.svg',
    '../images/motherboard-desktop.webp',
    '../images/motherboard-tablet.webp',
    '../images/motherboard-mobile.webp',
    '../images/motherboard-fallback.jpg',
    '../images/mstile-150x150.png',
    '../images/power-off-solid.svg',
    '../images/safari-pinned-tab.svg',
    '../images/scroll-solid.svg',
    '../images/typing-desktop.webp',
    '../images/typing-tablet.webp',
    '../images/typing-mobile.webp',
    '../images/typing-fallback.jpg',
    '../images/wide-code-desktop.webp',
    '../images/wide-code-tablet.webp',
    '../images/wide-code-mobile.webp',
    '../fonts/NotoSerif.eot',
    '../fonts/NotoSerif.ttf',
    '../fonts/NotoSerif.woff',
    '../fonts/NotoSerif.woff2',
    '../fonts/Orkney-Regular.eot',
    '../fonts/Orkney-Regular.ttf',
    '../fonts/Orkney-Regular.woff',
    '../fonts/Orkney-Regular.woff2',
    '../fonts/Roboto-Regular.eot',
    '../fonts/Roboto-Regular.ttf',
    '../fonts/Roboto-Regular.woff',
    '../fonts/Roboto-Regular.woff2',
    '../fonts/SpecialElite-Regular.eot',
    '../fonts/SpecialElite-Regular.ttf',
    '../fonts/SpecialElite-Regular.woff',
    '../fonts/SpecialElite-Regular.woff2',
    '../scripts/scripts.js',
    '../scripts/elements.json',
    '../styles/normalize.css',
    '../styles/skillsdemo1.css',
    '../styles/skillsdemo2.css',
    '../styles/styles.css'];

//add all URLs to cache when installed
self.addEventListener("install", function (event) {
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log("Cache opened");
                //add all URLs to cache
                return cache.addAll(CACHE_URLS);
            })
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.startsWith('assignment-samp') && CACHE_NAME !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});
