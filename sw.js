let cache_name = 'cache_rs_2';

let cache_array = [
  '/',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/restaurant.html',
  '/error.html',
  'https://fonts.googleapis.com/css?family=Dosis:300,400,700,800',

];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cache_name).then(function (cache) {
      return cache.addAll(cache_array)
    })
  );
});

self.addEventListener('fetch', function (event) {




  event.respondWith(caches.match(event.request).then(function (response) {
      
    if (response) {   //  returned undefined , not a null value 
      return response;
    } else {
      return fetch(event.request).then(function (response1) {
        
        let clone = response1.clone();
        return caches.open(cache_name).then(function (cache) {
          cache.put(event.request, response1);
          return clone;
        });
        
      }).catch(function(err){
        return caches.match(new Request("/error.html")).catch(function(err){
            return new Response("page not found");
        });

      });
    }
  }) 
   


  );
});


self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('cache_rs') &&
                   cacheName != cache_name;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });