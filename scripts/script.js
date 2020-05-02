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
let popupButton = container.querySelector('.popup__button');

//переключатель попапа
function popupWindow() {
    popup.classList.toggle('popup_opened');
    nameInput.value = '';
    activityInput.value = '';
};

//редактирование профиля
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

//редактирование профиля
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

//закрытие попапа
const closeButton = container.querySelector('.popup__close');
closeButton.addEventListener('click', popupWindow);

//автоподгрузка изображений
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

//сохранение попапа
const sectionCards = document.querySelector('.cards');
function formSubmitHandler (evt) {
    if (popupButton.classList.contains('popup__button_type_save')) {
        evt.preventDefault();
        nameInput.getAttribute('value');
        activityInput.getAttribute('value');
        profileAuthor.textContent = nameInput.value;
        profileActivity.textContent = activityInput.value;
        popupWindow();
    } else {
        evt.preventDefault();
        initialCards.unshift({name: nameInput.value, link: activityInput.value});
        const cards = document.querySelector('.card');
        initialCards.forEach(function (item){
            const cardTemplate = document.querySelector('#card').content;
            const cardElement = cardTemplate.cloneNode(true);
            cardElement.querySelector('.card__image').src = item.link;
            cardElement.querySelector('.card__image').alt = item.name;
            cardElement.querySelector('.card__title').textContent = item.name;
            const likeButton = cardElement.querySelector('.card__like');
            likeButton.addEventListener('click', function (evt) {
             evt.target.classList.toggle('card__like_type_active');
            });
        const deleteButton = cardElement.querySelector('.card__delete');
        deleteButton.addEventListener('click', function () {
            const initialCards = deleteButton.closest('.card');
            initialCards.remove();
            });
        cards.before(cardElement);
        initialCards.splice([1], 6);
        });
        popupWindow();
    };
}
popupButton.addEventListener('click', formSubmitHandler);

//операции в массиве
initialCards.forEach(function (item){
    //темплэйт
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    //разворот картинки
    const imageButton = cardElement.querySelector('.card__image');
    imageButton.addEventListener('click', function (evt) {
        const imageLink = evt.target.getAttribute('src');
        const imageName = evt.target.getAttribute('alt');
        const popup = document.querySelector('.popup');
        popup.innerHTML = `<div class="popup__image-container">
        <button class="popup__image-close" type="reset"></button>
        <img class="popup__image" src="" alt="">
        <h2 class="popup__image-title"></h2>
    </div>`
        const popupContainer = popup.querySelector('.popup__image-container');
        const popupImage = popupContainer.querySelector('.popup__image');
        const popupImageTitle = popupContainer.querySelector('.popup__image-title');
        popupImage.setAttribute('src', imageLink);
        popupImage.setAttribute('alt', imageName);
        popupImageTitle.setAttribute('value', imageName);
        popupWindow();

        //если картинка портретная
        popupImage.addEventListener('load', () => {
            let popupContainer = document.querySelector('.popup__image-container');
        let height = popupImage.naturalHeight;
        let width = popupImage.naturalWidth;
        if (height > width) {
            popupContainer.style.gridTemplateColumns = 'max-content 41px';
            popupImage.style.maxWidth = 'fit-content';
            popupImage.style.width = 'initial';
            popupImage.style.maxHeight = '100%';
            popupImage.style.objectFit = 'contain';
        }

        //схлопывание картинки
        const imageClose = document.querySelector('.popup__image-close');
        imageClose.addEventListener('click', popupWindow);


    });
});

    //лайк
    const likeButton = cardElement.querySelector('.card__like');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_type_active');
    });

    //удаление изображений
    const deleteButton = cardElement.querySelector('.card__delete');
    deleteButton.addEventListener('click', function () {
        const initialCards = deleteButton.closest('.card');
        initialCards.remove();
    });

    //выводим на страницу
    sectionCards.append(cardElement);
});


