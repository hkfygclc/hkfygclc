new workboxPlugin.InjectManifest({
    swSrc: path.join(__dirname, '..', SRC_DIR, 'service-worker.js'),
    swDest: path.join(__dirname, '..', DIST_DIR, 'service-worker.js'),
    globDirectory: path.join(__dirname, '..', DIST_DIR),
    globPatterns: ['**/*.{js,css,png}']
}),

//sw.js
let precacheList = self.__precacheManifest || []
workbox.precaching.precacheAndRoute(precacheList)