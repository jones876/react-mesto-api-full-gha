import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isOpen, onClose, onCardDelete, isLoad }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  }
  return (
    <PopupWithForm
      name='confirm-delete'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      textSubmit='Да'
      onSubmit={handleSubmit}
      textLoad='Удаление...'
      isLoad={isLoad}
    />
  );
}

export default ConfirmDeletePopup;
