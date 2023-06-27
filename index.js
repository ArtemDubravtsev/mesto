import initialCards from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';

// Объект валидации
const validationConfig = {
    inputSelector: '.popup__form-item',                  // все импуты
    submitButtonSelector: '.popup__button-save',         // Кнопки Сохранить/Создать
    errorSpanSelector: '.popup__error_type_',            // Спан с текстом ошибки импута
    inactiveButtonClass: 'popup__button-save_invalid',   // Модификатор не активной кнопки 
    inputErrorClass: 'popup__form-item_error',           // Модификатор Красной полосы импута 
    errorClass: 'popup__error_active'                    // Модификатор видимости ошибки ввода текста
};

const popup = document.querySelector('.popup');
const popupEditProfileSelector = '.popup_edit';
const popupAddCardSelector = '.popup_add';

const popupOpenBottonElement = document.querySelector('.profile__button-edit');
const popupAddOpenButton = document.querySelector('.profile__button-add');

const formPopupSelector = popup.querySelector('.popup__form');
const formPopupAddSelector = document.querySelector('.popup__form_add');

const popupImageSelector = '.popup_image';
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const templateSelector = '#cardElementTemplate';
const elementSelector = '.elements';
const section = new Section({
    items: initialCards,
    renderer: (cardElement) => {
        const card = new Card(cardElement, templateSelector, popupImage.open);
        return card.сreateCard();
    }
}, elementSelector);
section.addCard();

const profileInfo = {
    profileName: '.profile__title',
    profileJob: '.profile__subtitle'
}
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
})

// Запуск валидации
const formDataValidation = new FormValidator(validationConfig, formPopupSelector);
formDataValidation.enableValidation();

const formAddCardValidation = new FormValidator(validationConfig, formPopupAddSelector);
formAddCardValidation.enableValidation();

