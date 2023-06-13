import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({cards, onAddPlace, onEditProfile, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <button
                        className="profile__avatar-edit-button"
                        type="button"
                        onClick={() => {
                            onEditAvatar(true)
                        }}>
                        <img src={currentUser.avatar}
                             className="profile__avatar"
                             alt="аватар пользователя"
                        />
                    </button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        className="profile__edit-button pointer"
                        type="button"
                        onClick={() => {
                            onEditProfile(true)
                        }}/>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button pointer"
                    type="button"
                    onClick={() => {
                        onAddPlace(true)
                    }}/>
            </section>
            <section className="cards" aria-label="Фотокарточки различных уголков планеты">
                <ul className="cards__list">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardDelete={onCardDelete}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}/>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
