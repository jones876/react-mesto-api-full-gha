import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoad }) {
  const refAvatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: refAvatar.current.value,
    });
  }

  useEffect(() => {
    refAvatar.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name='update-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onUpdateAvatar={onUpdateAvatar}
      textSubmit='Сохранить'
      onSubmit={handleSubmit}
      textLoad='Сохранение...'
      isLoad={isLoad}
    >
      <fieldset className='form__fieldset'>
        <input
          ref={refAvatar}
          type='url'
          className='form__input form__input_type_link'
          name='avatar'
          id='avatarlink'
          placeholder='Ссылка на аватар'
          required
        />
        <span className='form__input-error avatarlink-error' />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
