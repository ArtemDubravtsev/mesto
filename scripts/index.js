import initialCards from './constants.js';
import Card from './Card.js';



// Попапы
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');
const popupList = document.querySelectorAll('.popup');

// Кнопки закрытия/открытия попапов
const popupCloseBottonElement = document.querySelector('.popup__button-close');
const popupAddCloseButton = document.querySelector('.popup__button-close_add');
const popupOpenBottonElement = document.querySelector('.profile__button-edit');
const popupAddOpenButton = document.querySelector('.profile__button-add');

// Форма
const formPopup = popup.querySelector('.popup__form');
const nameInput = formPopup.querySelector('.popup__form-item_line_name');
const jobInput = formPopup.querySelector('.popup__form-item_line_job');

// Попап редактирование профиля 
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');
const popupButtonSabmitProfile = formPopup.querySelector('.popup__button-save');
const popupInputProfil = formPopup.querySelectorAll('.popup__form-item');

// Попап добавление карточки
const imageTitle = document.querySelector('.elements__item-title');
const imageLink = document.querySelector('.elements__item-image');
const imageTitleInput = document.querySelector('.popup__form-item_line_title');
const imageLinkInput = document.querySelector('.popup__form-item_line_link');
const formPopupAdd = document.querySelector('.popup__form_add');
const popupButtonSabmitAdd = formPopupAdd.querySelector('.popup__button-save');
const popupInputAdd = formPopupAdd.querySelectorAll('.popup__form-item');

// Попап картинки
const popupImageBottonClose = document.querySelector('.popup__button-close_image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImageFoto = document.querySelector('.popup__image-foto');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements_template').content;


// Открытие/закрытие попапов
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscButton);
};

const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscButton);
};

const closePopupEscButton = function (evt) {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    }
};

const closePopupOverlayClick = function (event) {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
};

// Форма
const fillPopupProfileInputs = function () {
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobSubtitle.textContent;
}

const handlePopupProfileFormSubmit = function (evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobSubtitle.textContent = jobInput.value;
    closePopup(popupEdit);
}

function openPopupImage(data) {
    popupImageFoto.src = data.link;
    popupImageFoto.alt = "Изображение карточки";
    popupImageTitle.textContent = data.name;
    openPopup(popupImage);
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const data = { name: imageTitleInput.value, link: imageLinkInput.value };
    renderCard(elements, createNewCard(data));
    closePopup(popupAdd);
}

// слушатели 
popupOpenBottonElement.addEventListener('click', function () {
    openPopup(popupEdit);
    // resetErrorOpenForm(formPopup, validationConfig);
    fillPopupProfileInputs(popupEdit);
    toggleButtonState(popupInputProfil, popupButtonSabmitProfile, validationConfig.inactiveButtonClass);
});

popupCloseBottonElement.addEventListener('click', function () { closePopup(popupEdit) });
formPopup.addEventListener('submit', handlePopupProfileFormSubmit)

// слушатели попапа добавления картинки
popupAddOpenButton.addEventListener('click', function () {
    openPopup(popupAdd);
    formPopupAdd.reset();
    // resetErrorOpenForm(formPopupAdd, validationConfig);
    toggleButtonState(popupInputAdd, popupButtonSabmitAdd, validationConfig.inactiveButtonClass);
})

popupAddCloseButton.addEventListener('click', function () { closePopup(popupAdd) });
formPopupAdd.addEventListener('submit', submitAddCardForm);

// слушатель закрытия попапа картинки
popupImageBottonClose.addEventListener('click', function () { closePopup(popupImage) });

// слушатель закрытия попапов кликом на оверлей
popupList.forEach((popup) => popup.addEventListener('click', closePopupOverlayClick));







const templateSelector = '#cardElementTemplate';

function createNewCard(cardElement) {
    const card = new Card(cardElement, templateSelector, openPopupImage);
    const newCard = card.сreateCard()
    return newCard;
}

function renderCard(elements, сard) {
    elements.prepend(сard);
}

initialCards.forEach(cardElement => {
    renderCard(elements, createNewCard(cardElement));
});