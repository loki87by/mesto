const root = document.querySelector('.root');
const page = root.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileButton = profileInfo.querySelector('.profile__button_type_edit');
let popup = root.querySelector('.popup');
const container = popup.querySelector('.popup__container');
let popupTitle = container.querySelector('.popup__title');
let profileAuthor = profile.querySelector('.profile__title');
let nameInput = container.querySelector('.popup__text_type_name');
let profileActivity = profile.querySelector('.profile__subtitle');
let activityInput = container.querySelector('.popup__text_type_activity');
const popupButton = container.querySelector('.popup__button');
function popupWindow() {
    popup.classList.toggle('popup_opened');
};
function editProfile() {
    popupWindow();
    popupButton.classList.remove('popup__button_type_create');
    popupButton.classList.add('popup__button_type_save');
    popupTitle.textContent = 'Редактировать профиль';
    nameInput.value = profileAuthor.textContent;
    nameInput.setAttribute('placeholder', 'Имя')
    activityInput.value = profileActivity.textContent;
    activityInput.setAttribute('placeholder', 'О себе')
    popupButton.setAttribute('value', 'Сохранить');
};
profileButton.addEventListener('click', editProfile);

const addButton = profile.querySelector('.profile__button_type_add');
function addPlace() {
    popupWindow();
    popupTitle.textContent = 'Новое место';
    nameInput.setAttribute('placeholder', 'Название')
    activityInput.setAttribute('placeholder', 'Ссылка на картинку')
    popupButton.setAttribute('value', 'Создать');
    popupButton.classList.remove('popup__button_type_save');
    popupButton.classList.add('popup__button_type_create');
};
addButton.addEventListener('click', addPlace);

const closeButton = container.querySelector('.popup__close');
closeButton.addEventListener('click', popupWindow);
function formSubmitHandler (evt) {
    if (popupButton.classList.contains('popup__button_type_save')) {
        evt.preventDefault();
        nameInput.getAttribute('value');
        activityInput.getAttribute('value');
        profileAuthor.textContent = nameInput.value;
        profileActivity.textContent = activityInput.value;
        popupWindow();
        nameInput.value = '';
        activityInput.value = '';
    } else {
        evt.preventDefault();
        initialCards.unshift({name: nameInput.value, link: activityInput.value});
        console.log(initialCards);
        const cards = document.querySelector('.card');
        initialCards.forEach(function (item){
            const cardTemplate = document.querySelector('#card').content;
            const cardElement = cardTemplate.cloneNode(true);
            cardElement.querySelector('.card__image').src = item.link;
            cardElement.querySelector('.card__image').alt = item.name;
            cardElement.querySelector('.card__title').textContent = item.name;
            cards.before(cardElement);
            initialCards.splice([1], 6);
        });
        popupWindow();
    };
}
popupButton.addEventListener('click', formSubmitHandler);

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
const sectionCards = document.querySelector('.cards');
initialCards.forEach(function (item){
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    sectionCards.append(cardElement);
});
popupButton.addEventListener('click', formSubmitHandler);