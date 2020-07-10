/*спасибо за советы в "можно лучше", некоторые очень заинтересовали (особенно римраф и тэги 
  в   комментах), обязательно применю их к своему коду на выходных, но пока не стал тратить
  время с которым и так очень туго.*/
/*надеюсь я правильно понял ваше третье замечание в последнем ревью и речь шла о 
последовательности выполнения кода ) */

//импорты
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import load from '../utils/utils.js';

//переменные
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
export const nameInput = document.querySelector('.popup__text_type_name');
export const activityInput = document.querySelector('.popup__text_type_activity');
export const editAvatar = document.querySelector('.profile__photo_change');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__image-title');

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

//**валидация попапов
//*валидация попапа редактирования профиля
const popupProfileValidation = new FormValidator(formObject, popupProfile);
popupProfileValidation.enableValidation();
//*валидация попапа добавления карточек
const addCardsValidation = new FormValidator(formObject, addCards);
addCardsValidation.enableValidation();
//*валидация попапа смены аватара
const popupAvatarValidation = new FormValidator(formObject, popupAvatar);
popupAvatarValidation.enableValidation();

//**операции с профилем
//*пользовательские данные
const userInfo = new UserInfo(formProfileInfo);
//*отправка юзердаты
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
//*редактирование профиля
const editProfile = () => {
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.name;
  activityInput.value = infoAuthor.info;
  popupProfileValidation.cleanError(formObject, popupProfile);
  profileForm.open();
};
//*попап смены аватара
const changeForm = function() {
  popupAvatarValidation.cleanError(formObject, popupAvatar);
  changeAvatar.open();
}
//*смена аватара
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

//загрузка данных профиля и стоковых карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.getUserInfo(user.name, user.about, user.avatar, user._id);
    userInfo.setUserInfo(user);
    cardList.renderItems(cards, user._id);
  })
  .catch((err) => {
    console.log(err);
  });

//**работа с карточками
//*секция карточек  
const cardList = new Section({
  renderer: (item, userId) => {
    createCards(item, userId);
  }
}, cardListSelector);
//*попап добавления карточки
const formImage = function() {
  addCardsValidation.cleanError(formObject, addCards);
  imageForm.open();
}
//*добавление карточек
const imageForm = new PopupWithForm(addCards, {
  formSubmit: (item) => {
    load(true, addCards, 'Создать', 'Создание...');
    api.addNewCard(item.name, item.link)
    .then(res => {
      createCards(res, res.owner._id)
    imageForm.close();
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
//*создание карточек
const createCards = (item, userId) => {
  const card = new Card(template, () => api.like(item._id), () => api.dislike(item._id), {
    data: item, handleCardClick: () => {
      popupWithImage.open(item);}
    }, () => confirmSubmit.submit(item._id), userId)
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}
//*разворот карточки
const popupWithImage = new PopupWithImage(popupCard, popupImage, popupCaption);
//*подтверждение удаления
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

//ставим слушатели вызова форм
editButton.addEventListener("click", () => editProfile());
addButton.addEventListener("click", () => formImage());
editAvatar.addEventListener('click', () => changeForm());