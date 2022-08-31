class ApiAuth {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    signup(user) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(user),
        })
            .then(res => this._checkResponse(res));
    }

    signin(user) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(user),
        })
            .then(res => this._checkResponse(res));
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => this._checkResponse(res));
    }

    _checkResponse(response) {
        return response.ok
            ? response.json()
            : Promise.reject(`Ошибка: ${response.status}, ${response.statusText}`);
    }
}

export const apiAuth = new ApiAuth({
    baseUrl: 'https://api.misterrian.mesto.nomoredomains.sbs',
    headers: {
//        authorization: '9d97c63b-334e-41b1-ad1d-f8e460dd9ec6',
        'Content-Type': 'application/json',
    }
});
