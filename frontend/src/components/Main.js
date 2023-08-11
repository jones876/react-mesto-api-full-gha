import { useContext} from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <button
          className='profile__edit-avatar-btn'
          type='button'
          aria-label='EditAvatar'
          onClick={onEditAvatar}
        />
        <div
          className='profile__avatar'
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className='profile__info-container'>
          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='profile__edit-btn'
              type='button'
              aria-label='EditProfile'
              onClick={onEditProfile}
            ></button>
          </div>
          <p className='profile__description'>{currentUser.about}</p>
        </div>
        <button
          className='profile__add-btn'
          type='button'
          aria-label='AddCard'
          onClick={onAddPlace}
        ></button>
      </section>
      <section className='elements'>
        <ul className='elements__list'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
