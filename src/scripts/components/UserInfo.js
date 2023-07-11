export default class UserInfo {
    constructor(profileInfo) {
        this._profileNameSelector = document.querySelector(profileInfo.profileNameSelector);
        this._profileJobSelector = document.querySelector(profileInfo.profileJobSelector);
        this._profileAvatarSelector = document.querySelector(profileInfo.profileAvatarSelector);
    }

    getUserInfo() {
        return { name: this._profileNameSelector.textContent, job: this._profileJobSelector.textContent }
    }

    setUserInfo({ name, job, avatar }) {
        this._profileNameSelector.textContent = name;
        this._profileJobSelector.textContent = job;
        this._profileAvatarSelector.src = avatar;
    }
}