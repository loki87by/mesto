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
function editProfile() {
    popup.classList.add('popup_opened');
    const profileAuthor = profile.querySelector('.profile__title');
    const nameInput = container.querySelector('.popup__text_type_name');
    nameInput.value = profileAuthor.textContent;
    const profileActivity = profile.querySelector('.profile__subtitle');
    const activityInput = container.querySelector('.popup__text_type_activity');
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
    const nameInput = container.querySelector('.popup__text_type_name');
    const activityInput = container.querySelector('.popup__text_type_activity');
    nameInput.getAttribute('value');
    activityInput.getAttribute('value');
    const profileAuthor = profile.querySelector('.profile__title');
    const profileActivity = profile.querySelector('.profile__subtitle');
    profileAuthor.textContent = nameInput.value;
    profileActivity.textContent = activityInput.value;
}
saveButton.addEventListener('click', formSubmitHandler);
saveButton.addEventListener('click', closeEdit);
