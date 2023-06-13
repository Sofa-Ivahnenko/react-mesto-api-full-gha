import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardLike, onCardDelete, onCardClick}) {
    const currentUser = useContext(CurrentUserContext);
    const isLiked = card.likes.some(userId => userId === currentUser._id);
    const likeButtonClassName = `${isLiked ? 'cards__item-like pointer cards__item-like_active' : 'cards__item-like pointer'}`;

    const isOwner = card.owner === currentUser._id;
    const deleteButtonClassName = `${isOwner ? 'cards__delete pointer cards__delete_active' : 'cards__delete pointer'}`;

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleCardClick() {
        onCardClick(card);
    }

    return (
        <li className="cards__item">
            <button
                type="button"
                className={deleteButtonClassName}
                onClick={handleDeleteClick}/>
            <img
                className="cards__item-image"
                alt={card.name}
                src={card.link}
                onClick={handleCardClick}
            />
            <div className="cards__item-description">
                <h2 className="cards__item-title">{card.name}</h2>
                <div className="cards__item-likes">
                    <button
                        type="button"
                        className={likeButtonClassName}
                        onClick={handleLikeClick}/>
                    <p className="cards__item-number-likes">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;
