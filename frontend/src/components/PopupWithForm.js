import React from "react";

function PopupWithForm({ type, title, name, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={`popup popup_${type} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${type}`}
          name={`${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__save-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
