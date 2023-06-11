import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onCloseEsc, onCloseOverlay, onUpdateAvatar, isLoading }) {
	const ref = React.useRef();

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateAvatar({
			avatar: ref.current.value
		});
	}

	React.useEffect(() => {
		ref.current.value = '';
	}, [isOpen]);

	return (
		<PopupWithForm
			isOpen={isOpen}
			onClose={onClose}
			onCloseEsc={onCloseEsc}
			onCloseOverlay={onCloseOverlay}
			onSubmit={handleSubmit}
			isLoading={isLoading}
			name='popupAvatar'
			title='Обновить аватар'
			submitButton='Обновить'
			submitBtnLoading='Обновление...'
			children={
				<label className="popup__form">
					<input id="avatar" ref={ref} name="avatar" className="popup__input popup__input_type_avatar" type="url" placeholder="Ссылка на аватар" required />
					<span className="avatar-error popup__error"></span>
				</label>
			}
		/>
	)
}

export default EditAvatarPopup;