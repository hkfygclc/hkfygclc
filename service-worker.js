const cacheName = "TDC_Cache_v1";
const URLS = [
    "/",
    "/index.html",
    "/qrcode.min.js",
    "https://hkfygclc.github.io/Boop.mp3"
];
const appImages = [
    "/Images/MBTI_icon_p1_pp1.png",
    "/Images/MBTI_icon_p1_pp2.png",
    "/Images/MBTI%20icon_INTJ.png",
    "/Images/MBTI%20icon_INTP.png",
    "/Images/MBTI%20icon_INFJ.png",
    "/Images/MBTI%20icon_INFP.png",
    "/Images/MBTI%20icon_ISTJ.png",
    "/Images/MBTI%20icon_ISFJ.png",
    "/Images/MBTI%20icon_ISTP.png",
    "/Images/MBTI%20icon_ISFP.png",
    "/Images/MBTI%20icon_ENTJ.png",
    "/Images/MBTI%20icon_ENTP.png",
    "/Images/MBTI%20icon_ENFJ.png",
    "/Images/MBTI%20icon_ENFP.png",
    "/Images/MBTI%20icon_ESTJ.png",
    "/Images/MBTI%20icon_ESFJ.png",
    "/Images/MBTI%20icon_ESTP.png",
    "/Images/MBTI%20icon_ESFP.png",
    "/Images/00.jpg",
    "/Images/01.jpg",
    "/Images/02.jpg",
    "/Images/03.jpg",
    "/Images/icon_employed.png",
    "/Images/icon_student.png"
];

const contentToCache = URLS.concat(appImages);

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
    console.log(`[Service Worker] Fetched resource ${e.request.url}`);
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