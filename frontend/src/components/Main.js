import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  const cardsElements = cards.map((card) => {
    return <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>;
  });

  // Подписали компонент на контекст и вынесли его в переменную
  const currentUser = useContext(CurrentUserContext);

  // Используем полученные поля объекта пользователя
  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__user">
          <button
            onClick={onEditAvatar}
            className="profile__change-button"
            type="button"
            aria-label="Редактировать аватар профиля"
          >
            <img src={`${currentUser.avatar}`} alt="Фотография профиля." className="profile__avatar" />
          </button>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать информацию профиля"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить фото места"
        ></button>
      </section>

      <section className="elements" aria-label="Галерея">
        {cardsElements}
      </section>
    </main>
  );
}

export default Main;
