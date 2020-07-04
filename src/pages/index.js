//импорты
import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
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
export const popupConfirm = document.getElementById('popupConfirm');
export const popupAvatar = document.getElementById('avatar');
export const profile = content.querySelector('.profile');
export const profileInfo = profile.querySelector('.profile__info');
export const editButton = profileInfo.querySelector('.profile__button_type_edit');
export const addButton = profile.querySelector('.profile__button_type_add');
export const popups = Array.from(document.querySelectorAll('.popup__container'));
export const cardListSelector = document.querySelector('.cards')
export const template = document.getElementById('card');
export const nameInput = document.querySelector(".popup__text_type_name");
export const activityInput = document.querySelector(".popup__text_type_activity");
export const editAvatar = document.querySelector(".profile__photo_change");
//объекты
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
export const token = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '35090019-cd19-48d3-8c6b-3ac80f2c4184',
    'Content-Type': 'application/json'
  }
};
//передаем токен
export const api = new Api(token);

//добавляем в UX загрузку
const load = (Loading, form, defaultText, processText) => {  
  const button = form.querySelector('.popup__button');
  if(Loading) {
    button.textContent = processText;
  } else {
    button.textContent = defaultText;
  }
}

//операции с профилем
//пользовательские данные
const userInfo = new UserInfo(formProfileInfo);
//получение юзердаты
api.getUserInfo()
.then(user => {
  userInfo.getUserInfo(user.name, user.about, user.avatar);
  userInfo.setUserInfo(user);
})
  .catch(err => {
  console.log(err);
});
//отправка юзердаты
const profileForm = new PopupWithForm(popupProfile, {
  formSubmit: (item) => {
    load(true, popupProfile,'Сохранить', 'Сохранение...');
    api.updateInfo(item.name, item.link)
    .then(res => {
      userInfo.setUserInfo(res)
      profileForm.close()
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      load(false, popupProfile,'Сохранить', 'Сохранение...');
    });
  }
})
//редактирование профиля
const editProfile = () => {
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.name;
  activityInput.value = infoAuthor.info;
  profileForm.cleanError();
  profileForm.open();
};
//попап смены аватара
const changeForm = function() {
  changeAvatar.cleanError();
  changeAvatar.open();
}
//смена аватара
const changeAvatar = new PopupWithForm(popupAvatar, {
  formSubmit: (item) => {
    load(true, popupAvatar, 'Сохранить', 'Сохранение...');
    api.setUserAvatar(item.link)
    .then((item) => {
      userInfo.writeUserAvatar(item);
    })
    .then(() => {
      changeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      load(false, popupAvatar, 'Сохранить', 'Сохранение...');
    });
  }
});

//работа с карточками
//секция карточек  
const cardList = new Section({
  renderer: (item) => {
    const card = new Card(template, () => api.like(item._id), () => api.dislike(item._id), {
      data: item, handleCardClick: () => {
        popupWithImage.open(item);
      }
    }, () => confirmSubmit.submit(item._id));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);
//дефолтные карточки
api.getInitialCards()
  .then(items => {
    cardList.renderItems(items);
  })
  .catch(err => {
    console.log(err);
  });
//попап добавления карточки
const formImage = function() {
  imageForm.cleanError();
  imageForm.open();
}
//добавление карточек
const imageForm = new PopupWithForm(addCards, {
  formSubmit: (item) => {
    load(true, addCards, 'Создать', 'Создание...');
    api.addNewCard(item.name, item.link)
    .then(res => {
    const card = new Card(template, () => api.putLike(res._id), () => api.deleteLike(res._id), {
      data: res, handleCardClick: () => {
        popupWithImage.open(res);
      }
    }, () => confirmSubmit.submit(res._id));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    load(false, addCards, 'Сохранить', 'Сохранение...');
  });
  imageForm.close();
  }
});
//разворот карточки
const popupWithImage = new PopupWithImage(popupCard);
//подтверждение удаления
const confirmSubmit = new Popup(popupConfirm);
confirmSubmit.submit = function(_id) {
  confirmSubmit.open()
  popupConfirm.addEventListener('click', evt => {
    evt.preventDefault();
    document.getElementById(_id).remove();
    api.deleteCard(_id);
    this.close();
  });
};

//валидация форм
function validation() {
  popups.forEach((form) => {
    const valid = new FormValidator(formObject, form);
      valid.enableValidation();
      valid.cleanError(form);
  });
}
//запускаем валидацию
validation();

//ставим слушатели вызова форм
editButton.addEventListener("click", () => editProfile());
addButton.addEventListener("click", () => formImage());
editAvatar.addEventListener('click', () => changeForm());