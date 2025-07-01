function closeEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

export function closeModal(modal) {
  modal.classList.add("popup_is-animated");
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
}

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscape);
}

export function closeOverlay(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
}

export function closeBtn(event) {
  if (event.target.classList.contains("popup__close")) {
    const modal = event.target.closest(".popup_is-opened");
    closeModal(modal);
  }
}

