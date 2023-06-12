// const checkResponse = (res) => {
// 	if (res.ok) {
// 		return res.json();
// 	}
// 	return Promise.reject(res.status);
// }

// const BASE_URL = 'https://api.websofa.mesto.nomoredomains.rocks';

// const signUp = (email, password) => {
// 	const requestUrl = BASE_URL + '/signup';
// 	return fetch(requestUrl, {
// 		method: 'POST',
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ email, password }),
// 	}).then(checkResponse);
// }

// const signIn = (email, password) => {
// 	const requestUrl = BASE_URL + '/signin';
// 	return fetch(requestUrl, {
// 		method: 'POST',
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ email, password }),
// 	}).then(checkResponse);
// }

// const checkToken = (token) => {
// 	const requestUrl = BASE_URL + '/users/me';
// 	return fetch(requestUrl, {
// 		method: 'GET',
// 		headers: {
// 			"Content-Type": "application/json",
// 			"Authorization": `Bearer ${token}`
// 		},
// 	}).then(checkResponse);
// }

// export { signUp, signIn, checkToken };

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
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(checkResponse);
}