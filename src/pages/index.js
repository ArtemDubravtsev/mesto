import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import {
    initialCards,
    validationConfig,
    formPopupSelector,
    formPopupAddSelector,
    popupOpenBottonElement,
    popupAddOpenButton,
    templateSelector,
    popupEditProfileSelector,
    popupAddCardSelector,
    popupImageSelector,
    elementSelector,
    profileInfo
} from '../scripts/utils/constants.js';

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const section = new Section({
    items: initialCards,
    renderer: (cardElement) => {
        const card = new Card(cardElement, templateSelector, popupImage.open);
        return card.сreateCard();
    }
}, elementSelector);
section.addInitialItems();

const userInfo = new UserInfo(profileInfo)

const popupProfil = new PopupWithForm(popupEditProfileSelector, inputValues => {
    userInfo.setUserInfo(inputValues);
    popupProfil.close();
});
popupProfil.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, inputValues => {
    section.addItem(section.renderer(inputValues));
    popupAddCard.close();
});
popupAddCard.setEventListeners();

// Запуск валидации
const formDataValidation = new FormValidator(validationConfig, formPopupSelector);
formDataValidation.enableValidation();

const formAddCardValidation = new FormValidator(validationConfig, formPopupAddSelector);
formAddCardValidation.enableValidation();

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