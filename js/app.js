// ELEMENTS
const html = document.documentElement;
const header = document.getElementsByTagName('h1')[0];
const addButton = document.getElementById("addButton");
const buttonDeleteToDoList = document.getElementById("clearButton");
const inputToDo = document.getElementById("itemInput");
const addItem = document.getElementById('addItem');
const todoList = document.getElementById("todoList");
const titleList = document.getElementById('titleList');
const btnChangeLang = document.getElementById("changeLang");
const btnCommunication = document.getElementById("communication");
// loade event
window.addEventListener("load", function () {
  if (localStorage.getItem("listToDo") !== null) {
    for (let i = 0; i < JSON.parse(localStorage.getItem("listToDo")).length; i++) {
      addToDo(JSON.parse(localStorage.getItem("listToDo"))[i].text)
    }
  } else {
    localStorage.setItem('listToDo', JSON.stringify([]))
  }
});
// FUNCTIONS
function addToDo(text) {
  let li = document.createElement("li");
  let lable = document.createElement("label");
  let completeButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let div = document.createElement("div");
  let flagEye = 0;
  let completeButtonIcons = [`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`, `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`]
  // add classes
  li.classList.add("well");
  completeButton.classList.add('btn', 'btn-success');
  deleteButton.classList.add('btn', 'btn-danger');
  // text ToDo
  lable.innerHTML = text
  completeButton.innerHTML = completeButtonIcons[0]
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>`;
  // Combine
  div.append(completeButton, deleteButton);
  li.append(lable, div);
  todoList.append(li);
  //////// events notes
  let ToDoListLocalStorage = JSON.parse(localStorage.getItem("listToDo"))
  let index = ToDoListLocalStorage.findIndex(function (item) {
    return item.text === text
  })
  //delete note
  deleteButton.addEventListener("click", function () {
    ToDoListLocalStorage.splice(index, 1)
    localStorage.setItem("listToDo", JSON.stringify(ToDoListLocalStorage))
    let parentElement = deleteButton.parentElement
    parentElement.parentElement.remove()
  })
  //complete note
  completeButton.addEventListener("click", function () {
    if (ToDoListLocalStorage[index].status) {
      ToDoListLocalStorage[index].status = false
      localStorage.setItem("listToDo", JSON.stringify(ToDoListLocalStorage))
      lable.classList.remove("completed")
    } else {
      ToDoListLocalStorage[index].status = true
      localStorage.setItem("listToDo", JSON.stringify(ToDoListLocalStorage))
      lable.classList.add("completed")
    }
    // chage eye
    if (flagEye === 0) {
      completeButton.innerHTML = completeButtonIcons[1];
      flagEye = 1
    } else {
      completeButton.innerHTML = completeButtonIcons[0];
      flagEye = 0
    }
  })
  if (ToDoListLocalStorage[index].status) {
    lable.classList.add("completed")
  }
}
function addToDoLocalStorage() {
  let value = JSON.parse(localStorage.getItem("listToDo"))
  let length = value.length
  value[length] = { text: inputToDo.value, status: false }
  localStorage.setItem("listToDo", JSON.stringify(value))
}
// EVENTS
addButton.addEventListener("click", function () {
  if (inputToDo.value) {
    addToDoLocalStorage()
    addToDo(inputToDo.value)
    inputToDo.value = "" // clear value input
  }
})
inputToDo.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    if (inputToDo.value) {
      addToDoLocalStorage()
      addToDo(inputToDo.value)
      inputToDo.value = "" // clear value input
    }
  }
})
buttonDeleteToDoList.addEventListener("click", function () {
  localStorage.setItem('listToDo', JSON.stringify([]))
  todoList.innerHTML = "";
})
btnChangeLang.addEventListener('click', function () {
  let currentLnag = btnChangeLang.innerText
  if (currentLnag === 'En') {
    html.dir = 'rtl'
    btnChangeLang.innerHTML = "Fa"
    addButton.innerHTML = "اضفه کردن"
    buttonDeleteToDoList.innerHTML = "حذف همه"
    header.innerHTML = "لیست یادداشت ها";
    titleList.innerHTML = "یاددارشت ها";
    addItem.innerText = "یادداشت جدید";
  } else {
    location.reload();
  };
});