// Функция создания
import { deleteCardFromServer, setLikeCard, setUnlikeCard } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  onDeleteCard,
  onLikeCard,
  onOpenImagePopup,
  currentUser
) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = `Изображение места: ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  if (currentUser._id !== cardData.owner._id) {
    deleteButton.hidden = true;
  }

  if (cardData.likes.some((count) => count._id === currentUser._id)) {
    likeButton.classList.add("card__like-button_is-active");
    console.log(cardData.likes, currentUser._id);
  }

  deleteButton.addEventListener("click", () =>
    onDeleteCard(deleteButton, cardData._id)
  );
  likeButton.addEventListener("click", () =>
    onLikeCard(cardData._id, likeButton, likeCount)
  );
  cardImage.addEventListener("click", () => {
    const cardData = {
      src: cardImage.src,
      alt: cardImage.alt,
    };
    onOpenImagePopup(cardData);
  });

  return cardElement;
}

export function likeCard(id, likeButton, likeCount) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
    setUnlikeCard(id)
      .then((result) => {
        likeCount.textContent = result.likes.length;
      })
      .catch((error) => {
        console.log("Ошибка снятия лайка карточки", error);
      });
  } else {
    likeButton.classList.add("card__like-button_is-active");
    setLikeCard(id)
      .then((result) => {
        likeCount.textContent = result.likes.length;
      })
      .catch((error) => {
        console.log("Ошибка добавления лайка карточки", error);
      });
  }
}

export function deleteCard(deleteButton, id) {
  const cardDelete = deleteButton.closest(".card");
  deleteCardFromServer(id)
    .then(() => {
      cardDelete.remove();
    })
    .catch((error) => {
      console.log("Ошибка при удалении карточки", error);
    });
}

