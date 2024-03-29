// Массив карточек
const initialCards = [
    {
        title: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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
const formPopupSelector = popup.querySelector('.popup__form');
const formPopupAddSelector = document.querySelector('.popup__form_add');

const popupOpenBottonElement = document.querySelector('.profile__button-edit');
const popupAddOpenButton = document.querySelector('.profile__button-add');
const popupAvatarEditButton = document.querySelector('.profile__avatar-button');

const templateSelector = '#cardElementTemplate';

const popupEditProfileSelector = '.popup_edit';
const popupAddCardSelector = '.popup_add';
const popupImageSelector = '.popup_image';
const elementSelector = '.elements';
const popupCardDeleteSelector = ".popup_delete";
const popupAvatarSelector = ".popup_avatar";
const formPopupAvatarSelector = document.querySelector('.popup__form_avatar');

const profileInfo = {
    profileNameSelector: '.profile__title',
    profileJobSelector: '.profile__subtitle',
    profileAvatarSelector: '.profile__avatar'
}

export {
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
    popupCardDeleteSelector,
    popupAvatarSelector,
    formPopupAvatarSelector,
    profileInfo
};