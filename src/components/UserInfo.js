export default class UserInfo {
    constructor({nameSelector,jobSelector, avatarSelector}) {
      this._profileName = document.querySelector(nameSelector);
      this._profileJob = document.querySelector(jobSelector);
      this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
      return {name: this._profileName.textContent, job: this._profileJob.textContent, avatar: this._avatar.src, _id: this._id}
    }
    
    setUserInfo(item) {
      this._profileName.textContent = item.name;
      this._profileJob.textContent = item.about;
      this._avatar.style.background = `url(${item.avatar}) center/cover no-repeat`;
      this._id = item._id;
    }
}