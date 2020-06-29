

export default class UserInfo {
  constructor(author) {
      this._name = author.profileAuthor;
      this._info = author.profileActivity;
      this._avatar = author.profilePhoto;
  }

  getUserInfo() {
      const userInfo = {
          name: this._name.textContent,
          info: this._info.textContent,
          avatar: this._avatar.textContent,
      }
      return userInfo;
  }

  setUserInfo(data) {
      this._name.textContent = data.name;
      this._info.textContent = data.link;
      this._avatar.textContent = data.avatar;
  }

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