const addNote = document.querySelector("[data-add-note]");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const title = document.querySelector("input");
const desc = document.querySelector("textarea");
const addBtn = document.querySelector(".submit");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addNote.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

window.onclick = (e) => {
  if (e.target == modalContainer) {
    modalContainer.classList.remove("show");
  }
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let titleValue = title.value;
  let descValue = desc.value;

  if (titleValue || descValue) {
    let dateObj = new Date();
    month = months[dateObj.getMonth()];
    day = dateObj.getDay();
    year = dateObj.getFullYear();

    //object that contains title, desc and date
    const noteInfo = {
      date: `${month} ${day}, ${year}`,
      description: descValue,
      title: titleValue,
    };

    notes.push(noteInfo);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
});
