const cacheName = "tdc2023PWA-v1";
const URLS = [
    "/",
    "/index.html",
    "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"
]
const appImages = [
    "https://lla2.hkfyg.org.hk/images/20230127235200/MBTI%20icon_p1_pp1.png",
    "https://lla2.hkfyg.org.hk/images/20230127235205/MBTI%20icon_p1_pp2.png",
    "https://lla2.hkfyg.org.hk/images/20230127234826/MBTI%20icon_INTJ.png",
    "https://lla2.hkfyg.org.hk/images/20230127234836/MBTI%20icon_INTP.png",
    "https://lla2.hkfyg.org.hk/images/20230127234800/MBTI%20icon_INFJ.png",
    "https://lla2.hkfyg.org.hk/images/20230127234815/MBTI%20icon_INFP.png",
    "https://lla2.hkfyg.org.hk/images/20230127235006/MBTI%20icon_ISTJ.png",
    "https://lla2.hkfyg.org.hk/images/20230127234953/MBTI%20icon_ISFJ.png",
    "https://lla2.hkfyg.org.hk/images/20230127235011/MBTI%20icon_ISTP.png",
    "https://lla2.hkfyg.org.hk/images/20230127234959/MBTI%20icon_ISFP.png",
    "https://lla2.hkfyg.org.hk/images/20230127233729/MBTI%20icon_ENTJ.png",
    "https://lla2.hkfyg.org.hk/images/20230127233735/MBTI%20icon_ENTP.png",
    "https://lla2.hkfyg.org.hk/images/20230127233714/MBTI%20icon_ENFJ.png",
    "https://lla2.hkfyg.org.hk/images/20230127233721/MBTI%20icon_ENFP.png",
    "https://lla2.hkfyg.org.hk/images/20230127234253/MBTI%20icon_ESTJ.png",
    "https://lla2.hkfyg.org.hk/images/20230127234239/MBTI%20icon_ESFJ.png",
    "https://lla2.hkfyg.org.hk/images/20230127234302/MBTI%20icon_ESTP.png",
    "https://lla2.hkfyg.org.hk/images/20230127234246/MBTI%20icon_ESFP.png",
];

const contentToCache = appImages;

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
      (async () => {
        const cache = await caches.open(cacheName);
        console.log("[Service Worker] Caching all: app shell and content");
        await cache.addAll(contentToCache);
      })()
    );
  }); 

  self.addEventListener("fetch", (e) => {
    e.respondWith(
      (async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) {
          return r;
        }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
      })()
    );
  });  