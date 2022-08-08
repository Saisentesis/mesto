let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupName = document.querySelector('.popup__input_info_name');
let popupJob = document.querySelector('.popup__input_info_job');

function popupOpened() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

function popupClosed() {
  popup.classList.remove('popup_opened');
}

function saveProfile(event) {
    event.preventDefault();
    profileName.textContent = popupName.value; 
    profileJob.textContent = popupJob.value;
    popupClosed(); 
}

editButton.addEventListener('click',popupOpened);
closeButton.addEventListener('click',popupClosed);
form.addEventListener('submit',saveProfile);