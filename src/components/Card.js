export default class Card {
  constructor(cardInfo, userId, templateSelector, handleCardClick, handleCardOpenConfirmPopup, setLike, removeLike) {
    this._cardName = cardInfo.name;
    this._cardLink = cardInfo.link;
    this._cardLikes = cardInfo.likes;
    this._cardId = cardInfo._id;
    this._cardOwner = cardInfo.owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardOpenConfirmPopup = handleCardOpenConfirmPopup;
    this._setLike = setLike;
    this._removeLike = removeLike;
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
    this._element.id = this._cardId;
    this._heart = this._element.querySelector('.element__heart');
    this._trash = this._element.querySelector('.element__trash');
    this._image = this._element.querySelector('.element__image');
    this._likeCount = this._element.querySelector('.element__like-count');
    this._photoButton = this._element.querySelector('.element__photo-button');
    this._image.src = this._cardLink;
    this._image.alt = this._cardLink;
    this._likeCount.textContent = this._cardLikes.length;
    this._element.querySelector('.element__text').textContent = this._cardName;
    this._setEventListeners();
    this._removeElementTrash();
    this._setLikeStatus();
    return this._element;
  }
  
  _setEventListeners() {
    this._heart.addEventListener('click', () => {
      if (this._isLikedByOwner()) {
        this._removeLike(this._cardId);
      }
      else {
        this._setLike(this._cardId);
      }
    });
    
    this._trash.addEventListener('click', () => {
      this._handleCardOpenConfirmPopup(this._element.id, this.deleteCard.bind(this));
    });
    
    this._photoButton.addEventListener('click',() => {
      this._handleCardClick(this._cardName, this._cardLink);
    });
  }

  _isLikedByOwner() {
    let isLiked = false;
    this._cardLikes.forEach((item) => {
      if (this._userId === item._id) {
        isLiked = true;
      }
    })
    return isLiked;
  }

  _setLikeStatus() {
    if (this._isLikedByOwner()) {
      this._heart.classList.add('element__heart_active');
    }
  }

  renewLikes(likes) {
    this._cardLikes = likes;
    this._likeCount.textContent = this._cardLikes.length;
    this._heart.classList.toggle('element__heart_active');
  }

  _removeElementTrash() {
    if (this._userId != this._cardOwner._id) {
      this._trash.remove();
    }
  }

  deleteCard() {
    this._element.remove();
  }
  
}