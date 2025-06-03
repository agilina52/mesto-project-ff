// Функция создания
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  onDeleteCard,
  onLikeCard,
  onOpenImagePopup
) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = `Изображение места: ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => onDeleteCard(deleteButton));
  likeButton.addEventListener("click", () => onLikeCard(likeButton));
  // cardImage.addEventListener("click", onOpenImagePopup);
  cardImage.addEventListener("click", () => {
    const cardData = {
      src: cardImage.src,
      alt: cardImage.alt,
    };
    onOpenImagePopup(cardData);
  });

  return cardElement;
}

// лайк
export function likeCard(likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
}

// Функция удаления карточки
export function deleteCard(deleteButton) {
  const cardDelete = deleteButton.closest(".card");
  cardDelete.remove();
}
