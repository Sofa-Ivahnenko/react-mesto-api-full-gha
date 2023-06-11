import React from "react";
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({onEditProfile, onAddPlace, onEditAvatar,onCardLike, onCardClick, cards, onConfirmCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
          <section className="profile">
              <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
              <button className="profile__avatar-btn" type="button" onClick={onEditAvatar}></button>
              <div className="profile__info">
                  <div className="profile__text">
                      <h1 className="profile__title">{currentUser.name}</h1>
                      <button className="profile__button-edit" type="button"  onClick={onEditProfile}></button>
                  </div>
                  <p className="profile__subtitle">{currentUser.about}</p>
              </div>
              <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
          </section>
            <ul className="cards">
              {
                cards.map((card) => { 
                  return (
                  <Card card={card} key={card._id} likes={card.likes} name={card.name} link={card.link} onCardClick={onCardClick} onCardLike={onCardLike} onConfirmCardDelete={onConfirmCardDelete} />
                )})}
            </ul>
        </main>
    );
  }

export default Main