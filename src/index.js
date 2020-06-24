//импорты
import './pages/index.css';
import custo from './images/kusto.jpg';
import logo from './images/mesto.png';
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";

//переменны
export const page = document.querySelector('.page');
export const content = page.querySelector('.content');
export const popup = document.querySelector('.popup');
export const popupProfile = document.getElementById('popupProfile');
export const addCards = document.getElementById('addCards');
export const popupCard = document.getElementById('popupCard');
export const profile = content.querySelector('.profile');
export const profileInfo = profile.querySelector('.profile__info');
export const editButton = profileInfo.querySelector('.profile__button_type_edit');
export const addButton = profile.querySelector('.profile__button_type_add');
export const profileAuthor = profile.querySelector('.profile__title');
export const profileActivity = profile.querySelector('.profile__subtitle');
export const popups = Array.from(document.querySelectorAll('.popup__container'));
export const cardListSelector = document.querySelector('.cards')
export const template = document.getElementById('card');
export const nameInput = document.querySelector(".popup__text_type_name"); //имя в инпут
export const activityInput = document.querySelector(".popup__text_type_activity"); 
export const formProfileInfo = {
  profileAuthor: document.querySelector('.profile__title'),
  profileActivity: document.querySelector('.profile__subtitle'),
};
export const formObject = {
  formSelector: ".popup__container",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_error",
  inputErrorClass: "popup__text_error",
  errorClass: "popup__text-error",
};

//массив картинок
export const items = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//добавление карточек
const imageForm = new PopupWithForm(addCards, {
  submitForm: (item) => {
    const card = new Card(template, {
      data: item, handleCardClick: () => {
        popupWithImage.open(item);
      }
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    imageForm.close();
  }
});

//секция карточек  
const cardList = new Section({
  items, renderer: (item) => {
    const card = new Card(template, {
      data: item, handleCardClick: () => {
        const popupWithImage = new PopupWithImage(popupCard, item)
        popupWithImage.open(item)
      }
  });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

//попап с картинкой
const popupWithImage = new PopupWithImage(popupCard);

//попап добавления картинки
const formImage = function() {
  imageForm.deleteInputValues()
  imageForm.open();
  openImageForm()
}

//пользовательские данные
const userInfo = new UserInfo(formProfileInfo);

//попап редактирования профиля
const formInfo = new PopupWithForm(popupProfile, {
  submitForm: (item) => {
    userInfo.setUserInfo(item);
    formInfo.close();
  }
});

//редактирование профиля
const editProfile = () => {
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.name;
  activityInput.value = infoAuthor.info;
  formInfo.open();
  cleanError(popupProfile);
}

//обнуление ошибок
function cleanError(form) {
  const buttonSave = form.querySelector('.popup__button_type_save');
  form.querySelectorAll('.popup__text-error').forEach((span) => {
    span.textContent = '';
  })}

//прогон массива
cardList.renderItems(items);

const openImageForm = function() {
  imageForm.deleteInputValues();
  imageForm.open();
  cleanError(addCards);
}

//чистка инпутов
function clearInputs() {
  linkInput.value = "";
  placeInput.value = "";
};

//валидация форм
function validation() {
  popups.forEach((form) => {
    const valid = new FormValidator(formObject, form);
      valid.enableValidation();
  });
}

//события
editButton.addEventListener("click", () => editProfile());
addButton.addEventListener("click", () => formImage());

//валидация
validation();