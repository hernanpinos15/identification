// imports
importScripts('js/sw-utils.js')

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
  // '/',
  'index.html',
  'css/style.css',
  'img/favicon.ico',
  'js/app.js',
  'js/camara-class.js',
  'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
  // 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
  // 'js/libs/jquery.js'
];

self.addEventListener('install', e => {

  const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
    cache.addAll(APP_SHELL));

  const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
    cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});

self.addEventListener('activate', e => {

  const respuesta = caches.keys().then(keys => {

    keys.forEach(key => {

      if (key !== STATIC_CACHE && key.includes('static')) {
        return caches.delete(key);
      }

      if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
        return caches.delete(key);
      }

    });

  });

  e.waitUntil(respuesta);

});

self.addEventListener('fetch', e => {

  caches.match(e.request).then(res => {
    if (res) {
      return res;
    } else {
      return fetch(e.request).then(newRes => {

        return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);

      });

    }

  })

});