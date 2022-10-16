const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
  
  const profileName = document.querySelector('.profile__name');
  const profileJob = document.querySelector('.profile__job');
  const popupName = document.querySelector('.popup__input_info_name');
  const popupJob = document.querySelector('.popup__input_info_job');
  const profileButtonEdit = document.querySelector('.profile__edit-button');
  const profileButtonAdd = document.querySelector('.profile__add-button');
  const popupAddPlace = document.querySelector('.popup__input_info_place');
  const popupAddLink = document.querySelector('.popup__input_info_link');

  export {validationConfig, initialCards, profileName, profileJob, popupName, popupJob, profileButtonEdit, profileButtonAdd, popupAddPlace, popupAddLink}