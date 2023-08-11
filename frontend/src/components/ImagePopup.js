function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${card.link ? 'popup_opened' : ''}`}
    >
      <div className='popup__full-image'>
        <img
          className='popup__img'
          src={card ? card.link : ''}
          alt={card.name}
        />
        <h3 className='popup__img-title'>{card.name}</h3>
        <button
          className='popup__close-btn popup__close-img'
          type='button'
          aria-label='ClosePopup'
          onClick={onClose}
        />
      </div>
    </div>
  );
}
export default ImagePopup;
