function InfoTooltip({ status, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_infoTool ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className='popup__container popup__container_info'>
        <img src={status.image} className='popup__info-img' alt={status.text} />
        <h3 className='popup__info-title'>{status.text}</h3>
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

export default InfoTooltip;
