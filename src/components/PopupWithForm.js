import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}){
    super({popupSelector});
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._inputValues = {};
  }
  
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues())});
  }

  close() {
    super.close();
    this._form.reset();
  }
}