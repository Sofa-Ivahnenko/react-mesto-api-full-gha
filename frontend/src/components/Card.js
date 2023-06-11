import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onConfirmCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

	const isOwn = card.owner._id === currentUser._id;
	const cardDeleteButtonClassName = (
    `card__button-delet ${!isOwn && 'card__button-delet__hidden'}` 
	);

	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`card__button ${isLiked && 'card__button-like'}`
	);

  function handleCardClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleConfirmClick() {
		onConfirmCardDelete(card);
	}


  return (
    <li className="card">
        <img className="card__image" alt={card.name} src={card.link} onClick={handleCardClick} />
        <div className="card__content">
            <h2 className="card__title">{card.name}</h2>
            <div className="card__likes">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick}  type="button"></button>
                <span className="card__likes-counter">{card.likes.length}</span>
            </div>
        </div>
        <button className={cardDeleteButtonClassName} onClick={handleConfirmClick} type="button"></button>
    </li>
  )
}

export default Card
