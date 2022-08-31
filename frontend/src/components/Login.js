import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";
import InlineForm from "./InlineForm";

export default function Login({onLogin}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    function handleSubmit(event) {
        event.preventDefault();
        onLogin({email, password});
    }

    return (
        <div className="page">
            <Header>
                <Link to="/sign-up" className="header__link">Регистрация</Link>
            </Header>

            <InlineForm
                name="login"
                title="Вход"
                submitText="Войти"
                onSubmit={handleSubmit}
            >
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="popup__input popup__input_dark"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />

                <span className="email-error popup__error-message"></span>

                <input
                    id="password"
                    type="password"
                    name="password"
                    className="popup__input popup__input_dark"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="200"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <span className="password-error popup__error-message"></span>
            </InlineForm>
        </div>
    );
}