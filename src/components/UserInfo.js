//const userAvatar = document.querySelector('.profile__photo');

export default class UserInfo {
  constructor(user) {
      this._name = user.profileAuthor;
      this._info = user.profileActivity;
      this._avatar = user.profilePhoto;
      this.userAvatar = document.querySelector('.profile__photo');
  }

  getUserInfo() {
      const userInfo = {
          name: this._name.textContent,
          info: this._info.textContent,
          avatar: this._avatar.textContent,
      }
      return userInfo;
  }

  writeUserAvatar(data) {
    this._avatar.src = data.avatar;
};

  setUserInfo(data) {
      this._name.textContent = data.name;
      this._info.textContent = data.about;
      this._avatar.src = data.avatar;
//      this._avatar.src= data.avatar;
      this.userAvatar.src = data.avatar;
  }

//  setUser(user) {
  //  this._name.textContent = user.name;
    //this._info.textContent = user.about;
    //this._profileAuthor.id = user._id;
//    this._avatar.src = user.avatar;
//}

//  setUserInfo(data) { //принимает новые данные пользователя с сервера и добавляет их на страницу.
  //  this._name.textContent = data.name;
    //this._about.textContent = data.about;
//    this._img.alt = data.name;
  //  this._img.src = data.avatar;
//  }

//  setInfoUser(data) { //принимает новые данные пользователя из формы и добавляет их на страницу.
  //  this._name.textContent = data.name;
    //this._about.textContent = data.about;
//    this._img.alt = data.name;
  //}
}