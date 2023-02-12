// add cache
const cacheName = "blogr-v2";
const assets = [
	"/",
	"/index.html",
	"/css/style.css",
	"./css/all.min.css",
	"./css/bootstrap.min.css",
	"./css/bootstrap.min.css.map",
	"/sw.js",
	"./js/all.min.js",
	"./js/script.js",
];

// detect install
self.addEventListener("install", (installEvent) => {
	installEvent.waitUntil(
		caches
			.open(cacheName)
			.then((cache) => {
				cache.addAll(assets).then().catch();
			})
			.catch((err) => {
				console.log(err);
			})
	);
});

// detect activate
self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cacheName !== cache && cache.startsWith("blogr")) {
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// detect fetch
self.addEventListener("fetch", (fetchEvent) => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return (
				res ||
				fetch(fetchEvent.request).then((fetchRes) => {
					return caches.open(cacheName).then((cache) => {
						cache.put(fetchEvent.request, fetchRes.clone());
						return fetchRes;
					});
				})
			);
		})
	);
});
