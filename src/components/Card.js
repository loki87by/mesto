//карточка
export default class Card {
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

  //удаление
  //прячем лишние корзины
  _cardOwner(_owner) {
    if (this._owner === '590e9a4872facf6c5c573d9f') {
    } else {
      this._element.querySelector('.card__delete').style.display = 'none';
    }
  }
  //определяем клик по корзине
  _cardClickHandler(evt) {
    if (evt.target.classList.contains('card__delete')) {
      this._cardDelete();
    }
  };
  //удаляем картчоку
  _cardDelete() {
    this._deleteCard();
    this._element.removeEventListener('click', this._cardHandler);
  };

  //лайки
  _liker() {
    if (this._element.querySelector('.card__like').classList.contains('card__like_type_active')) {
      this._element.querySelector('.card__like').classList.remove("card__like_type_active");
      this._element.querySelector('.card__counter').textContent = this._likes.length -= 1;
      this._dislike(this._id);
      return;
    }
    this._element.querySelector('.card__like').classList.add("card__like_type_active");
    this._element.querySelector('.card__counter').textContent = this._likes.length += 1;
    this._like(this._id);
  }

  //расставляем слушатели
  _setEventListeners() {
    this._cardHandler = this._cardClickHandler.bind(this);
    this._element.addEventListener('click', this._cardHandler);
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._liker()
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
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
    this._cardOwner(this._owner)
    if (this._likes.find(item => item._id === '590e9a4872facf6c5c573d9f')) {
      this._element.querySelector('.card__like').classList.add('card__like_type_active');
    }
    return this._element;
  }
}