// CORS: Разрешенные домены
const ALLOWED_CORS = [
  'http://api.websofa.nomoredomains.rocks',
  'https://api.websofa.nomoredomains.rocks',
  'http://api.websofa.mesto.nomoredomains.rocks',
  'https://api.websofa.mesto.nomoredomains.rocks',
  'http://51.250.14.139',
  'https://51.250.14.139',
  'http://localhost:3000',
  'http://localhost:3001',
  '*',
];

// CORS: Разрешенные методы
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
