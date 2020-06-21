export { items };
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import Section from "./Section.js"
import PopupWithImage from "./PopupWithImage.js"
import PopupWithForm from "./PopupWithForm.js"
import UserInfo from "./UserInfo.js"

//переменны
const page = document.querySelector('.page');
const content = page.querySelector('.content');
const popup = document.querySelector('.popup');
const popupProfile = document.getElementById('#popupProfile');
const addCards = document.getElementById('#addCards');
export const popupCard = document.getElementById('#popupCard');
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__button_type_edit');
const addButton = profile.querySelector('.profile__button_type_add');
export const profileAuthor = profile.querySelector('.profile__title');
export const profileActivity = profile.querySelector('.profile__subtitle');
const popups = Array.from(document.querySelectorAll('.popup__container'));
const cardListSelector = document.querySelector('.cards')
const template = document.getElementById('card');

//массив картинок
const items = [
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

  const imageForm = new PopupWithForm(addCards, {
    submitform: (item) => {
      const card = new Card(template, {
        data: item, handleCardClick: () => {
          popupWithImage.open(item);
        }
      });
      const cardElement = card.generateCard();
      CardList.addItem(cardElement);
      imageForm.close();
    }
  });

const popupWithImage = new PopupWithImage(popupCard);
const formImage = () => {
  //imageForm._deleteInputValues()
  imageForm.open()
}

export const formProfileInfo = {
  profileAuthor: document.querySelector('.profile__title'),
  profileActivity: document.querySelector('.profile__subtitle'),
};

const userInfo = new UserInfo(formProfileInfo);
const formInfo = new PopupWithForm(popupProfile, {
  submitForm: (item) => {
    userInfo.setUserInfo(item);
      formInfo.close();
  }
});

const editProfile = () => {
  const infoAuthor = userInfo.getUserInfo();
  //const profileAuthor = document.querySelector('.profile__title');
 // const profileActivity = document.querySelector('.profile__subtitle');
  nameInput.value = infoAuthor.name;
  activityInput.value = infoAuthor.info;
  formInfo.open();
  //cleanError(popupProfile);
}

const cardList = new Section({
  items, renderer: (item) => {
    const card = new Card (template, {
      data: item, handleCardClick: () => {
        const popupWithImage = new PopupWithImage(item, popupCard)
        popupWithImage.open()
      }
  });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

cardList.renderItems(items);

//  const openImageForm = () => {
    //imageForm.deleteInputValues();
  //  imageForm.open();
    //cleanError(addCards);

//чистка инпутов
//function clearInputs() {
  //linkInput.value = "";
  //placeInput.value = "";
//};

//валидация форм
function validation() {
  popups.forEach((form) => {
      const valid = new FormValidator({
        formSelector: ".popup__container",
        inputSelector: ".popup__text",
        submitButtonSelector: ".popup__button_type_save",
        inactiveButtonClass: "popup__button_error",
        inputErrorClass: "popup__text_error",
        errorClass: "popup__text-error"
      }, form);
      valid.enableValidation();
  });
}

//события
editButton.addEventListener("click", () => editProfile());
addButton.addEventListener("click", () => formImage());

validation();