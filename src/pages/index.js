import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupCardDelete from '../scripts/components/PopupCardDelete';
import {
    initialCards,
    validationConfig,
    formPopupSelector,
    formPopupAddSelector,
    popupOpenBottonElement,
    popupAddOpenButton,
    popupAvatarEditButton,
    templateSelector,
    popupEditProfileSelector,
    popupAddCardSelector,
    popupImageSelector,
    elementSelector,
    PopupCardDeleteSelector,
    popupAvatarSelector,
    formPopupAvatarSelector,
    profileInfo
} from '../scripts/utils/constants.js';


const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();


const PopupDeleteCard = new PopupCardDelete(PopupCardDeleteSelector, (element) => {
    element.deleteCard();
    PopupDeleteCard.close();
});
PopupDeleteCard.setEventListeners();


function creatNewCard(cardElement) {
    const card = new Card(cardElement, templateSelector, popupImage.open, PopupDeleteCard.open);
    return card.сreateCard();
}

const section = new Section({
    items: initialCards,
    renderer: (cardElement) => {
        section.addItem(creatNewCard(cardElement))
    }
}, elementSelector);
section.addInitialItems();


const userInfo = new UserInfo(profileInfo)


const popupProfil = new PopupWithForm(popupEditProfileSelector, (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupProfil.close();
});
popupProfil.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (inputValues) => {
    section.addItem(creatNewCard(inputValues));
    popupAddCard.close();
});
popupAddCard.setEventListeners();


const popupAvatar = new PopupWithForm(popupAvatarSelector, (inputValues) => {
    document.querySelector(".profile__avatar").src = inputValues.avatar;
    popupAvatar.close();
});
popupAvatar.setEventListeners();







// Запуск валидации попапа информации пользователя
const formDataValidation = new FormValidator(validationConfig, formPopupSelector);
formDataValidation.enableValidation();

// Запуск валидации попападобавления карточки
const formAddCardValidation = new FormValidator(validationConfig, formPopupAddSelector);
formAddCardValidation.enableValidation();

// Запуск валидации попапа аватара
const formAvatarEditValidation = new FormValidator(validationConfig, formPopupAvatarSelector);
formAvatarEditValidation.enableValidation();

// Слушатель попапа информаций
popupOpenBottonElement.addEventListener('click', () => {
    formDataValidation.resetValidationState();
    popupProfil.setInputValues(userInfo.getUserInfo());
    popupProfil.open();
});

// слушатели попапа добавления картинки
popupAddOpenButton.addEventListener('click', () => {
    formAddCardValidation.resetValidationState();
    popupAddCard.open();
});

// слушатели попапа аватара
popupAvatarEditButton.addEventListener('click', () => {
    formAvatarEditValidation.resetValidationState();
    popupAvatar.open()
});