//карточка
export default class Card {
  constructor(cardSelector, like, dislike, {data, handleCardClick}, deleteCard, userId) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this.like = like;
    this.dislike = dislike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._userId = userId;
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

  //**удаление
  //*прячем лишние корзины
  _cardOwner(_owner) {
    if (this._owner === this._userId) {
      return;
    } else {
      this._element.querySelector('.card__delete').style.display = 'none';
    }
  }
  //*определяем клик по корзине
  _cardClickHandler(evt) {
    if (evt.target.classList.contains('card__delete')) {
      this._cardDelete();
    }
  };
  //*удаляем картчоку
  _cardDelete() {
    this._element.removeEventListener('click', this._cardHandler);
    this._deleteCard();
  };

  //лайки
  _liker() {
    if (this._element.querySelector('.card__like').classList.contains('card__like_type_active')) {
      this.dislike(this._id);
      this._element.querySelector('.card__like').classList.remove("card__like_type_active");
      this._element.querySelector('.card__counter').textContent = this._likes.length -= 1;
      return
    }
    this.like(this._id);
    this._element.querySelector('.card__like').classList.add("card__like_type_active");
    this._element.querySelector('.card__counter').textContent = this._likes.length += 1;
  }

  //расставляем слушатели
  _setEventListeners() {
    this._cardHandler = this._cardClickHandler.bind(this);
    this._element.addEventListener('click', this._cardHandler);
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._liker()
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
    if (this._likes.some(item => item._id === this._userId)) {
      this._element.querySelector('.card__like').classList.add('card__like_type_active');
    }
    return this._element;
  }
}