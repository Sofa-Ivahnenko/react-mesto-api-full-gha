import React from "react";
import logo from "../images/header-logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место." className="header__logo" />
      <div className="header__nav">
        <p className="header__mail">{props.mail}</p>
        <Link to={props.route} className="header__link" onClick={props.signOut}>
          {props.text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
