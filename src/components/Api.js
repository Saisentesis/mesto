export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,  {headers: this._headers})
    .then(res=> this._checkAnswer(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,  {headers: this._headers})
    .then(res=> this._checkAnswer(res));
  }

  editProfile(item) {
    return fetch(`${this._baseUrl}/users/me`,  {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    }).then(res=> this._checkAnswer(res));
  }

  addCard(item) {
    return fetch(`${this._baseUrl}/cards`,  {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    }).then(res=> this._checkAnswer(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,  {
      method: 'DELETE',
      headers: this._headers,
    }).then(res=> this._checkAnswer(res));
  }

  setLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,  {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._checkAnswer(res))
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,  {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._checkAnswer(res));
  }

  editAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`,  {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    }).then(res => this._checkAnswer(res));
  }
  
}