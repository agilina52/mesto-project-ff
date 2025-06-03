import { initialCards } from "./components/cards.js";
import "./pages/index.css";

import { createCard, likeCard, deleteCard } from "./components/card.js";
import {
  closeModal,
  openModal,
  closeOverlay,
  closeBtn,
} from "./components/modal.js";

const cardList = document.querySelector(".places__list");

// Инициализация карточек
initialCards.forEach(function (element) {
  const cardElement = createCard(element, deleteCard, likeCard, openImagePopup);
  cardList.append(cardElement);
});

// Модальные окна
const modals = document.querySelectorAll(".popup");
const modalEditProfile = document.querySelector(".popup_type_edit");
const modalAddCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");
const inputNameFormNewCard = modalAddCard.querySelector(
  ".popup__input_type_card-name"
);
const inputLinkFormNewCard = modalAddCard.querySelector(
  ".popup__input_type_url"
);
const modalImageContent = modalImage.querySelector(".popup__image");
const modalImageCaption = modalImage.querySelector(".popup__caption");

// Кнопки открытия модальных форм
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// Обработка сохранения карточки
const newCard = modalAddCard.querySelector(".popup__form");

// Редактирование профиля
const formEditProfile = modalEditProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

function openImagePopup(cardData) {
  modalImageContent.src = cardData.src;
  modalImageContent.alt = cardData.alt;
  modalImageCaption.textContent = cardData.alt.replace(
    "Изображение места: ",
    ""
  );

  openModal(modalImage);
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
}

// Прослушиватель нажатия по оверлею
modals.forEach((modal) => {
  modal.addEventListener("click", closeOverlay);
});

// Прослушиватель нажатия по кнопке закрытия
modals.forEach((modal) => {
  modal.addEventListener("click", closeBtn);
});

// Открытие модального окна профиля
buttonEditProfile.addEventListener("click", () => {
  openModal(modalEditProfile);
});

// Открытие модального окна добавления карточки
buttonAddCard.addEventListener("click", () => {
  openModal(modalAddCard);
});

newCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: inputNameFormNewCard.value,
    link: inputLinkFormNewCard.value,
  };
  const cardElement = createCard(
    newCardData,
    deleteCard,
    likeCard,
    openImagePopup
  );
  cardList.prepend(cardElement);
  inputNameFormNewCard.value = "";
  inputLinkFormNewCard.value = "";

  closeModal(modalAddCard);
});

// Обработка сохранения профиля
const formProfile = modalEditProfile.querySelector(".popup__form");
formProfile.addEventListener("submit", () => {
  closeModal(modalEditProfile);
});

formEditProfile.addEventListener("submit", handleFormSubmitProfile);
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", fillProfileForm);
