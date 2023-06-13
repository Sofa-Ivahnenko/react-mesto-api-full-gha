import React, {useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({onClose, onUpdateUser, onLoading, isOpen}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: about,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText={onLoading ? `Сохранение` : `Сохранить`}
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}>
            <label className="popup__label">
                <input
                    required
                    name="name"
                    id="profileName-input"
                    className="popup__input popup__input_name"
                    type="text"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    value={name || ""}
                    onChange={handleChangeName}
                />
                <span className="popup__input-error profileName-input-error"/>
            </label>
            <label className="popup__label">
                <input
                    required
                    name="about"
                    id="profileJob-input"
                    className="popup__input popup__input_job"
                    type="text"
                    placeholder="Вид деятельности"
                    minLength="2"
                    maxLength="200"
                    value={about || ""}
                    onChange={handleChangeAbout}
                />
                <span className="popup__input-error profileJob-input-error"/>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
