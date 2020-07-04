//попап
export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.closeButton = popupSelector.querySelector('.popup__close');
  }

  //открываем попап
  open() {
    this._setEventListeners();
    this.popupSelector.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  //ставим слушатели закрытия
  _setEventListeners() {
    this._handleEsc = this._handleEscClose.bind(this);
    this._handleClose = this.close.bind(this);
    this._handleClick = this._handleClickClose.bind(this);
    this.closeButton.addEventListener('click', this._handleClose);
    document.addEventListener('keydown', this._handleEsc);
    document.addEventListener('click', this._handleClick);
  }
  //закрытие эскейпом
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }
  //закрытие оверлеем
  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close()
    }
  }

  //закрываем попап
  close() {
    this.closeButton.removeEventListener('click', this._handleClose);
    document.removeEventListener('keydown', this._handleEsc);
    document.removeEventListener('click', this._handleClick);
    this.popupSelector.classList.remove('popup_opened');
  }
}