const CACHE_NAME = 'pionpion-ascension-v1';
// Fichiers à mettre en cache. Ajoutez ici vos images, polices, etc. si nécessaire.
const urlsToCache = [
  '/',
  '/index.html' 
  // IMPORTANT : si votre CSS ou JS sont dans des fichiers séparés, ajoutez-les ici.
  // '/style.css',
  // '/game.js',
  // '/apple-touch-icon.png'
];

// Étape d'installation : on ouvre le cache et on ajoute les fichiers.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Étape de fetch : on sert le contenu depuis le cache si disponible.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est dans le cache, on la renvoie
        if (response) {
          return response;
        }
        // Sinon, on fait une requête réseau classique
        return fetch(event.request);
      }
    )
  );
});
