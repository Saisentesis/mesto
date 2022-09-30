import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const popupFormEdit = document.querySelector('.popup__form_type_edit-form');
const popupFormAdd = document.querySelector('.popup__form_type_add-form');
const popupEdit = document.querySelector('.popup_type_edit-form');
const popupAdd = document.querySelector('.popup_type_add-form');
const popupAddButton = popupAdd.querySelector('.popup__save-button');
const popupPhoto = document.querySelector('.popup_type_photo-form');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupAddPlace = document.querySelector('.popup__input_info_place');
const popupAddLink = document.querySelector('.popup__input_info_link');
const card = document.querySelector('#card').content;
const elements = document.querySelector('.elements');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const allPopups = document.querySelectorAll('.popup');

initialCards.forEach((item) => { 
  const card = new Card(item.name, item.link, '#card');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
});

popupCloseButtons.forEach(function(btn) {
  btn.addEventListener('click', () => {
    closePopup(btn.closest('.popup'));
  })
});

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closeIfEscape);
}

function closeIfEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeIfEscape);
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = popupName.value; 
  profileJob.textContent = popupJob.value;
  closePopup(event.target.closest('.popup')); 
}

function addElement(event) {
  event.preventDefault();
  const card = new Card(popupAddPlace.value,popupAddLink.value, '#card');
  const cardElement = card.generateCard();
  renderCard(cardElement,elements);
  event.target.reset();
  closePopup(event.target.closest('.popup')); 
}

function renderCard(card, container) {
  container.prepend(card);
} 

profileButtonEdit.addEventListener('click',() => {
  openPopup(popupEdit);
  popupName.value = profileName.textContent; 
  popupJob.value = profileJob.textContent;
});

profileButtonAdd.addEventListener('click',() => {
  openPopup(popupAdd);
  popupAddButton.setAttribute("disabled", "disabled");
  popupAddButton.classList.add(validationConfig.inactiveButtonClass);
});

popupFormEdit.addEventListener('submit',saveProfile);
popupFormAdd.addEventListener('submit',addElement);

allPopups.forEach(function(popup) {
  popup.addEventListener('mousedown', (event) => {
    if (!event.target.closest('.popup__container')){
      closePopup(event.target.closest('.popup'));
   }
  });
});

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

export {popupPhoto, popupImage, popupCaption, openPopup};