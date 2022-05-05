const addNote = document.querySelector("[data-add-note]");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");

addNote.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

window.onclick = (e) => {
  if (e.target == modalContainer) {
    modalContainer.classList.remove("show");
  }
};
