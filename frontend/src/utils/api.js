class Api {
    constructor(options) {
        this._url = options.url
    }

    getCards() {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
            }
        }).then(res => this._checkResponse(res));
    }

    setCard(data) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(res => this._checkResponse(res));
    }

    deleteCard(cardId) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        }).then(res => this._checkResponse(res));
    }

    getUserInfo() {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        }).then(res => this._checkResponse(res));
    }

    setUserInfo(forms) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(forms)
        }).then(res => this._checkResponse(res));
    }

    setUserAvatar(data) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(res => this._checkResponse(res));
    }

    setLike(cardId, isLiked) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        }).then(res => this._checkResponse(res));
    }

    _checkResponse(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`${res.status} ${res.statusText}`);
    }
}

const api = new Api({
    url: "api.websofa.mesto.nomoredomains.rocks"
});

export default api;
