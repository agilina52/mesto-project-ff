// Функция создания
export function createCard(element, deleteCard, likeCard) {
    const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = element.link;
  cardImage.alt = `Изображение места: ${element.name}`;
  cardTitle.textContent = element.name;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  return cardElement;
};

// лайк
export function likeHandler (event) {
  const likeButton = event.currentTarget;
  
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active")
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
};

// Функция удаления карточки
export function removeCard(event) {
  const deleteButton = event.currentTarget;
  const cardDelete = deleteButton.closest(".card");
  cardDelete.remove();
};

