//импорт родителя
import Popup from "./Popup.js"

//попап с картинкой
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  //разворот
  open(data) {
    this.bigImage = document.querySelector('.popup__image');
    this.bigImageCaption = document.querySelector('.popup__image-title');
    this.bigImage.src = data.link;
    this.bigImage.alt = data.name;
    this.bigImageCaption.textContent = data.name;
    super.open()
  }
}