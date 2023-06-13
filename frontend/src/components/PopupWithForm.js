import React from 'react';

function PopupWithForm({name, title, buttonText, children, onClose, onSubmit, isOpen}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button
                    className="popup__close-button pointer"
                    onClick={onClose}
                    type="button"
                />
                <form
                    className="popup__form"
                    onSubmit={onSubmit}
                    name={name}
                    noValidate
                >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        className="popup__save-button pointer"
                        type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
