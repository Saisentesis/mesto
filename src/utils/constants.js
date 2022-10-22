const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  
  const popupName = document.querySelector('.popup__input_info_name');
  const popupJob = document.querySelector('.popup__input_info_job');
  const profileButtonEdit = document.querySelector('.profile__edit-button');
  const profileButtonAdd = document.querySelector('.profile__add-button');
  const profileButtonEditAvatar = document.querySelector('.profile__edit-avatar-button');
  const popupEdit = document.querySelector('.popup_type_edit-form');
  const popupEditSaveButton = popupEdit.querySelector('.popup__save-button');
  const popupAdd = document.querySelector('.popup_type_add-form');
  const popupAddSaveButton = popupAdd.querySelector('.popup__save-button');
  const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
  const popupEditAvatarButton = popupEditAvatar.querySelector('.popup__save-button');
  const popupDelete = document.querySelector('.popup_type_delete-card');
  const popupDeleteButton = popupDelete.querySelector('.popup__save-button');

  export {validationConfig, popupName, popupJob, profileButtonEdit, profileButtonAdd, profileButtonEditAvatar, popupEditSaveButton, popupAddSaveButton, popupEditAvatarButton, popupDeleteButton}