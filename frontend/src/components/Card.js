import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card({
  card,
  name,
  link,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = (card.owner._id || card.owner) === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__like-btn ${
    isLiked && 'elements__like-btn_active'
  }`;
  const cardDeleteButtonClassName = `elements__del-btn ${
    !isOwn && 'elements__del-btn_hidden'
  }`;

  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike( card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className='elements__item'>
      <img
        src={link}
        alt={name}
        className='elements__image'
        onClick={handleCardClick}
      />
      <div className='elements__description'>
        <h2 className='elements__title'>{name}</h2>
        <div className='elements__like-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          ></button>
          <p className='elements__like-counter'>{likes}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type='button'
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
export default Card;
