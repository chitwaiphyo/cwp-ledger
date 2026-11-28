// v2 — always ask the server for the newest files (bypass the 10-minute HTTP cache), fall back to cache offline
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const c=r.clone();caches.open('cwp-v1').then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
