export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
        //method: 'GET',
        headers: this.headers,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  updateInfo(userName, userActivity) {
    return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: userName,
          about: userActivity
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addNewCard(cardName, cardLink) {
    return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {//`https://mesto.nomoreparties.co/v1/cohort-12/cards/${id}`,{
        method: 'DELETE',
        //baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
        headers: this.headers,/*{
            authorization: '35090019-cd19-48d3-8c6b-3ac80f2c4184',
            'Content-Type': 'application/json'
        },*/
    })
        //.then (this._element.remove())
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`error${res.status}`);
        });
  }

  putLike(cardId) {

    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {//`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.headers /*{
            authorization: '35090019-cd19-48d3-8c6b-3ac80f2c4184'
        }*/
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        })
        .then((data) => data);
}

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {//`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.headers,/*{
            authorization: '35090019-cd19-48d3-8c6b-3ac80f2c4184'
        }*/
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        })
       .then((data) => data);
  }
/*
  _writeUserAvatar (data) {
    document.querySelector('.profile__photo').src = data.avatar;
}*/

  setUserAvatar(userAvatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {//'https://mesto.nomoreparties.co/v1/cohort-12/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,/*{
                authorization: '35090019-cd19-48d3-8c6b-3ac80f2c4184',
                'Content-type': 'application/json'
            },*/
            body: JSON.stringify({
                avatar: userAvatar
            })
        }
    )


        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        })
        //.then((data) => this._writeUserAvatar(data))

}
}