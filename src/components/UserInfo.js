export default class UserInfo {
  constructor(user, avatarSelector) {
    this._name = user.profileAuthor;
    this._info = user.profileActivity;
    this._avatar = user.profilePhoto;
    this.userAvatar = document.querySelector(avatarSelector);
  }

  //берем юзердату
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.textContent,
    }
    return userInfo;
  }

  //берем аватарку
  writeUserAvatar(data) {
    this._avatar.src = data.avatar;
  };

  //ставим все
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}