const popupElement = document.querySelector('.popup');
const popupCloseBottonElement = popupElement.querySelector('.popup__button-close');
const popupOpenBottonElement = document.querySelector('.profile__button-edit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-item_line_name');
const jobInput = formElement.querySelector('.popup__form-item_line_job');
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');


const openPopup = function () {
    popupElement.classList.add('popup_opened');
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobSubtitle.textContent;
};

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
};

const handleFormSubmit = function (evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobSubtitle.textContent = jobInput.value;
    closePopup();
}

popupOpenBottonElement.addEventListener('click', openPopup);
popupCloseBottonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);



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
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements_template').content;

initialCards.forEach(renderElement);

function renderElement(item) {
    const htmlElement = elementsTemplate.cloneNode(true);
    htmlElement.querySelector('.elements__item-title').textContent = item;
    const elementImage = htmlElement.querySelector('.elements__item-image');
    const elementText = htmlElement.querySelector('.elements__item-title');
    elementText.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;
    elements.append(htmlElement);
}
