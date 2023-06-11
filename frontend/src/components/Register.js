import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  // управляемые стейт-переменные
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

  // Навесила обработчик онСабмит на саму форму
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required />
        <input
          className="auth__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button className="auth__submit-button" type="submit">
          Зарегестрироваться
        </button>
      </form>
      <p className="auth__text">
        Уже зарегестрированы?<Link to="/signin" className="auth__link">Войти</Link>
      </p>
    </div>
  );
}

export default Register;
