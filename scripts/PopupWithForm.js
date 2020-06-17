import {Popup} from "./Popup.js";
const formObject = {
    formSelector: ".popup__container",
    inputSelector: ".popup__text",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_error",
    inputErrorClass: "popup__text-error",
    errorClass: "popup__text_error",
};

export class PopupWithForm extends Popup{
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this.submitForm = submitForm;
    }
    _setEventListeners() {
        this.popupSelector.addEventListener('submit', this.submitForm)
        super._setEventListeners();
    }
    getInputValues() {
        const item = {
            name: this.popupSelector.querySelector(".popup__text_type_name").value,
            link: this.popupSelector.querySelector(".popup__text_type_activity").value
        };
        return item;
      }
      deleteInputValues() {
        const item = {
          name: this.popupSelector.querySelector(".popup__text_type_name").value = '';
          link: this.popupSelector.querySelector(".popup__text_type_activity").value = '';
      }
      _cleaner() {
            const errors = Array.from(this.popupSelector.querySelectorAll(".popup__text_error"));
            const inputs = Array.from(this.popupSelector.querySelectorAll(".popup__text"));
            errors.forEach((span) => {
                span.classList.remove(formObject.errorClass);
                // удалим текст с ошибкой
                span.textContent = "";
            });
            inputs.forEach((input) => {
                input.classList.remove(formObject.inputErrorClass); // удалим ошибку
            });

      }
      _handleEscClose(evt) {
          super._handleEscClose(evt);
      }

    close() {
          this.popupSelector.removeEventListener('submit', this.submitForm);
          this._cleaner();
          super.close();
      }
}