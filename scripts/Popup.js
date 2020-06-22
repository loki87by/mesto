//попап
export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
  }
  
  //слушатели закрытия
  _setEventListeners() {
    this.closeButton = this.popupSelector.querySelector('.popup__close');
    this.closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', evt => this._handleEscClose(evt));
    document.addEventListener('click', evt => this._handleClickClose(evt));
  }  

  //закрытие эскейпом
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close()
    }
  }

  //закрытие оверлеем
  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close()
    }
  }
  
  //открытие попапа
  open() {
    this.popupSelector.classList.add('popup_opened');
    this._setEventListeners();
  }

  //закрытие попапа
  close() {
    this.popupSelector.classList.remove('popup_opened');
  }
}