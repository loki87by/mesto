//импорты
import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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
export const popups = Array.from(document.querySelectorAll('.popup__container'));
export const cardListSelector = document.querySelector('.cards')
export const template = document.getElementById('card');
export const nameInput = document.querySelector(".popup__text_type_name");
export const activityInput = document.querySelector(".popup__text_type_activity"); 
export const formProfileInfo = {
  profileAuthor: document.querySelector('.profile__title'),
  profileActivity: document.querySelector('.profile__subtitle'),
  profilePhoto: document.querySelector('.profile__photo')
};
export const formObject = {
  formSelector: ".popup__container",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_error",
  inputErrorClass: "popup__text_error",
  errorClass: "popup__text-error",
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '35090019-cd19-48d3-8c6b-3ac80f2c4184',
    'Content-Type': 'application/json'
  }
});

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
    api.addNewCard(item.name, item.link)
      .catch((err) => {console.log(err);
      });
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

//попап с картинкой
const popupWithImage = new PopupWithImage(popupCard);

//попап добавления картинки
const formImage = function() {
  imageForm.open();
}

//пользовательские данные
const userInfo = new UserInfo(formProfileInfo);

api.getUserInfo()
.then((user) => {
  userInfo.getUserInfo(user.name, user.about, user.avatar);
  userInfo.setUserInfo(user);
})
  .catch((err) => {
  console.log(err);
});

//отправляем данные пользоавателя на сервер
const profileForm = new PopupWithForm(popupProfile, {
  formSubmit: () => {
    api.updateInfo(nameInput.value, activityInput.value)
      .then((result) => {//.then(data => userInfo.setUserInfo(data.name, data.about));
        userInfo.setInfoUser(result)
        profileForm.close();
      })
       .catch((err) => {
        console.log(err);
      });
  }
});

//редактирование профиля
const editProfile = () => { 
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.name;
  activityInput.value = infoAuthor.about;
  profileForm.open();
};
  
//секция карточек  
const cardList = new Section({
  renderer: (item) => {
    const card = new Card(template, {
      data: item, handleCardClick: () => {
        popupWithImage.open(item)
      }
  });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

api.getInitialCards()
  .then((items) => {
    cardList.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
  });

//прогон массива
//cardList.renderItems(items);//xx

//валидация форм
function validation() {
  popups.forEach((form) => {
    const valid = new FormValidator(formObject, form);
      valid.enableValidation();
      valid.cleanError(form);
  });
}

//события
editButton.addEventListener("click", () => editProfile());
addButton.addEventListener("click", () => formImage());

//валидация
validation();