//импорты
import Popup from "./Popup.js"

//попап с картинкой
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.bigImage = document.querySelector('.popup__image');
    this.bigImageCaption = document.querySelector('.popup__image-title');
  }

  //открытие
  open(data) {
//    const bigImage = document.querySelector('.popup__image');
  //  const bigImageCaption = document.querySelector('.popup__image-title');
    this.bigImage.src = data.link;
    this.bigImage.alt = data.name;
    this.bigImageCaption.textContent = data.name;
    super.open()
  }
}