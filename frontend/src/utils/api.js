class Api{
    constructor({baseUrl, headers}){
      this._headers = headers;
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
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      }).then(res => this._parseResponse(res));
    }
    // добавление новой карточки через попап
    creatCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      }).then(res => this._parseResponse(res));
    }
  
    // удаление карточки 
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      }).then(res => this._parseResponse(res));
    }
  
    // поставить лайк карточке
    setLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      }).then(res => this._parseResponse(res));
    }  
  
    // удаление лайка
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      }).then(res => this._parseResponse(res));
    }
  
    // получение информации о пользователе с сервера
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      }).then(res => this._parseResponse(res));
    }
  
    // редактирование информации о пользователе через попап
    editUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.user,
          about: data.job
        })
      }).then(res => this._parseResponse(res));
    }
  
    // редактирование аватара пользователя через попап
    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      }).then(res => this._parseResponse(res));
    }
  }  

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    // }
    headers:{
      authorization: '07d0cc49-29ca-4bb6-aef2-dd481f22cbcb',
      'Content-Type': 'application/json'
    }
  });

export default api