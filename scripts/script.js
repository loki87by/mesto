//переменные
const root = document.querySelector('.root');
const page = document.querySelector('.page');
const content = page.querySelector('.content');
const popup = root.querySelector('.popup');
const container = popup.querySelector('.popup__container');
const popupProfile = document.querySelector('#popupProfile');
const addCards = document.querySelector('#addCards');
const popupCard = document.querySelector('#popupCard');
const formProfile = document.querySelector('#form1');
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__button_type_edit');
const closePopup = container.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__button_type_add');
const closeAdds = document.getElementById('closeAdds');
const cards = content.querySelector('.cards');
const cardTemplate = document.getElementById('card');
const cardOpen = popupCard.querySelector('.popup__image');
const cardTitle = popupCard.querySelector('.popup__image-title');
const cardClose = popupCard.querySelector('.popup__image-close');
const profileAuthor = profile.querySelector('.profile__title');
const nameInput = container.querySelector('.popup__text_type_name');
const profileActivity = profile.querySelector('.profile__subtitle');
const activityInput = container.querySelector('.popup__text_type_activity');
const placeForm = document.querySelector('#form2');
const placeInput = placeForm.querySelector('.popup__text_type_place');
const linkInput = placeForm.querySelector('.popup__text_type_link');
const spanError = Array.from(document.querySelectorAll('.popup__text-error'));
const borderError = Array.from(document.querySelectorAll('.popup__text'));
const buttonError = Array.from(document.querySelectorAll('.popup__button'));

// функция обнуления ошибок
function cleanError() {
  spanError.forEach((span) => {
    span.textContent = '';
  })
  borderError.forEach((input) => {
    input.classList.remove('popup__text_error');
  })
  buttonError.forEach((submit) => {
    submit.classList.remove('popup__button_error')
  })
};

//блокировка пустых карточек
function addBlocker () {
  if (addCards.classList.contains('popup_opened')) {
    buttonError.forEach((submit) => {
      submit.classList.add('popup__button_error');
      submit.setAttribute('disabled', 'true');
    });
  };
}

//снятие слушателей
function unlistener () {
  document.removeEventListener('keydown', popupHiddenEscape);
  document.removeEventListener('click', popupHiddenOverlay);
}

//скрытие попапа клавишой esc
function popupHiddenEscape (evt) {
  if (evt.key === 'Escape') { 
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    clearInputs();
    unlistener ()
  };
};
  
//скрытие попапа кликом на оверлэй
function popupHiddenOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    clearInputs();
    unlistener ()
  }
};

//переключатель попапа
function popupWindow(elem) {
  elem.classList.toggle('popup_opened');
  cleanError(elem);
  addBlocker ();
  const isPopupOpened = elem.classList.contains('popup_opened');
  if (isPopupOpened === true) {
    document.addEventListener('keydown', popupHiddenEscape);
    document.addEventListener('click', popupHiddenOverlay);
  } else {
    unlistener ()
  };
};

//редактирование профиля
function editProfile() {
  popupWindow(popupProfile);
  nameInput.value = profileAuthor.textContent;
  activityInput.value = profileActivity.textContent;
};

//открытие увеличенной картинки
function openImage(evt) { 
  cardTitle.textContent = evt.target.alt;
  cardOpen.src = evt.target.src;
  cardOpen.alt = evt.target.alt;
  popupWindow(popupCard);
};

//функция лайков
function cardLike(evt) {
  evt.target.classList.toggle("card__like_type_active");
};

//функция удаления
function cardDelete(evt) {
  const removeCard = evt.target.closest('.card');
  const btnLike = removeCard.querySelector(".card__like");
  const btnDelete = removeCard.querySelector('.card__delete');
  const imageView = removeCard.querySelector('.card__image');
  btnLike.removeEventListener("click", cardLike);
  btnDelete.removeEventListener('click', cardDelete);
  imageView.removeEventListener('click', openImage);
  removeCard.remove();
};

//создание карточки
function createCard(link, name) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const btnLike = cardElement.querySelector(".card__like");
  const btnDelete = cardElement.querySelector(".card__delete");
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  btnLike.addEventListener("click", cardLike);
  btnDelete.addEventListener("click", cardDelete);
  cardImage.addEventListener("click", openImage);
  return cardElement;
};

//прогон массива
function addPlaces(initialCards) {
  initialCards.forEach(function (item) {
    cards.append(createCard(item.link, item.name));
  });
};

//сохранение профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.getAttribute('value');
  activityInput.getAttribute('value');
  profileAuthor.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  popupWindow(popupProfile);
};

//чистка инпутов
function clearInputs() {
  linkInput.value = "";
  placeInput.value = "";
};

//новая карточка
function placeSubmitHandler(evt) {
  evt.preventDefault();
  cards.prepend(createCard(linkInput.value, placeInput.value));
  clearInputs();
  popupWindow(addCards);
};

//события
editButton.addEventListener("click", () => editProfile());
closePopup.addEventListener("click", () => editProfile());
addButton.addEventListener("click", () => popupWindow(addCards));
closeAdds.addEventListener("click", () => popupWindow(addCards)); 
cardClose.addEventListener("click", () => popupWindow(popupCard));
formProfile.addEventListener("submit", formSubmitHandler);
placeForm.addEventListener("submit", placeSubmitHandler);

//загрузка карточек
addPlaces(initialCards);