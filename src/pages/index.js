import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {validationConfig, initialCards, profileName, profileJob, popupName, popupJob, profileButtonEdit, profileButtonAdd, popupAddPlace, popupAddLink} from '../utils/constants.js';
import './index.css';

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

const section = new Section({items: initialCards, renderer: (item) => {
  section.addItem(createCard(item));
}
}, '.elements');

section.renderItems();

function createCard(item) {
  const card = new Card(item.name, item.link, '#card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

const popupWithFormEdit = new PopupWithForm({popupSelector: '.popup_type_edit-form', handleFormSubmit: (event) => {
  event.preventDefault();
  userInfo.setUserInfo(popupName.value, popupJob.value);
  popupWithFormEdit.close();
}});

const popupWithFormAdd = new PopupWithForm({popupSelector: '.popup_type_add-form', handleFormSubmit: (event) => {
  event.preventDefault();
  section.addItem(createCard({name: popupAddPlace.value, link: popupAddLink.value}));
  event.target.reset();
  popupWithFormAdd.close();
}});

const popupWithImage = new PopupWithImage({popupSelector: '.popup_type_photo-form'});

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();

function handleCardClick(name,link) {
  popupWithImage.open(link,name);
}

profileButtonEdit.addEventListener('click',() => {
  popupWithFormEdit.open();
  formValidators['popup__form-edit'].resetValidation();
  popupName.value = profileName.textContent; 
  popupJob.value = profileJob.textContent;
});

profileButtonAdd.addEventListener('click',() => {
  popupWithFormAdd.open();
  formValidators['popup__form-add'].resetValidation();
});

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);