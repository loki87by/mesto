/*import Api from "./Api.js";
export const token = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '35090019-cd19-48d3-8c6b-3ac80f2c4184',
    'Content-Type': 'application/json'
  }
};

export const api = new Api(token);
*/
//карточка
export default class Card {
//  constructor(cardSelector, {data, handleCardClick}) {
  constructor(cardSelector, putLike, deleteLike, {data, handleCardClick}, deleteCard) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
  }

  //клонируем разметку
  _getTemplate() {
    const cardElement = this._cardSelector
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._element = cardElement;
    this._element.id = this._id;
    this._element.querySelector('.card__counter').textContent = this._likes.length;
    return this._element;
  }

  _whoIsOwner(_owner) {
    //console.log(this._owner);
    if (this._owner === '590e9a4872facf6c5c573d9f') {
    } else {
      this._element.querySelector('.card__delete').style.display = 'none';
    }
}
  
   // функция удаления картчоки
   _cardDelete() {
    this._deleteCard(); // коллбэк для удаления карточки с сервера
    this._element.removeEventListener('click', this._cardHandler); // удаляем слушатели
};

 //функция определяет клики по карточке
_cardClickHandler(evt) {
  if (evt.target.classList.contains('card__delete')) {  // удаление
      this._cardDelete();
    }
};

  //расставляем слушатели
  _setEventListeners() {
    this._cardHandler = this._cardClickHandler.bind(this);
    this._element.addEventListener('click', this._cardHandler);

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._like()
      /*this._yes = this._element.querySelector('.card__like_type_active');
      this._count = this._yes ? ++this._count : --this._count;
      this._yes = !this._yes;
      this._element.querySelector('.card__counter').innerHTML = this._count;*/
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
    //  this._delete();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  //создаем карточки
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');
    cardTitle.textContent = this._title;
    cardImage.src = this._image;
    cardImage.alt = this._title;
    //const cardItemLikes = this._likes;
    //cardTitle.textContent = this._name;
    this._whoIsOwner(this._owner)
//    console.log(this._likes);
    if (this._likes.find(item => item._id === '590e9a4872facf6c5c573d9f')) {
      this._element.querySelector('.card__like').classList.add('card__like_type_active');
    }
    return this._element;
  }

  //лайк
  _like() {
    //this._element.querySelector('.card__like').classList.toggle('card__like_type_active');
    //this._count = this._element.querySelector('.card__counter').innerHTML;
    if (this._element.querySelector('.card__like').classList.contains('card__like_type_active')) {
      this._element.querySelector('.card__like').classList.remove("card__like_type_active");
      this._element.querySelector('.card__counter').textContent = this._likes.length -= 1;
      this._deleteLike(this._id);
      return;
      }
      this._element.querySelector('.card__like').classList.add("card__like_type_active");
      this._putLike(this._id);
      this._element.querySelector('.card__counter').textContent = this._likes.length += 1;
    }
  }
/*
  //удаление
  _delete() {
    this._element.remove();*/
  //}
//}