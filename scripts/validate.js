const object = {
    //объект с полями форм, которые надо проверить
    formSelector: ".popup__container", //форма
    inputSelector: ".popup__text", //инпуты
    submitButtonSelector: ".popup__button", //кнопка сохранить/создать
    inactiveButtonClass: "popup__button_error", //неактивная кнопка
    inputErrorClass: "popup__text_error", //ошибка в инпуте
    errorClass: "popup__text-error", //ошибка в спане
};

// Функция добавки ошибки
const showInputError = (formElement, inputElement, errorMessage, form) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(form.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(form.errorClass);
};
  
// Функция, очистки ошибки
const hideInputError = (formElement, inputElement, form) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(form.inputErrorClass);
    errorElement.classList.remove(form.errorClass);
    errorElement.textContent = "";
};
  
// вызов и скрытие ошибки
const checkInputValidity = (formElement, inputElement, form) => {
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            form);
    } else {
        hideInputError(formElement, inputElement, form);
    }
};
  
//проверка на валидность
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
  
//активация/дезактивация кнопки
const toggleButtonState = (inputList, buttonElement, form) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(form.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(form.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
};

//добавка слушателей
const setEventListeners = (formElement, form) => {
    const inputList = Array.from(
        formElement.querySelectorAll(form.inputSelector)
    );
    const buttonElement = formElement.querySelector(form.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            toggleButtonState(inputList, buttonElement, form);
            checkInputValidity(formElement, inputElement, form);
        });
    });
};

const enableValidation = (form) => {
    const formList = Array.from(document.querySelectorAll(form.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, form);
    });
};

enableValidation(object);