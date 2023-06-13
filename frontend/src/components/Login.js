import React, {useState} from "react";
import {Redirect} from "react-router-dom";

function Login({isLoggedIn, onLogin, buttonText, title}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
    }

    if (isLoggedIn) {
        return <Redirect to="/"/>;
    }

    return (
        <form onSubmit={handleSubmit} className="auth__form" noValidate>
            <h2 className="auth__title">{title}</h2>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                className="auth__input"
                onChange={handleEmailChange}
                autoComplete="off"
            />

            <input
                id="password"
                name="password"
                type="password"
                placeholder="Пароль"
                value={password}
                className="auth__input"
                onChange={handlePasswordChange}
                autoComplete="off"
            />
            <div className="auth__container">
                <button
                    className="auth__button pointer"
                    type="submit">
                    {buttonText}
                </button>
            </div>

        </form>
    );
}

export default Login;
