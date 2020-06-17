import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
  constructor(item, popupSelector) {
    super(popupSelector)
    this._title = item.name;
    this._image = item.link;
  }
  
  _setEventListeners() {
    super._setEventListeners();
  }

  open(link, name) {
    document.querySelector('.popup__image').src = this._image;
    document.querySelector('.popup__image').alt = this._title;
    document.querySelector('.popup__image-title').textContent = this._title;
    super.open();
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  _handleClickClose(evt) {
    super._handleClickClose(evt);
  }

  close() {
    super.close();
  }
}