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
const popupPhoto = document.querySelector('.popup_type_photo-form');
const card = document.querySelector('#card').content;
const elements = document.querySelector('.elements');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

function createCard(cardName,cardLink) {
  const cardClone = card.querySelector('.element').cloneNode(true);
  const cardImage = cardClone.querySelector('.element__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardClone.querySelector('.element__text').textContent = cardName;  

  cardClone.querySelector('.element__heart').addEventListener('click',function (event) {
    event.target.classList.toggle('element__heart_active');
  });

  cardClone.querySelector('.element__trash').addEventListener('click',function (event) {
    event.target.closest('.element').remove();
  });

  cardClone.querySelector('.element__photo-button').addEventListener('click',function (event) {
    closeOpenPopup(popupPhoto);
    const popupImage = document.querySelector('.popup__image');
    popupImage.src= cardImage.src;
    popupImage.alt= cardImage.alt;
    document.querySelector('.popup__caption').textContent= cardClone.querySelector('.element__text').textContent;
  });
  return cardClone;
}

function renderCard(card, container) {
  container.prepend(card);
} 

initialCards.forEach((item) => { 
  renderCard(createCard(item.name,item.link),elements);
});

popupCloseButtons.forEach(function(btn) {
  btn.addEventListener('click', () => {
    closeOpenPopup(btn.closest('.popup'));
  })
});

function closeOpenPopup(popupType) {
  popupType.classList.toggle('popup_opened');
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = popupName.value; 
  profileJob.textContent = popupJob.value;
  closeOpenPopup(event.target.closest('.popup')); 
}

function addElement(event) {
  event.preventDefault();
  const popupAddPlace = document.querySelector('.popup__input_info_place');
  const popupAddLink = document.querySelector('.popup__input_info_link');
  renderCard(createCard(popupAddPlace.value,popupAddLink.value),elements);
  popupAddPlace.value = '';
  popupAddLink.value='';
  closeOpenPopup(event.target.closest('.popup')); 
}

profileButtonEdit.addEventListener('click',() => {
  closeOpenPopup(popupEdit);
});
profileButtonAdd.addEventListener('click',() => {
  closeOpenPopup(popupAdd);
});
popupFormEdit.addEventListener('submit',saveProfile);
popupFormAdd.addEventListener('submit',addElement);