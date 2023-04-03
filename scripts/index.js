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
const popupElement = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add');

// popups close buttons
const popupCloseBottonElement = popupElement.querySelector('.popup__button-close');
const popupAddCloseButton = document.querySelector('.popup__button-close_add');

// popups open buttons
const popupOpenBottonElement = document.querySelector('.profile__button-edit');
const popupAddOpenButton = document.querySelector('.profile__button-add');

// forma
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-item_line_name');
const jobInput = formElement.querySelector('.popup__form-item_line_job');

// profil
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');

// popup add form
const imageTitle = document.querySelector('.elements__item-title');
const imageLink = document.querySelector('.elements__item-image');
const imageTitleInput = document.querySelector('.popup__form-item_line_title');
const imageLinkInput = document.querySelector('.popup__form-item_line_link');
const formElementAdd = document.querySelector('.popup__form_add');

// popup Image
const popupImage = document.querySelector('.popup_image');
const popupImageBottonClose = document.querySelector('.popup__button-close_image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImageFoto = document.querySelector('.popup__image-foto');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements_template').content;





// open-close popups func
const togglePopup = function (popup) {
    popup.classList.toggle('popup_opened');
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
    togglePopup(popupElement);
}

function createCard(data) {
    const cardElement = elementsTemplate.cloneNode(true);
    cardElement.querySelector('.elements__item-image').src = data.link;
    cardElement.querySelector('.elements__item-title').textContent = data.name;
    cardElement.querySelector('.elements__item-delete').addEventListener('click', handleDelete);
    cardElement.querySelector('.elements__item-like').addEventListener('click', handleLike);
    cardElement.querySelector('.elements__item-image').addEventListener('click', () => openPopupImage(data))
    return cardElement;

}

function renderCard(data, elements) {
    const cardElement = createCard(data);
    elements.prepend(cardElement);
}

initialCards.forEach(cardElement => { renderCard(cardElement, elements); });

function openPopupImage(data) {
    popupImage.querySelector('.popup__image-foto').src = data.link;
    popupImage.querySelector('.popup__image-title').textContent = data.name
    togglePopup(popupImage)
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
    togglePopup(popupAdd)
}

popupOpenBottonElement.addEventListener('click', function () { togglePopup(popupElement) }, formOpenPopup())
popupAddOpenButton.addEventListener('click', function () { togglePopup(popupAdd) })
popupCloseBottonElement.addEventListener('click', function () { togglePopup(popupElement) })
popupAddCloseButton.addEventListener('click', function () { togglePopup(popupAdd) })
popupImageBottonClose.addEventListener('click', function () { togglePopup(popupImage) })
formElement.addEventListener('submit', handleFormSubmit)
formElementAdd.addEventListener('submit', submitAddCardForm)