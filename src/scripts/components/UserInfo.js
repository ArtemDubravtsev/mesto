export default class UserInfo {
    constructor(profileInfo) {
        this._profileNameSelector = document.querySelector(profileInfo.profileNameSelector);
        this._profileJobSelector = document.querySelector(profileInfo.profileJobSelector);
    }

    getUserInfo() {
        return { name: this._profileNameSelector.textContent, job: this._profileJobSelector.textContent }
    }

    setUserInfo(data) {
        this._profileNameSelector.textContent = data.name;
        this._profileJobSelector.textContent = data.job;
    }
}