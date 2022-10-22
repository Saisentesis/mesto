import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api';
import {validationConfig, popupName, popupJob, profileButtonEdit, profileButtonAdd, profileButtonEditAvatar, popupEditSaveButton, popupAddSaveButton, popupEditAvatarButton, popupDeleteButton} from '../utils/constants.js';
import { isLoading } from '../utils/utils.js'
import './index.css';

const api = new Api({
baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '9612102c-bb83-4d0c-bb80-1c3fb6d8a3f1',
    'Content-Type': 'application/json'
  }
}); 

Promise.all([
  api.getInitialCards(),
  api.getUserInfo()
])
.then((value) => {
  const [initialCards, owner] = value;
  userInfo.setUserInfo(owner);
  section.renderItems(initialCards);
})
.catch((err) => console.log(err));

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar', _id: ''});

const section = new Section({renderer: (item) => {
  section.addItem(createCard(item));
}
}, '.elements');

function createCard(cardInfo) {
  const card = new Card(cardInfo, userInfo.getUserId(), '#card', handleCardClick, handleCardOpenConfirmPopup, setLike, removeLike);
  const cardElement = card.generateCard();
  return cardElement
}

function handleCardOpenConfirmPopup(id, deleteCard) {
  popupConfirmDelete.open(id, deleteCard);
}

function handleCardClick(name,link) {
  popupWithImage.open(link,name);
}

function setLike(id) {
  api.setLike(id)
  .then((res) => {
    this.renewLikes(res.likes);
  })
  .catch((err) => {
    console.log(err)
  })
}

function removeLike(id) {
  api.removeLike(id)
  .then((res) => {
    this.renewLikes(res.likes);
  })
  .catch((err) => {
    console.log(err)
  })
}

const popupWithFormEdit = new PopupWithForm({popupSelector: '.popup_type_edit-form', handleFormSubmit: (inputValues) => {
  isLoading(popupEditSaveButton, 'Сохранение...');
  api.editProfile(inputValues)
  .then(res => {
    userInfo.setUserInfo(res);
  })
  .then(() => {
    popupWithFormEdit.close();
  })
  .catch((err) => console.log(err))
  .finally(() => isLoading(popupEditSaveButton, 'Сохранить'))
}});

const popupWithFormAdd = new PopupWithForm({popupSelector: '.popup_type_add-form', handleFormSubmit: (inputValues) => {
  isLoading(popupAddSaveButton, 'Сохранение...');
  api.addCard(inputValues)
  .then(res => {
    section.addItem(createCard(res));
    popupWithFormAdd.close();
  })
  .catch((err) => console.log(err))
  .finally(() => isLoading(popupAddSaveButton, 'Сохранить'))
}});

const popupFormEditAvatar = new PopupWithForm({popupSelector: '.popup_type_edit-avatar', handleFormSubmit: (link) => {
  isLoading(popupEditAvatarButton, 'Сохранение...');
  api.editAvatar(link.editavatarinput)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupFormEditAvatar.close();
  })
  .catch((err) => console.log(err))
  .finally(() => isLoading(popupEditAvatarButton, 'Сохранить'))
}});

const popupWithImage = new PopupWithImage({popupSelector: '.popup_type_photo-form'});

const popupConfirmDelete = new PopupWithConfirmation({popupSelector: '.popup_type_delete-card', handleFormSubmit: (id, deleteCard) => {
  isLoading(popupDeleteButton, 'Удаление...');
  api.deleteCard(id)
  .then(() => {
    deleteCard();
    popupConfirmDelete.close();
  })
  .catch((err) => console.log(err))
  .finally(() => isLoading(popupDeleteButton, 'Да'))
}});

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();
popupFormEditAvatar.setEventListeners();
popupConfirmDelete.setEventListeners();

profileButtonEdit.addEventListener('click',() => {
  popupWithFormEdit.open();
  const profileInfo = userInfo.getUserInfo();
  popupName.value = profileInfo.name; 
  popupJob.value = profileInfo.job;
  formValidators['popup__form-edit'].resetValidation();
});

profileButtonAdd.addEventListener('click',() => {
  popupWithFormAdd.open();
  formValidators['popup__form-add'].resetValidation();
});

profileButtonEditAvatar.addEventListener('click',() => {
  popupFormEditAvatar.open();
  formValidators['editavatarform'].resetValidation();
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