const addNote = document.querySelector("[data-add-note]");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const title = document.querySelector("input");
const desc = document.querySelector("textarea");
const addBtn = document.querySelector(".submit");
const cancel = document.querySelector(".title i");
const modalHeading = document.querySelector(".title p");

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

let isUpdated = false,
  updateId;
// show notes
function showAllNotes() {
  document.querySelectorAll(".note-container").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let noteCard = `<div class="note-container">
                      <div class="note-content">
                        <div class="note-title">${note.title}</div>
                        <div class="note-description">
                        ${note.description}
                        </div>
                      </div>
                      <div class="note-footer">
                        <div class="date">${note.date}</div>
                        <div class="menu">
                          <i onclick= "showMenu(this)"class="uil uil-ellipsis-h"></i>
                          <ul class="menu-items">
                            <li onclick="updateNote(${index}, '${note.title}', '${note.description}' )"><i class="uil uil-edit-alt"></i> Edit</li>
                            <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i> Delete</li>
                          </ul>
                        </div>
                      </div>
                    </div>`;

    addNote.insertAdjacentHTML("afterend", noteCard);
  });
}
showAllNotes();

addNote.addEventListener("click", () => {
  title.focus();
  modalContainer.classList.add("show");
});

//clicking the X icon
cancel.addEventListener("click", () => {
  isUpdated = false;
  title.value = "";
  desc.value = "";
  addBtn.value = "Save";
  modalHeading.innerText = "Add Note";
  modalContainer.classList.remove("show");
});

//clicking outside the modal
window.onclick = (e) => {
  if (e.target == modalContainer) {
    title.value = "";
    desc.value = "";
    addBtn.value = "Save";
    modalHeading.innerText = "Add Note";
    modalContainer.classList.remove("show");
  }
};

//drop-down menu
function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

//delete note
function deleteNote(noteId) {
  notes.splice(noteId, 1);

  //update the collection in local storage
  localStorage.setItem("notes", JSON.stringify(notes));

  //show the updated notes
  showAllNotes();
}

//update note
function updateNote(noteId, noteTitle, description) {
  isUpdated = true;
  updateId = noteId;
  addNote.click();
  title.value = noteTitle;
  desc.value = description;
  addBtn.value = "Update Note";
  modalHeading.innerText = "Edit Note";
  console.log(noteId, title, desc);
}

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
    if (!isUpdated) {
      notes.push(noteInfo);
    } else {
      isUpdated = false;
      notes[updateId] = noteInfo; //updating specified note
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    cancel.click();
    showAllNotes();
  }
});
