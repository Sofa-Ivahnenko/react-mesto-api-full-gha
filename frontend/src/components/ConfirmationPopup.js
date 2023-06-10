import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({card, isOpen, onClose, onCloseEsc, onCloseOverlay, onSubmit, isLoading }) {

	function handleDeleteClick(event) {
		event.preventDefault();

		onSubmit(card);
		onClose();
	}

	return (
		<PopupWithForm
			isOpen={isOpen}
			onClose={onClose}
			onCloseEsc={onCloseEsc}
			onCloseOverlay={onCloseOverlay}
			onSubmit={handleDeleteClick}
			isLoading={isLoading}
			name='popupDelet'
			title='Вы уверены?'
			submitButton='Да'
			submitBtnLoading='Удаление...'
		/>
	);
};

export default ConfirmationPopup;