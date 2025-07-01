import "./pages/index.css";
import { createCard, likeCard, deleteCard } from "./components/card.js";
import {
  closeModal,
  openModal,
  closeOverlay,
  closeBtn,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  updateAvatar,
  addCard,
  getUser,
  getCards,
  updateProfile,
} from "./components/api.js";

let currentUser = null;
const cardList = document.querySelector(".places__list");

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
const modalEditAvatar = document.querySelector(".popup_type_edit-avatar");

// Кнопки открытия модальных форм
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".avatar__edit-button");

// Формы модальных окон
const formModalAddCard = modalAddCard.querySelector(".popup__form");
const formEditProfile = modalEditProfile.querySelector(".popup__form");
const formEditAvatar = modalEditAvatar.querySelector(".popup__form");

const profileNameInput = formEditProfile.querySelector(
  ".popup__input_type_name"
);
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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
  profileNameInput.value = currentUser.name;
  jobInput.value = currentUser.about;
}

// Заполнение шапки профиля
function fillUserHeader(userProfile) {
  const userName = document.querySelector(".profile__title");
  const userAbout = document.querySelector(".profile__description");
  const userAvatar = document.querySelector(".profile__image");
  userName.textContent = userProfile.name;
  userAbout.textContent = userProfile.about;
  userAvatar.style.backgroundImage = `url("${userProfile.avatar}")`;
}

const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();
  const buttonSave = modalEditProfile.querySelector(".popup__button");
  setLoadingState(buttonSave, true);

  const nameValue = profileNameInput.value;
  const jobValue = jobInput.value;

  updateProfile({
    name: nameValue,
    about: jobValue,
  })
    .then((result) => {
      currentUser = result;
      fillUserHeader(result);
      closeModal(modalEditProfile);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoadingState(buttonSave, false);
    });
};

const handleFormSubmitNewCard = (evt) => {
  evt.preventDefault();
  const buttonSave = modalAddCard.querySelector(".popup__button");
  setLoadingState(buttonSave, true);

  const newCardData = {
    name: inputNameFormNewCard.value,
    link: inputLinkFormNewCard.value,
  };

  addCard(newCardData)
    .then((result) => {
      const cardElement = createCard(
        result,
        deleteCard,
        likeCard,
        openImagePopup,
        currentUser
      );

      cardList.prepend(cardElement);
      console.log(result);
      inputNameFormNewCard.value = "";
      inputLinkFormNewCard.value = "";
      closeModal(modalAddCard);
    })
    .catch((error) => {
      console.log("Ошибка при создании карточки:", error);
    })
    .finally(() => {
      setLoadingState(buttonSave, false);
    });
};

const handleFormSubmitAvatar = (evt) => {
  evt.preventDefault();
  const urlAvatarInput = modalEditAvatar.querySelector(
    ".popup__input_type_url-avatar"
  );
  const userAvatar = document.querySelector(".profile__image");
  const buttonSave = modalEditAvatar.querySelector(".popup__button");
  setLoadingState(buttonSave, true);

  const urlAvatarValue = urlAvatarInput.value;
  updateAvatar(urlAvatarValue)
    .then((result) => {
      console.log(result);
      userAvatar.style.backgroundImage = `url("${result.avatar}")`;
      closeModal(modalEditAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoadingState(buttonSave, false);
    });
};

const handleButtonEditAvatar = () => {
  clearValidation(modalEditAvatar, validationOptions);
  openModal(modalEditAvatar);
};

const handleButtonEditProfile = () => {
  fillProfileForm();
  clearValidation(modalEditProfile, validationOptions);
  openModal(modalEditProfile);
};

const handleButtonAddCard = () => {
  cleanUpForm(modalAddCard);
  clearValidation(modalAddCard, validationOptions);
  openModal(modalAddCard);
};

buttonEditAvatar.addEventListener("click", handleButtonEditAvatar);
buttonEditProfile.addEventListener("click", handleButtonEditProfile);
buttonAddCard.addEventListener("click", handleButtonAddCard);

formModalAddCard.addEventListener("submit", handleFormSubmitNewCard);
formEditProfile.addEventListener("submit", handleFormSubmitProfile);
formEditAvatar.addEventListener("submit", handleFormSubmitAvatar);

// Прослушиватель нажатия по оверлею и по кнопке
modals.forEach((modal) => {
  modal.addEventListener("click", closeOverlay);
  modal.addEventListener("click", closeBtn);
});

enableValidation(validationOptions);

// массив промисов
const promises = [getUser(), getCards()];
Promise.all(promises)
  .then((results) => {
    const [user, cards] = results;
    currentUser = user;
    cards.forEach(function (element) {
      const cardElement = createCard(
        element,
        deleteCard,
        likeCard,
        openImagePopup,
        currentUser
      );
      cardList.append(cardElement);
    });
    fillUserHeader(user);
  })
  .catch((err) => {
    console.log(err);
  });

  function setLoadingState(
  buttonElement,
  isLoading,
  defaultText = "Сохранить",
  loadingText = "Сохранение..."
) {
  buttonElement.textContent = isLoading ? loadingText : defaultText;
  buttonElement.disabled = isLoading;
}

function cleanUpForm(formElement) {
  const inputList = Array.from(formElement.querySelectorAll("input"));
  inputList.forEach(element => {
    element.value = "";
  })
}