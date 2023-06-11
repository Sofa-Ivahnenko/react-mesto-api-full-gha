import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onCloseEsc, onCloseOverlay, onUpdateUser, isLoading }) {
	const [user, setName] = React.useState('');
	const [job, setDescription] = React.useState('');
	const currentUser = React.useContext(CurrentUserContext);

	React.useEffect(() => {
		if (isOpen) {
			setName(currentUser.name);
			setDescription(currentUser.about);
		}
	}, [currentUser, isOpen]);

	function handleNameChange(event) {
		setName(event.target.value);
	}

	function handleDescriptionChange(event) {
		setDescription(event.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateUser({
			 user,
             job
		});
	}

	return (
		<PopupWithForm
			isOpen={isOpen}
			onClose={onClose}
			onCloseEsc={onCloseEsc}
			onCloseOverlay={onCloseOverlay}
			onSubmit={handleSubmit}
			isLoading={isLoading}
			name='popupEdit'
			title='Редактировать профиль'
			submitButton='Сохранить'
			submitBtnLoading='Сохранение...'
			children={
				<>
					<label className="popup__form">
						<input id="person" name="user" className="popup__input popup__input_type_name" value={user || ''} onChange={handleNameChange} type="text" placeholder="Имя" minLength="2" maxLength="40" required />
						<span id="text-name-error" className="person-error popup__error"></span>
					</label>
					<label className="popup__form">
						<input id="about" name="job" className="popup__input popup__input_type_composition" value={job || ''} onChange={handleDescriptionChange} type="text" placeholder="О себе" minLength="2" maxLength="200" required />
						<span id="text-profile-error" className="about-error popup__error"></span>
					</label>
				</>
			}
		/>
	)
}

export default EditProfilePopup;