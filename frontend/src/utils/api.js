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
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
      }
      }).then(res => this._parseResponse(res));
    }
    // добавление новой карточки через попап
    creatCard(data) {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
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
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
      }
      }).then(res => this._parseResponse(res));
    }
  
    // поставить лайк карточке
    setLike(cardId) {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
      }
      }).then(res => this._parseResponse(res));
    }  
  
    // удаление лайка
    deleteLike(cardId) {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
      }
      }).then(res => this._parseResponse(res));
    }
  
    // получение информации о пользователе с сервера
    getUserInfo() {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
      }
      }).then(res => this._parseResponse(res));
    }
  
    // редактирование информации о пользователе через попап
    editUserInfo(data) {
      const token = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
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
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
      },
        body: JSON.stringify({
          avatar: data.avatar
        })
      }).then(res => this._parseResponse(res));
    }
  }  

const jwtToken = localStorage.getItem("jwt");
const api = new Api({
    baseUrl: 'api.websofa.mesto.nomoredomains.rocks',
    headers:{
      authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    }
  });

export default api