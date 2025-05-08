const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

function createCard(element, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = element.link;
  cardImage.alt = `Изображение места: ${element.name}`;
  cardTitle.textContent = element.name;

  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

function removeCard(event) {
  const deleteButton = event.currentTarget;
  const cardDelete = deleteButton.closest(".card");
  cardDelete.remove();
}

initialCards.forEach(function (element) {
  const cardElement = createCard(element, removeCard);
  cardList.append(cardElement);
});
