const root = document.querySelector('.root');
const page = root.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileButton = profileInfo.querySelector('.profile__button_type_edit');
let popup = root.querySelector('.popup');
const container = popup.querySelector('.popup__container');
let profileAuthor = profile.querySelector('.profile__title');
let nameInput = container.querySelector('.popup__text_type_name');
const profileActivity = profile.querySelector('.profile__subtitle');
const activityInput = container.querySelector('.popup__text_type_activity');
function editProfile() {
    popup.classList.add('popup_opened');
    nameInput.value = profileAuthor.textContent;
    activityInput.value = profileActivity.textContent;
};
profileButton.addEventListener('click', editProfile);
const closeButton = container.querySelector('.popup__close');
function closeEdit() {
    popup.classList.remove('popup_opened')
};
closeButton.addEventListener('click', closeEdit);
const saveButton = container.querySelector('.popup__button');
function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.getAttribute('value');
    activityInput.getAttribute('value');
    profileAuthor.textContent = nameInput.value;
    profileActivity.textContent = activityInput.value;
}
saveButton.addEventListener('click', formSubmitHandler);
saveButton.addEventListener('click', closeEdit);
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
    const cardsOnline = document.querySelector('.cards');
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    sectionCards.append(cardElement);
});

