//стартовый массив картинок
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

//карточка
class Card {
  constructor(title, image) {
    this._title = title;
    this._image = image;
  }

  //лайк
  _like() {
    this._element.querySelector('.card__like').classList.toggle('card__like_type_active');
  }

  //удаление
  _delete() {
    this._element.remove();
  }

  //попап
  _open() {
    const cardOpen = document.querySelector('.popup__image');
    const cardTitle = document.querySelector('.popup__image-title');
    cardTitle.textContent = this._title;
    cardOpen.src = this._image;
    cardOpen.alt = this._title;
    popupWindow(popupCard);
  }

  //слушатели
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

  //отрисовка в доме
  _getTemplate() {
    const cardElement = document
      .getElementById('card')
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._element = cardElement;
    return this._element;
  }

  //создание карточки
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__title').textContent = this._title;
    return this._element;
  }
}


import { popupWindow } from './index.js';
export { initialCards, Card }