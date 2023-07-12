import { apiObject } from "./constants.js";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async uploadUserInfo(formFields) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(formFields),
    })
      .then(this._checkResponse)
      .then((res) => res.json());
  }

  uploadCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    })
      .then(this._checkResponse)
      .then((res) => res.json());
  }

  getFromServer(url) {
    return fetch(`${this._baseUrl}${url}`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(this._checkResponse)
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  getAvatar(url) {
    return fetch(`${this._baseUrl}${url}`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(this._checkResponse)
      .then((res) => res.json());
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
      },
    }).then(this._checkResponse);
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(this._checkResponse)
      .then((res) => res.json());
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(this._checkResponse)
      .then((res) => res.json());
  }

  sendAvatar(formFields) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(formFields),
    })
      .then(this._checkResponse)
      .then((res) => res.json());
  }

  getOwner() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(this._checkResponse)
      .then((res) => res.json());
  }

  _checkResponse(res) {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export default new Api(apiObject);
