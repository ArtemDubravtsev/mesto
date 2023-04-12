// Cards
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// popups
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

// popups close buttons
const popupCloseBottonElement = document.querySelector('.popup__button-close');
const popupAddCloseButton = document.querySelector('.popup__button-close_add');

// popups open buttons
const popupOpenBottonElement = document.querySelector('.profile__button-edit');
const popupAddOpenButton = document.querySelector('.profile__button-add');

// forma
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-item_line_name');
const jobInput = formElement.querySelector('.popup__form-item_line_job');

// popup profil
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');
const popupButtonSabmitProfil = formElement.querySelector('.popup__button-save');
const popupInputProfil = formElement.querySelectorAll('.popup__form-item');

// popup add form
const imageTitle = document.querySelector('.elements__item-title');
const imageLink = document.querySelector('.elements__item-image');
const imageTitleInput = document.querySelector('.popup__form-item_line_title');
const imageLinkInput = document.querySelector('.popup__form-item_line_link');
const formElementAdd = document.querySelector('.popup__form_add');
const popupButtonSabmitAdd = formElementAdd.querySelector('.popup__button-save');
const popupInputAdd = formElementAdd.querySelectorAll('.popup__form-item');

// popup Image
const popupImageBottonClose = document.querySelector('.popup__button-close_image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImageFoto = document.querySelector('.popup__image-foto');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements_template').content;



// open-close popups func
const openPopup = function (popup) {
    formElementAdd.reset();
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

// form func
const formOpenPopup = function () {
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobSubtitle.textContent;
}

const handleFormSubmit = function (evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobSubtitle.textContent = jobInput.value;
    closePopup(popupEdit);
}

function createCard(data) {
    const cardElement = elementsTemplate.cloneNode(true);
    cardElement.querySelector('.elements__item-image').src = data.link;
    cardElement.querySelector('.elements__item-title').textContent = data.name;
    cardElement.querySelector('.elements__item-delete').addEventListener('click', handleDelete);
    cardElement.querySelector('.elements__item-like').addEventListener('click', handleLike);
    cardElement.querySelector('.elements__item-image').addEventListener('click', () => openPopupImage(data));
    return cardElement;

}

function renderCard(data, elements) {
    const cardElement = createCard(data);
    elements.prepend(cardElement);
}

initialCards.forEach(cardElement => { renderCard(cardElement, elements); });

function openPopupImage(data) {
    popupImageFoto.src = data.link;
    popupImageTitle.textContent = data.name;
    openPopup(popupImage);
}

// card delete func
function handleDelete(event) {
    const card = event.target.closest('.elements__item');
    card.remove();
}

// like active func 
function handleLike(event) {
    event.target.classList.toggle('elements__item-like_active');
}

// popup add func
function submitAddCardForm(evt) {
    evt.preventDefault();
    const data = { name: imageTitleInput.value, link: imageLinkInput.value };
    renderCard(data, elements);
    closePopup(popupAdd);
}

// popup edit
popupOpenBottonElement.addEventListener('click', function () {
    openPopup(popupEdit);
    resetErrorOpenForm(formElement);
    formOpenPopup(popupEdit);
    toggleButtonState(popupInputProfil, popupButtonSabmitProfil, validationConfig.inactiveButtonClass);
});

popupCloseBottonElement.addEventListener('click', function () { closePopup(popupEdit) });
formElement.addEventListener('submit', handleFormSubmit)


// popup add
popupAddOpenButton.addEventListener('click', function () {
    openPopup(popupAdd);
    resetErrorOpenForm(formElementAdd);
    toggleButtonState(popupInputAdd, popupButtonSabmitAdd, validationConfig.inactiveButtonClass);
})

popupAddCloseButton.addEventListener('click', function () { closePopup(popupAdd) });
formElementAdd.addEventListener('submit', submitAddCardForm);


// popup image
popupImageBottonClose.addEventListener('click', function () { closePopup(popupImage) });

