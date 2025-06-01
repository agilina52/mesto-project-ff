import { initialCards } from "./cards.js";
import "../pages/index.css";

import { createCard, likeHandler, removeCard } from "../components/card.js";
import { closeModal, closeEscape, openModal, closeOverlay, closeBtn } from "../components/modal.js";

const cardList = document.querySelector(".places__list");

// Инициализация карточек
initialCards.forEach(function (element) {
  const cardElement = createCard(element, removeCard, likeHandler);
  cardList.append(cardElement);
});

// Модальные окна
const modals = document.querySelectorAll(".popup");
const modalEditProfile = document.querySelector(".popup_type_edit");
const modalAddCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");

// Прослушиватель нажатия по оверлею
modals.forEach((modal) => {
  modal.addEventListener("click", closeOverlay);
});

// Прослушиватель нажатия по кнопке закрытия
modals.forEach((modal) => {
  modal.addEventListener("click", closeBtn);
});

// Кнопки открытия модальных форм
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonShowCard = document.querySelectorAll(".card__image");

// Открытие модального окна карточки с картинкой
buttonShowCard.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalImage.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeEscape);
  });
});

// Открытие модального окна профиля
buttonEditProfile.addEventListener("click", () => {
  modalEditProfile.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscape);
});

// Открытие модального окна добавления карточки
buttonAddCard.addEventListener("click", () => {
  modalAddCard.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscape);
});

// Обработка сохранения профиля
const saveEditProfile = modalEditProfile.querySelector(".popup__button");
saveEditProfile.addEventListener("click", () => {
  closeModal(modalEditProfile);
});

// Обработка сохранения карточки
const NewCard = modalAddCard.querySelector(".popup__button");
NewCard.addEventListener("click", (evt) => {
  evt.preventDefault();
  const nameCard = modalAddCard.querySelector(".popup__input_type_card-name").value;
  const urlCard = modalAddCard.querySelector(".popup__input_type_url").value;
  const newCardData = {
    name: nameCard,
    link: urlCard,
  };
  const cardElement = createCard(newCardData, removeCard, likeHandler);
  cardList.prepend(cardElement);
  closeModal(modalAddCard);
});

// Обработчик клика по картинке карточки (делегирование)
cardList.addEventListener("click", function (event) {
  if (event.target.classList.contains("card__image")) {
    const imageSrc = event.target.src;
    const imageAlt = event.target.alt;
    const modalImageContent = modalImage.querySelector(".popup__image");
    const modalCaption = modalImage.querySelector(".popup__caption");

    modalImageContent.src = imageSrc;
    modalImageContent.alt = imageAlt;
    modalCaption.textContent = imageAlt.replace("Изображение места: ", "");

    openModal(modalImage);
  }
});

// Редактирование профиля
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
}

formElement.addEventListener("submit", handleFormSubmit);
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", fillProfileForm);
