//карточка
export default class Card {
  constructor(cardSelector, {data, handleCardClick}) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //клонируем разметку
  _getTemplate() {
    const cardElement = this._cardSelector
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._element = cardElement;
    return this._element;
  }
  
  //расставляем слушатели
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._like()
      this._yes = this._element.querySelector('.card__like_type_active');
      this._count = this._yes ? ++this._count : --this._count;
      this._yes = !this._yes;
      this._element.querySelector('.card__counter').innerHTML = this._count;
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._delete();
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
    cardImage.alt = this._image;
    return this._element;
  }

  //лайк
  _like() {
    this._element.querySelector('.card__like').classList.toggle('card__like_type_active');
    this._count = this._element.querySelector('.card__counter').innerHTML;
  }

  //удаление
  _delete() {
    this._element.remove();
  }
}