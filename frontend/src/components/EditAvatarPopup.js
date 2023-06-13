import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({onLoading, onClose, onUpdateAvatar, isOpen}) {
    const avatarRef = React.useRef(null);

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    function handleChangeAvatar() {
        return avatarRef.current.value;
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText={onLoading ? `Сохранение` : `Сохранить`}
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}>
            <label className="popup__label">
                <input
                    required
                    name="avatar"
                    id="avatar-input"
                    className="popup__input popup__input_type_avatar"
                    type="url"
                    placeholder="Ссылка на аватар"
                    onChange={handleChangeAvatar}
                    ref={avatarRef}
                />
                <span className="popup__input-error avatar-input-error"/>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
