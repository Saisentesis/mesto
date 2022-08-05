let popup = document.querySelector('.popup');
let EditButton = document.querySelector('.profile__edit-button');
let CloseButton = document.querySelector('.popup__close-button');
let Form = document.querySelector('.popup__form');
let ProfileName = document.querySelector('.profile__name');
let ProfileJob = document.querySelector('.profile__job');
let PopupName = document.querySelector('.popup__name');
let PopupJob = document.querySelector('.popup__job');

function PopupOpened() {
  popup.classList.add('popup_opened');
  PopupName.value = ProfileName.textContent;
  PopupJob.value = ProfileJob.textContent;
}

function PopupClosed() {
  popup.classList.remove('popup_opened');
}

function SaveProfile(event) {
    event.preventDefault();
    ProfileName.textContent = PopupName.value; 
    ProfileJob.textContent = PopupJob.value;
    PopupClosed(); 
}

EditButton.addEventListener('click',PopupOpened);
CloseButton.addEventListener('click',PopupClosed);
Form.addEventListener('submit',SaveProfile);
