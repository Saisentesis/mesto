export default class Card {
  constructor(cardName, cardLink, templateSelector, handleCardClick) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._heart = this._element.querySelector('.element__heart');
    this._trash = this._element.querySelector('.element__trash');
    this._image = this._element.querySelector('.element__image');
    this._photoButton = this._element.querySelector('.element__photo-button');
    this._image.src = this._cardLink;
    this._image.alt = this._cardLink;
    this._element.querySelector('.element__text').textContent = this._cardName;
    this._setEventListeners();
    return this._element;
  }
  
  _setEventListeners() {
    this._heart.addEventListener('click', () => {
      this._setLike();
    });
    
    this._trash.addEventListener('click', () => {
      this._removeElement();
    });
    
    this._photoButton.addEventListener('click',() => {
      this._handleCardClick(this._cardName, this._cardLink);
    });
  }

  _setLike() {
    this._heart.classList.toggle('element__heart_active');
  }

  _removeElement() {
    this._element.remove();
  }
  
}