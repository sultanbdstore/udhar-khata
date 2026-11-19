const VERSION='udhar-v1-2026-11-19-a';
const FILES=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/maskable-192.png','icons/maskable-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(VERSION).then(c=>Promise.all(FILES.map(f=>c.add(new Request(f,{cache:'reload'})).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===location.origin){const c=r.clone();caches.open(VERSION).then(ch=>ch.put(e.request,c)).catch(()=>{})}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||(e.request.mode==='navigate'?caches.match('index.html'):undefined))))});
