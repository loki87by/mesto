//импорты
import Popup from "./Popup.js";

//попап с формой
export default class PopupWithForm extends Popup{
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this.submitForm = submitForm;
  };
  
  //расставляем слушатели
  _setEventListeners() {
    super._setEventListeners();
    this.popupSelector.querySelector('.popup__container').addEventListener('submit', (evt) => { // добавляет обработчик сабмита формы. 
      evt.preventDefault();
      this.submitForm(this._getInputValues());
      this.close();
	    });
    }

  //получаем введенные данные
  _getInputValues() {
    this._inputSelector = this.popupSelector.querySelectorAll('.popup__text');
    const item = {
      name: this._inputSelector[0].value,
      link: this._inputSelector[1].value
    }
    return item;
  }

  //закрытие попапа
  close() {
    this.popupSelector.querySelector('.popup__container').reset();
    super.close();
  }
}