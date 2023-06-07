import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_view ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__view-container">
        <button
          className="popup__close-button popup__close-button-for-view"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <img className="popup__photo" src={card.link} alt={card.name} />
        <p className="popup__description">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
