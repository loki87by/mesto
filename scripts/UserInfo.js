const popup = document.querySelector('.popup');
const container = popup.querySelector('.popup__container');
const nameInput = container.querySelector('.popup__text_type_name');
const activityInput = container.querySelector('.popup__text_type_activity');

export default class UserInfo {
  constructor(name, info) {
    this._name = name;
    this._info = info;
  }

  getUserInfo() {
    nameInput.value = this._name.textContent;
    activityInput.value = this._info.textContent;
  }

  setUserInfo() {
    this._name.textContent = nameInput.value;
    this._info.textContent = activityInput.value;
  }
}