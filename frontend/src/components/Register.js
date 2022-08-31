import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";
import InlineForm from "./InlineForm";

export default function Register({onRegister}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister({email, password});
    };

    return (
        <div className="page">
            <Header>
                <Link to="/sign-in" className="header__link">Войти</Link>
            </Header>

            <InlineForm
                name="register"
                title="Регистрация"
                submitText="Зарегистрироваться"
                onSubmit={handleSubmit}
                helpMessage={(
                    <div className="popup__help-message">
                        <p>Уже зарегистрированы?</p>
                        <Link to="/sign-in" className="popup__help-message-link">Войти</Link>
                    </div>
                )}
            >
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="popup__input popup__input_dark"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleEmailChange}
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
                    required
                    value={password}
                    onChange={handlePasswordChange}
                />

                <span className="password-error popup__error-message"></span>
            </InlineForm>
        </div>
    );
}