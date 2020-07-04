//импорт родителя 
import Popup from "./Popup.js";

//попап с формой
export default class PopupWithForm extends Popup{
  constructor(popupSelector, {formSubmit}) {
    super(popupSelector);
    this.formSubmit = formSubmit;
  };
  
  //расставляем слушатели
  _setEventListeners() {
    this._submit = this._setSubmitForm.bind(this);
    this.popupSelector.addEventListener('submit', this._submit, {once: true});
    super._setEventListeners();
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

  //сама форма
  _setSubmitForm(evt) {
    evt.preventDefault();
    this.formSubmit(this._getInputValues());
  }

  //чистим от старых ошибок
  cleanError() {
    const errors = Array.from(document.querySelectorAll('.popup__text-error'));
    const inputs = Array.from(document.querySelectorAll('.popup__text'));
    errors.forEach((span) => {
      span.textContent = "";
    });
    inputs.forEach((input) => {
      input.classList.remove('popup__text_error');
    });
  }

  //закрытие попапа
  close() {
    this.popupSelector.removeEventListener('submit', this.formSubmit);
    this.popupSelector.querySelector('.popup__container').reset();
    super.close();
  }
}