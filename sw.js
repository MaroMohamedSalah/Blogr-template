// add cache
const cacheName = "test";
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
self.addEventListener("activate", (activateEvent) => {
	activateEvent.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.filter((key) => key != cacheName).map((key) => caches.delete(key))
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
