var CACHE='m2v1';
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['/'])}))});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(res){var c=res.clone();caches.open(CACHE).then(function(cache){cache.put(e.request,c)});return res}).catch(function(){return new Response('Offline',{status:503})})}))});
