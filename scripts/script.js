//gthtvtyyst
const root = document.querySelector('.root');
const page = root.querySelector('.page');
const content = page.querySelector('.content');
const popup = root.querySelector('.popup');
const container = popup.querySelector('.popup__container');
const popupProfile = document.querySelector('#popupProfile');
const addCards = document.querySelector('#addCards');
const popupCard = document.querySelector('#popupCard');
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__button_type_edit');
const closePopup = container.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__button_type_add');
const closeAdds = document.getElementById('closeAdds');
const cards = content.querySelector('.cards');
const card = cards.querySelector('.card');
const cardTemplate = document.getElementById('card');
const cardOpen = popupCard.querySelector('.popup__image');
const cardTitle = popupCard.querySelector('.popup__image-title');
const cardClose = popupCard.querySelector('.popup__image-close');
const profileAuthor = profile.querySelector('.profile__title');
const nameInput = container.querySelector('.popup__text_type_name');
const profileActivity = profile.querySelector('.profile__subtitle');
const activityInput = container.querySelector('.popup__text_type_activity');
const form = document.querySelector('#form2');
//const placeInput = form.querySelector('.popup__text_type_place');
//const linkInput = form.querySelector('.popup__text_type_link');

//переключатель попапа
function popupWindow(elem) {
    elem.classList.toggle('popup_opened');
};

//редактирование профиля
function editProfile() {
    popupWindow(popupProfile);
    nameInput.value = profileAuthor.textContent;
    activityInput.value = profileActivity.textContent;
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

//создание карточек
function createCard(link, name) {
    const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector(".card__title").textContent = name;
    cardElement.querySelector(".card__image").alt = name;
    cardElement.querySelector(".card__like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like_type_active");
    });
    cardElement.querySelector(".card__delete").addEventListener('click', () => cardElement.remove());
    cardElement.querySelector(".card__image").addEventListener("click", function () {
      openImage(link, name);
    });
    return cardElement;
};

//прогон массива
initialCards.forEach(function (item) {
    cards.prepend(createCard(item.link, item.name));
});

//новая карточка
function placeSubmitHandler(evt) {
    evt.preventDefault();
    cards.prepend(createCard(linkInput.value, placeInput.value));
    linkInput.value = "";
    placeInput.value = "";
    popupWindow(addCards);
};

//разворот картинки
function openImage(link, name) {
    cardTitle.textContent = name;
    cardOpen.src = link;
    cardOpen.alt = name;
    popupWindow(popupCard);
};

//клики
editButton.addEventListener("click", () => editProfile());
closePopup.addEventListener("click", () => editProfile());
addButton.addEventListener("click", () => popupWindow(addCards));
closeAdds.addEventListener("click", () => popupWindow(addCards)); 
cardClose.addEventListener("click", () => popupWindow(popupCard));
container.addEventListener("submit", formSubmitHandler);
form.addEventListener("submit", placeSubmitHandler);