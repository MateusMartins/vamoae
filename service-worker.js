var files = [
	"index.html",
	"templates/event-detail.template",
	"templates/event.template",
	"templates/profile.template",

	"manifest.json",
	"src/data/documents.json",
	"src/data/customers.json",

	"public/css/main.css",
	"public/css/vendor/materialize.min.css",
	"public/css/vendor/materialize.css",

	"public/icons/MaterialIcons-Regular.ttf",
	"public/icons/material.css",

	"public/fonts/fonts.css",
	"public/fonts/Montserrat/Montserrat-Regular.ttf",
	"public/fonts/Raleway/Raleway-Regular.ttf",
	"public/fonts/Roboto/Roboto-Regular.ttf",
	"public/fonts/Ubuntu/Ubuntu-Regular.ttf",

	"public/img/logo.png",
	"public/img/user-img-background.jpg",
	"public/img/user.png",

	"public/js/main.js",
	"public/js/install.js",

	"src/services/login-service.js",
	"src/services/event-service.js",

	"public/js/vendor/jquery.min.js",
	"public/js/vendor/materialize.min.js",
	"public/js/vendor/materialize.js",
	"public/js/vendor/sammy.min.js",
	"public/js/vendor/sammy.template.js",

];

// dev only
if (typeof files == 'undefined') {
	var files = [];
} else {
	files.push('./');
}

var CACHE_NAME = 'vns-v1';

self.addEventListener('activate', function (event) {
	console.log('[SW] Activate');
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (CACHE_NAME.indexOf(cacheName) == -1) {
						console.log('[SW] Delete cache:', cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('install', function (event) {
	console.log('[SW] Install');
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return Promise.all(
				files.map(function (file) {
					return cache.add(file);
				})
			);
		})
	);
});

self.addEventListener('fetch', function (event) {
	console.log('[SW] fetch ' + event.request.url)
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request.clone());
		})
	);
});

self.addEventListener('notificationclick', function (event) {
	console.log('On notification click: ', event);
	clients.openWindow('/');
});