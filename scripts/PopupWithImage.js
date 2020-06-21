import Popup from "./Popup.js"
import { popupSelector } from "./index.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  //  this._name = data.name;
    //this._link = data.link;
  }

  open(data) {
    const popupImage = document.querySelector('.popup__image');
    const popupTitle = document.querySelector('.popup__image-title');
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupTitle.textContent = data.name;
    super.open();
  }
}