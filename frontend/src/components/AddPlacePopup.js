import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // Используем управляемые компоненты
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // В управляемых компонентах будут исползованы пустые строки
  // Стейт-переменные будут обновляться при изменении изОпен (второй аргумент)
  // Реализация очищения инпутов при открытии формы
  useEffect(() => {
    if (isOpen) {
      setName('')
      setLink('')
    }
  }, [isOpen])

  // Обработчики изменений в инпутах, обновляющие стейт
  function handleChangeName (evt) {
    setName(evt.target.value);
  }
  function handleChangeLink (evt) {
    setLink(evt.target.value);
  }

  // Обработчик сабмита в котором мы
  function handleSubmit (evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // В аргумент внешней функции обработчика передаем управляемые стейт-переменные
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      type="add"
      title="Новое место"
      name="add-mesto"
      buttonText="Создать"
    >
      <input
        type="text"
        id="name-card"
        className="popup__input popup__input_type_mesto-title"
        name="name"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        value={name || ''}
        onChange={handleChangeName}
      />
      <span id="name-card-error" className="popup__error popup__error_visible"></span>
      <input
        type="url"
        id="link"
        className="popup__input popup__input_type_mesto-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ''}
        onChange={handleChangeLink}
      />
      <span id="link-error" className="popup__error popup__error_visible"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
