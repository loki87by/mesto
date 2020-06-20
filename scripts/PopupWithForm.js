//import { popupSelector } from "./index.js"
import Popup from "./Popup.js";

const formObject = {
  formSelector: ".popup__container",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_error",
  inputErrorClass: "popup__text_error",
  errorClass: "popup__text-error",
};

export default class PopupWithForm extends Popup{
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this.submitForm = submitForm;
    };
  

  _setEventListeners() {
    this._submit = this._setSubmitForm.bind(this);
    this.popupSelector.querySelector('.popup__container').addEventListener('submit', this._submit, {once: true});
    super._setEventListeners();
  }

  _setSubmitForm(evt) {
    evt.preventDefault();
    this.submitForm(this._getInputValues());
}

  _getInputValues() {
    const item = {
      name: this._popupSelector.querySelector('.popup__text_type_name').value,
      link: this._popupSelector.querySelector('.popup__text_type_activity').value
    };
    return item;
  }

  _deleteInputValues() {
    const item = {
      name: this.popupSelector.querySelector(".popup__text_type_name").value = '',
      link: this.popupSelector.querySelector(".popup__text_type_activity").value = ''
    }
  }

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

  close() {
    this.popupSelector.querySelector('.popup__container').removeEventListener('submit', this.submitForm);
    this._cleaner();
    this._deleteInputValues();
    super.close();
  }
}