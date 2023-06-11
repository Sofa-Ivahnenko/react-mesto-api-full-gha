export const BASE_URL = "https://api.websofa.mesto.nomoredomains.rocks";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка${res.status}`);
}

// Запрос для отправки данных на сервере
// При попытке авторизоваться (для компонента Логин)
export function authorization(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    mode: 'no-cors',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// Запрос для отправки данных на сервере
// При попытке зарегестрироваться (для компонента Регистер)
export function registration(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    mode: 'no-cors',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// Запрос на получение токена
export function getToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    mode: 'no-cors',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(checkResponse);
}
