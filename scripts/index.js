const popupElement = document.querySelector('.popup');
const popupCloseBottonElement = popupElement.querySelector('.popup__button-close');
const popupOpenBottonElement = document.querySelector('.profile__button-edit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-item_name');
const jobInput = formElement.querySelector('.popup__form-item_job');
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');


const openPopup = function () {
    popupElement.classList.add('popup_opened');
};

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
};

const handleFormSubmit =
    function handleFormSubmit(evt) {
        evt.preventDefault();
        nameTitle.textContent = nameInput.value;
        jobSubtitle.textContent = jobInput.value;
        closePopup();
    }

popupOpenBottonElement.addEventListener('click', openPopup);
popupCloseBottonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);