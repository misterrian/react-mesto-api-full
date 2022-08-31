class Api {
    constructor({userUrl, baseUrl, headers}) {
        this._userUrl = userUrl;
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(`${this._userUrl}`, {
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    saveAvatar(avatarData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatarData),
        })
            .then(res => this._checkResponse(res));
    }

    saveProfile(profileData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(profileData),
        })
            .then(res => this._checkResponse(res));
    }

    addCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardData),
        })
            .then(res => this._checkResponse(res));
    }

    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    _checkResponse(response) {
        return response.ok
            ? response.json()
            : Promise.reject(`Ошибка: ${response.status}, ${response.statusText}`);
    }
}

export const api = new Api({
    userUrl: 'https://nomoreparties.co/v1/cohort-41/users/me',
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '9d97c63b-334e-41b1-ad1d-f8e460dd9ec6',
        'Content-Type': 'application/json',
    }
});
