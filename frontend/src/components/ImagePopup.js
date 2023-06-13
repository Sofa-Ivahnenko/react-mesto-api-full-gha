import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image-view ${card.link ? "popup_opened" : ""}`}>
            <figure className="popup__image-container">
                <img
                    className="popup__image"
                    src={card.link}
                    alt={card.name}
                />
                <figcaption className="popup__image-title">{card.name}</figcaption>
                <button
                    className="popup__close-button pointer"
                    onClick={onClose}
                    type="button"
                />
            </figure>
        </div>
    )
}

export default ImagePopup;
