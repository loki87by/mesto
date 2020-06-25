//попап
export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    //закрытие эскейпом
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close()
      }
    }
    //закрытие оверлеем
    this._handleClickClose = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    }
    this._setEventListeners()
  }
  
  //слушатели закрытия
  _setEventListeners() {
    this.closeButton = this.popupSelector.querySelector('.popup__close');
    this.closeButton.addEventListener('click', () => this.close());
  }  
  
  //открытие попапа
  open() {
    this.popupSelector.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
    const inputSelector = this.popupSelector.querySelectorAll('.popup__text');
    const submitButton = this.popupSelector.querySelector('.popup__button');
    if((!inputSelector[0].value) || (!inputSelector[1].value)) {
      submitButton.classList.add('popup__button_error');
      submitButton.setAttribute('disabled', 'true');
    }
  }

  //закрытие попапа
  close() {
    this.popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleClickClose);
  }
}