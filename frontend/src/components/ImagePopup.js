function ImagePopup({ card, onClose }) {
	return (
        <section className={`popup popupView ${card.link ? "popup_opened" : ""}`}>
            <div className="popupView__content">
                <button type="button" className="popup__close-button popupView__close-button" onClick={onClose}></button>
                <figure className="popupView__content-photo">
                    <img src={card.link} alt={card.name} className="popupView__image" />
                    <figcaption className="popupView__subtitle">{card.name}</figcaption>
                </figure>
            </div>
        </section>
	)
}

export default ImagePopup