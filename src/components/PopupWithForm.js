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
    this._inputList = this.popupSelector.querySelectorAll('.popup__text');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  //закрытие попапа
  close() {
    this.popupSelector.querySelector('.popup__container').reset();
    super.close();
  }
}