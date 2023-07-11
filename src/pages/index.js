import './index.css';
import Card from '../../src/components/Card.js';
import FormValidator from '../../src/components/FormValidator.js';
import PopupWithImage from '../../src/components/PopupWithImage.js';
import Section from '../../src/components/Section.js';
import UserInfo from '../../src/components/UserInfo.js';
import PopupWithForm from '../../src/components/PopupWithForm.js';
import PopupCardDelete from '../../src/components/PopupCardDelete';
import Api from '../../src/components/Api';
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
    popupCardDeleteSelector,
    popupAvatarSelector,
    formPopupAvatarSelector,
    profileInfo
} from '../../src/utils/constants.js';
import { data } from 'autoprefixer';


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: 'c8d37796-a0b1-4b8e-9620-3e74f8438711',
        'Content-Type': 'application/json'
    }
});

function creatNewCard(cardElement) {
    const card = new Card(cardElement, templateSelector, popupImage.open, popupDeleteCard.open, (likeElement, cardId) => {
        if (likeElement.classList.contains('elements__item-like_active')) {
            api.deleteLike(cardId)
                .then(res => {
                    card.toggleLike(res.likes);
                })
                .catch((error) => console.log(`Ошибка при снятии лайка ${error}`))
        } else {
            api.addLike(cardId)
                .then(res => {
                    card.toggleLike(res.likes);
                })
                .catch((error) => console.log(`Ошибка при добавлении лайка ${error}`))
        }
    });
    return card.сreateCard();
}

const section = new Section((cardElement) => {
    section.addItem(creatNewCard(cardElement))
}, elementSelector);

const userInfo = new UserInfo(profileInfo)

const popupProfil = new PopupWithForm(popupEditProfileSelector, (data) => {
    api.setProfilInfo(data)
        .then(res => {
            userInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar })
            popupProfil.close()
        })
        .catch((error) => console.log(`Ошибка при редактировании профиля ${error}`))
        .finally(() => popupProfil.getSubmitButtonText())
});
popupProfil.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
    api.addNewCard(data)
        .then(dataCard => {
            dataCard.id = userInfo.getId();
            section.addItem(creatNewCard(dataCard))
            popupAddCard.close()
        })
        .catch((error) => console.log(`Ошибка при создании карточки ${error}`))
        .finally(() => popupAddCard.getSubmitButtonText())
});
popupAddCard.setEventListeners();

const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
    api.setProfilAvatar(data)
        .then(res => {
            userInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar })
            popupAvatar.close()
        })
        .catch((error) => console.log(`Ошибка при редактировании аватара ${error}`))
        .finally(() => popupAvatar.getSubmitButtonText())
});
popupAvatar.setEventListeners();

const popupDeleteCard = new PopupCardDelete(popupCardDeleteSelector, ({ card, cardId }) => {
    api.deleteCard(cardId)
        .then(() => {
            card.removeCardElement()
            popupDeleteCard.close();
        })
        .catch((error) => console.log(`Ошибка при удалении карточки ${error}`))
        .finally(() => popupDeleteCard.getSubmitButtonText())
});
popupDeleteCard.setEventListeners();

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();


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


Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCard]) => {
        dataCard.forEach(element => {
            element.id = dataUser._id
        });
        userInfo.setUserInfo({ name: dataUser.name, job: dataUser.about, avatar: dataUser.avatar });
        userInfo.setId(dataUser._id)
        section.addInitialItems(dataCard.reverse());
    })
    .catch((error => console.log(`Ошибка при создании данных ${error}`)))