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
      this._handleCardOpenConfirmPopup(this._element.id);
    });
    
    this._photoButton.addEventListener('click',() => {
      this._handleCardClick(this._cardName, this._cardLink);
    });
  }
//возвращает true если в массиве лайкнувших есть пользователь.
  _isLikedByOwner() {
    let isLiked = false;
    this._cardLikes.forEach((item) => {
      if (this._userId === item._id) {
        isLiked = true;
      }
    })
    return isLiked;
  }
//при генерации карточки делаем сердечко активным, если пользователь ставил лайк
  _setLikeStatus() {
    if (this._isLikedByOwner()) {
      this._heart.classList.add('element__heart_active');
    }
  }

  setLikeCount() {
    this._likeCount.textContent = this._cardLikes.length;
  }

//удаляем значок корзины если пользователь не владелец карточки
  _removeElementTrash() {
    if (this._userId != this._cardOwner._id) {
      this._trash.remove();
    }
  }
  
}