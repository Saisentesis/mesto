export default class UserInfo {
    constructor({nameSelector,jobSelector}) {
      this._profileName = document.querySelector(nameSelector);
      this._profileJob = document.querySelector(jobSelector);
    }

    getUserInfo() {
      return {name: this._profileName.textContent, job: this._profileJob.textContent}
    }
    
    setUserInfo(item) {
      this._profileName.textContent = item.popupeditname;
      this._profileJob.textContent = item.popupeditjob;
    }
}