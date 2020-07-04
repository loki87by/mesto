//импорты
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
    /*this.popupSelector.querySelector('.popup__container').addEventListener('submit', (evt) => { // добавляет обработчик сабмита формы. 
      evt.preventDefault();
      //this.submitForm(this._getInputValues());
      this.close();
	    });*/
    }
    
    _setSubmitForm(evt) {
      evt.preventDefault();
      //location.reload();
      this.formSubmit(this._getInputValues());
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
    this.popupSelector.removeEventListener('submit', this.formSubmit);
    this.popupSelector.querySelector('.popup__container').reset();
    super.close();
  }
}