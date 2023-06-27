export default class UserInfo {
    constructor(profileInfo) {
        this._profileName = document.querySelector(profileInfo.profileName);
        this._profileJob = document.querySelector(profileInfo.profileJob);
    }

    getUserInfo() {
        return { name: this._profileName.textContent, job: this._profileJob.textContent }
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileJob.textContent = data.job;
    }
}