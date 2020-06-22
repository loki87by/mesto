import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  

  open(item) {
    const popupImage = document.querySelector('.popup__image');
    const popupTitle = document.querySelector('.popup__image-title');
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupTitle.textContent = item.name;
    super.open()
  }
}