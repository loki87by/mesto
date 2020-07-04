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
export const popupConfirm = document.getElementById('confirm');
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

export const api = new Api(token);
/*
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
];formProfileInfo editAvatar
*/
const loading = (isLoading, form, defaultButtonText, loadingMessage) => {  
  const currentButton = form.querySelector('.popup__button');

  if(isLoading) {
      currentButton.textContent = loadingMessage;
  } else {
      currentButton.textContent = defaultButtonText;
  }
}
//попап с картинкой
const popupWithImage = new PopupWithImage(popupCard);/**/
//попап добавления картинки
const formImage = function() {
  imageForm.open();
}
/*
export const formProfileInfo = {
  profileAuthor: document.querySelector('.profile__title'),
  profileStatus: document.querySelector('.profile__subtitle'),
  profileAvatar: document.querySelector('.profile__photo'),
};
*/
//валидация форм
function validation() {/*//*/
  popups.forEach((form) => {
    const valid = new FormValidator(formObject, form);
      valid.enableValidation();
      valid.cleanError(form);
  });
}

//валидация
validation();/**/ 

//пользовательские данные
const userInfo = new UserInfo(formProfileInfo);/**/

api.getUserInfo()
.then((user) => {
  userInfo.getUserInfo(user.name, user.about, user.avatar);
  userInfo.setUserInfo(user);
})
  .catch((err) => {
  console.log(err);
});

//отправляем данные пользоавателя на сервер
const profileForm = new PopupWithForm(popupProfile, {/*//*/
  formSubmit: (item) => {
    loading(true, popupProfile,'Сохранить', 'Сохранение...');
    api.updateInfo(item.name, item.link)
      .then((res) => {//
      /*.then(data => userInfo.setUserInfo(data.name, data.about));
      profileForm.setSubmitForm();
      console.log(nameInput.value, activityInput.value)
      //profileForm.close();
      //})*/
      userInfo.setUserInfo(res)
      profileForm.close()})
       .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading(false, popupProfile,'Сохранить', 'Сохранение...');
    });
  }
});

//редактирование профиля
const editProfile = () => { /*//*/
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.name;
  activityInput.value = infoAuthor.info;
  profileForm.open();
};

api.getInitialCards()/*//*/
  .then((items) => {
    cardList.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
  });
  
//секция карточек  
const cardList = new Section({/*//*/
  renderer: (item) => {
    const card = new Card(template, () => api.putLike(item._id), () => api.deleteLike(item._id), {
      data: item, handleCardClick: () => {
        popupWithImage.open(item);
      }
    }, () => confirmSubmit.submit(item._id));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

//добавление карточек
const imageForm = new PopupWithForm(addCards, {
  formSubmit: (item) => {
    loading(true, addCards, 'Создать', 'Создание...');
    api.addNewCard(item.name, item.link)
    .then((res) => {
    const card = new Card(template, () => api.putLike(res._id), () => api.deleteLike(res._id), {
      data: res, handleCardClick: () => {
        popupWithImage.open(res);
      }
    }, () => confirmSubmit.submit(res._id));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() => {
    loading(false, addCards, 'Сохранить', 'Сохранение...');
});
    imageForm.close();
  }
});

const confirmSubmit = new Popup(popupConfirm);/*//*/
confirmSubmit.submit = function(_id) {
  confirmSubmit.open();
  popupConfirm.addEventListener('click', evt => {
    evt.preventDefault();
    document.getElementById(_id).remove();
    api.deleteCard(_id);
    this.close();
    });
};/*
let valueCard;jmghc
const confirmSubmit = new PopupWithForm(popupConfirm, {
  formSubmit: () => {
    console.log(valueCard, confirmSubmit);
    api.deleteCard(valueCard.object._id)
      .then((res) => {
        valueCard.class.cardDelete();
        confirmSubmit.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});*/

const changeAvatar = new PopupWithForm(popupAvatar, {
  formSubmit: (item) => {
    loading(true, popupAvatar, 'Сохранить', 'Сохранение...');
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
            loading(false, popupAvatar, 'Сохранить', 'Сохранение...');
        });
  }

});
editAvatar.addEventListener('click', () => {
  changeAvatar.open();
})

//прогон массива
//cardList.renderItems(items);//xx

//события
editButton.addEventListener("click", () => editProfile());
addButton.addEventListener("click", () => formImage());