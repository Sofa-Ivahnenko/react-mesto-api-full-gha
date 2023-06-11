function InfoTooltip(props) {
  return (
    <div className={`popup popup_tooltip ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <img className="popup__status-icon" src={props.image} alt={props.title} />
        <h2 className="popup__title">{props.title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
