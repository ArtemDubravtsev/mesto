import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
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
} from './scripts/utils/constants.js';

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const section = new Section({
    items: initialCards,
    renderer: (cardElement) => {
        const card = new Card(cardElement, templateSelector, popupImage.open);
        return card.сreateCard();
    }
}, elementSelector);
section.addCard();

const userInfo = new UserInfo(profileInfo)

const popupProfil = new PopupWithForm(popupEditProfileSelector, (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(popupProfil.getInputValues());
    popupProfil.close();
});
popupProfil.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => {
    evt.preventDefault();
    section.addItem(section.renderer(popupAddCard.getInputValues()));
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
    formDataValidation.resetErrorOpenForm();
    popupProfil.setInputValues(userInfo.getUserInfo());
    popupProfil.open();
});

// слушатели попапа добавления картинки
popupAddOpenButton.addEventListener('click', () => {
    formAddCardValidation.resetErrorOpenForm();
    popupAddCard.open();
});