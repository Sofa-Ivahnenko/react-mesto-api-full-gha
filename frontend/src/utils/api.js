class Api{
    constructor({baseUrl}){
      // this._headers = headers;
      this._baseUrl = baseUrl;
    }
  
    // Приватный метод(декодирует ответ в формате JSON)
    _parseResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
    // получение карточек с сервера
    getCardsList(){
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
			    "Authorization": `Bearer ${token}`
        }
      }).then(res => this._parseResponse(res));
    }
    // добавление новой карточки через попап
    creatCard(data) {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
			    "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      }).then(res => this._parseResponse(res));
    }
  
    // удаление карточки 
    deleteCard(cardId) {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
			    "Authorization": `Bearer ${token}`
        }
      }).then(res => this._parseResponse(res));
    }
  
    // поставить лайк карточке
    setLike(cardId) {
      // const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/json",
			    // "Authorization": `Bearer ${token}`
        }
      }).then(res => this._parseResponse(res));
    }  
  
    // удаление лайка
    deleteLike(cardId) {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
			    "Authorization": `Bearer ${token}`
        }
      }).then(res => this._parseResponse(res));
    }
  
    // получение информации о пользователе с сервера
    getUserInfo() {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          "Content-Type": "application/json",
			    "Authorization": `Bearer ${token}`
        }
      }).then(res => this._parseResponse(res));
    }
  
    // редактирование информации о пользователе через попап
    editUserInfo(data) {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
			    "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.user,
          about: data.job
        })
      }).then(res => this._parseResponse(res));
    }
  
    // редактирование аватара пользователя через попап
    editAvatar(data) {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
			    "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          avatar: data.avatar
        })
      }).then(res => this._parseResponse(res));
    }
  }  

const api = new Api({
    baseUrl: 'https://api.websofa.mesto.nomoredomains.rocks',
    // headers:{
    //   'Content-Type': 'application/json',
		//   'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    //   authorization: '07d0cc49-29ca-4bb6-aef2-dd481f22cbcb',
    //   'Content-Type': 'application/json'
    // },
  });

export default api;