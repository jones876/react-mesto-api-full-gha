class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkPromiseReturn(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._checkPromiseReturn);
  }

  getUserInfo() {
    return this._request(this._baseUrl + "/users/me", {
      credentials: 'include',
   
  
    });
  }

  sendUserInfo(data) {
    return this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
     
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  updateAvatar(data) {
    return this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
        
      }),
    });
  }


  getInitialCards() {
    return this._request(this._baseUrl + "/cards", {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    
    });
  }

  sendNewCard(data) {
    return this._request(this._baseUrl + "/cards", {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
   
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(this._baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    
    });
  }

  addLike(cardId) {
    return this._request(this._baseUrl + `/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
     
    });
  }

  deleteLike(cardId) {
    return this._request(this._baseUrl + `/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
   
    });
  }
}


const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json;  character=UTF-8",
  },
});

export default api;
