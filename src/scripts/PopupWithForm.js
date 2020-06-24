//импорты
import Popup from "./Popup.js";
import { formObject } from "../index.js"

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
      this.submitForm(this.getInputValues());
      this.close();
	    });
    }

  //получаем введенные данные
  getInputValues() {
    const item = {
      name: this.popupSelector.querySelector('.popup__text_type_name').value,
      link: this.popupSelector.querySelector('.popup__text_type_activity').value
    };
    return item;
  }

  //чистим поля
  deleteInputValues() {
    const item = {
      name: this.popupSelector.querySelector(".popup__text_type_name").value = '',
      link: this.popupSelector.querySelector(".popup__text_type_activity").value = ''
    }
  }

  //снимаем ошибки валидации
  _cleaner() {
    const errors = Array.from(this.popupSelector.querySelectorAll('.popup__text-error'));
    const inputs = Array.from(this.popupSelector.querySelectorAll('.popup__text'));
    errors.forEach((span) => {
      span.classList.remove(formObject.errorClass);
      span.textContent = '';
    });
    inputs.forEach((input) => {
     input.classList.remove(formObject.inputErrorClass);
    });
  }

  //закрытие попапа
  close() {
    this.popupSelector.querySelector('.popup__container').reset();
    //this._cleaner();
    //this.deleteInputValues();
    super.close();
  }
}