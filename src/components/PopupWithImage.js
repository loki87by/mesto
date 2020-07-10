//импорт родителя
import Popup from "./Popup.js"

//попап с картинкой
export default class PopupWithImage extends Popup {
  constructor(popupSelector, bigImageSelector, captionSelector) {
    super(popupSelector);
    this.bigImage = bigImageSelector;
    this.bigImageCaption = captionSelector;
  }

  //разворот
  open(data) {
    this.bigImage.src = data.link;
    this.bigImage.alt = data.name;
    this.bigImageCaption.textContent = data.name;
    super.open()
  }
}