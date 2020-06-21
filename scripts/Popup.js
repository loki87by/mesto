
export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    
    console.log(this)
  }
  
  _setEventListeners() {
    this.closeButton = this.popupSelector.querySelector('.popup__close');
    this.closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', evt => this._handleEscClose(evt));
    document.addEventListener('click', evt => this._handleClickClose(evt));
  }  

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close()
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close()
    }
  }
  
  open() {
    this.popupSelector.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this.popupSelector.classList.remove('popup_opened');
  }
}