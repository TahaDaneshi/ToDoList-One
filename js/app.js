// ELEMENTS
const html = document.documentElement;
const header = document.getElementsByTagName('h1')[0];
const addButton = document.getElementById("addButton");
const buttonDeleteToDoList = document.getElementById("clearButton");
const inputToDo = document.getElementById("itemInput");
const todoList = document.getElementById("todoList");
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
function changeLang() {
  let currentLnag = btnChangeLang.innerText
  if (currentLnag === 'En') {
    html.dir = 'rtl'
    btnChangeLang.innerHTML = "Fa"
    addButton.innerHTML = "اضفه کردن"
    buttonDeleteToDoList.innerHTML = "حذف همه"
    header.innerHTML = "لیست یادداشت ها"
  } else {

  };
};
function addToDo(text) {
  let li = document.createElement("li")
  let lable = document.createElement("label")
  let completeButton = document.createElement("button")
  let deleteButton = document.createElement("button")
  // add classes
  li.classList.add("well")
  completeButton.classList.add('btn', 'btn-success')
  deleteButton.classList.add('btn', 'btn-danger')
  // text ToDo
  lable.innerHTML = text
  completeButton.innerHTML = "Complete"
  deleteButton.innerHTML = "Delete"
  // Combine.
  li.append(lable, completeButton, deleteButton)
  todoList.append(li)
  //////// events notes
  let ToDoListLocalStorage = JSON.parse(localStorage.getItem("listToDo"))
  let index = ToDoListLocalStorage.findIndex(function (item) {
    return item.text === text
  })
  //delete note
  deleteButton.addEventListener("click", function () {
    ToDoListLocalStorage.splice(index, 1)
    localStorage.setItem("listToDo", JSON.stringify(ToDoListLocalStorage))
    console.log(ToDoListLocalStorage)
    let parentElement = deleteButton.parentElement
    parentElement.remove()
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
btnChangeLang.addEventListener('click', changeLang);