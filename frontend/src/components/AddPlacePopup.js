import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoad }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeCardName(e) {
    setName(e.target.value);
  }
  function handleChangeCardLink(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }
  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      textSubmit='Сохранить'
      onSubmit={handleSubmit}
      textLoad='Сохранение...'
      isLoad={isLoad}
    >
      <fieldset className='form__fieldset'>
        <input
          type='text'
          className='form__input form__input_type_name'
          name='card_name'
          id='cardname'
          value={name}
          onChange={handleChangeCardName}
          placeholder='Название'
          minLength={2}
          maxLength={30}
          required
        />
        <span className='form__input-error username-error' />
      </fieldset>
      <fieldset className='form__fieldset'>
        <input
          type='url'
          className='form__input form__input_type_info'
          name='card_link'
          id='cardlink'
          value={link}
          onChange={handleChangeCardLink}
          placeholder='Ссылка на картинку'
          required
          minLength={2}
          
        />
        <span className='form__input-error userabout-error' />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
