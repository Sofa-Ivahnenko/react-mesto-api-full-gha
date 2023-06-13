const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
}

const BASE_URL = 'https://api.websofa.mesto.nomoredomains.rocks';

const signUp = (email, password) => {
	const requestUrl = BASE_URL + '/signup';
	const token = localStorage.getItem("jwt");
	return fetch(requestUrl, {
		method: 'POST',
		headers: { 
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		 },
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}

const signIn = (email, password) => {
	const requestUrl = BASE_URL + '/signin';
	const token = localStorage.getItem("jwt");
	return fetch(requestUrl, {
		method: 'POST',
		headers: { 
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}` 
		},
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}

const checkToken = (token) => {
	const requestUrl = BASE_URL + '/users/me';
	// const token = localStorage.getItem("jwt");
	return fetch(requestUrl, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
	}).then(checkResponse);
}

export { signUp, signIn, checkToken };

