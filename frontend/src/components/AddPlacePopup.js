import React, {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({onClose, onAddPlace, onLoading, isOpen}) {
    const [placeName, setPlaceName] = useState('');
    const [placeLink, setPlaceLink] = useState('');

    useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: placeName,
            link: placeLink,
        });
    }

    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value);
    }

    return (
        <PopupWithForm
            name="photo"
            title="Новое место"
            buttonText={onLoading ? `Сохранение` : `Создать`}
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}>
            <label className="popup__label">
                <input
                    required
                    type="text"
                    id="imageName-input"
                    className="popup__input popup__input_image-name"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    name="name"
                    value={placeName}
                    onChange={handleChangePlaceName}
                />
                <span className="popup__input-error imageName-input-error"/>
            </label>
            <label className="popup__label">
                <input
                    required
                    type="url"
                    id="imageLink-input"
                    className="popup__input popup__input_image-link"
                    placeholder="Ссылка на картинку"
                    name="link"
                    value={placeLink}
                    onChange={handleChangePlaceLink}
                />
                <span className="popup__input-error imageLink-input-error"/>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;