import {popupPhoto, popupImage, popupCaption, openPopup} from './index.js';
export default class Card {
  constructor(cardName, cardLink, templateSelector) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  
      return cardElement;
    }
  
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._cardLink;
    this._element.querySelector('.element__text').textContent = this._cardName;
    this._setEventListeners();
    return this._element;
  }
  
  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._setLike();
    });
    
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._removeElement();
    });
    
    this._element.querySelector('.element__photo-button').addEventListener('click',() => {
      this._zoomCard();
    });
  }

  _setLike() {
    this.heart = this._element.querySelector('.element__heart');
    this.heart.classList.toggle('element__heart_active');
  }

  _removeElement() {
    this._element.remove();
  }
  
  _zoomCard() {
    openPopup(popupPhoto);
    popupImage.src = this._cardLink;
    popupImage.alt = this._cardName;
    popupCaption.textContent = this._cardName;;
  }
}