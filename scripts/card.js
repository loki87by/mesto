const initialCards = [
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

class Card {
  constructor(title, image) {
    this._title = title;
    this._image = image;
    //isLiked: false;
    //this._like = data.like;
  }

  _like() {
    this._element.querySelector('.card__like').classList.toggle('card__like_type_active');
  }

  _delete() {
    this._element.remove();
  }

  _open() {
    const cardOpen = document.querySelector('.popup__image');
    const cardTitle = document.querySelector('.popup__image-title');
    cardTitle.textContent = this._title;
    cardOpen.src = this._image;
    cardOpen.alt = this._title;
    popupWindow(popupCard);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._delete();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._open();
    });
  }

  _getTemplate() {
    const cardElement = document
      .getElementById('card')
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._element = cardElement;
    return this._element;
  }
  
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__title').textContent = this._title;
    //this._element.querySelector('.card__like');
    return this._element;
  }
}

//прогон массива
function addPlaces(initialCards) {
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link);
    document.querySelector('.cards').prepend(card.generateCard());
    ///cards.append(createCard(item.link, item.name));
  });
};

addPlaces(initialCards);
export { Card, addPlaces };
import { popupWindow } from './script.js';

//initialCards.forEach((item) => {
  //const card = new Card(item.name, item.link);
  // Добавляем в DOM
  //document.querySelector('.grid').prepend(card.generateCard());
//});