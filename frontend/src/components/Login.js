import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // По сабмиту вызывается внешняя функция,
  // Которая передается через пропсы,
  // Здесь мы передаем внешней функции управляемые стейт-переменные в качестве аргументов
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(email, password);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button className="login__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
