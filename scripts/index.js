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

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupName = document.querySelector('.popup__input_info_name');
let popupJob = document.querySelector('.popup__input_info_job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editForm = document.querySelector('.popup__form_type_edit-form');
const addForm = document.querySelector('.popup__form_type_add-form');
const popupEdit = document.querySelector('.popup_type_edit-form');
const popupAdd = document.querySelector('.popup_type_add-form');
const popupPhoto = document.querySelector('.popup_type_photo-form');
const card = document.querySelector('#card').content;
const elements = document.querySelector('.elements');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

initialCards.forEach(function(item) {
  let cardClone = card.querySelector('.element').cloneNode(true);
  cardClone.querySelector('.element__image').src = item.link;
  cardClone.querySelector('.element__image').alt = item.name;
  cardClone.querySelector('.element__text').textContent = item.name;  

  cardClone.querySelector('.element__heart').addEventListener('click',function (event) {
    event.target.classList.toggle('element__heart_active');
  });

  cardClone.querySelector('.element__trash').addEventListener('click',function (event) {
    event.target.closest('.element').remove();
  });

  cardClone.querySelector('.element__photo-button').addEventListener('click',function (event) {
    popupCloseOpen(popupPhoto);
    document.querySelector('.popup__image').src= cardClone.querySelector('.element__image').src;
    document.querySelector('.popup__caption').textContent= cardClone.querySelector('.element__text').textContent;
  });

  elements.prepend(cardClone); 
});

popupCloseButtons.forEach(function(btn) {
  btn.addEventListener('click', () => {
    popupCloseOpen(btn.closest('.popup'));
  })
});

function popupCloseOpen(popupType) {
  popupType.classList.toggle('popup_opened');
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = popupName.value; 
  profileJob.textContent = popupJob.value;
  popupCloseOpen(event.target.closest('.popup')); 
}

function addElement(event) {
  event.preventDefault();
  let popupAddPlace = document.querySelector('.popup__input_info_place').value;
  let popupAddLink = document.querySelector('.popup__input_info_link').value;
  let cardClone = card.querySelector('.element').cloneNode(true);
  cardClone.querySelector('.element__image').src = popupAddLink;
  cardClone.querySelector('.element__image').alt = popupAddPlace;
  cardClone.querySelector('.element__text').textContent = popupAddPlace;  
  cardClone.querySelector('.element__heart').addEventListener('click',function (event) {
    event.target.classList.toggle('element__heart_active');
  });
  cardClone.querySelector('.element__trash').addEventListener('click',function (event) {
    event.target.closest('.element').remove();
  });
  elements.prepend(cardClone); 
  popupCloseOpen(event.target.closest('.popup')); 
}

editButton.addEventListener('click',() => {
  popupCloseOpen(popupEdit);
});
addButton.addEventListener('click',() => {
  popupCloseOpen(popupAdd);
});
editForm.addEventListener('submit',saveProfile);
addForm.addEventListener('submit',addElement);