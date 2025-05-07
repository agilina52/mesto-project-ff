const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

function createCard(element) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__title").textContent = element.name;

  deleteButton.addEventListener("click", function () {
    const cardDelete = deleteButton.closest(".card");
    cardDelete.remove();
  });

  return cardElement;
}

initialCards.forEach(function (element) {
  const cardElement = createCard(element);
  cardList.append(cardElement);
});
