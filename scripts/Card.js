//import { initialCards, popupWindow } from './index.js';

//карточка
export class Card {
  constructor(cardSelector, {data, handleCardClick}) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //клонируем разметку
  _getTemplate() {
    const cardElement = document
      .getElementById('card')
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._element = cardElement;
    return this._element;
  }
  
  //расставляем слушатели
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._delete();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  //создание карточки
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._image;
    this._element.querySelector('.card__title').textContent = this._title;
    return this._element;
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
  //_open() {
    //const cardOpen = document.querySelector('.popup__image');
  //  const cardTitle = document.querySelector('.popup__image-title');
//    cardTitle.textContent = this._title;
    //cardOpen.src = this._image;
  //  cardOpen.alt = this._title;
    //popupWindow(popupCard);
  //}
}