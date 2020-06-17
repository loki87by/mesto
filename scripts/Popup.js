export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
   // this.open = open;
  //  this.close = close;
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
    if (evt.target.classList.contains("popup_opened")) {
      this.close()
    }
  }

  close() {
    this.popupSelector.classList.remove("popup_opened");
  }

  open() {
    this._setEventListeners();
    this.popupSelector.classList.add("popup_opened");
  }
}