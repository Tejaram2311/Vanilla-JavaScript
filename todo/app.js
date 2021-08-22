const todoList = [];

document.querySelector("form").addEventListener("submit", handleSubmitForm);
document
  .querySelector("ul")
  .addEventListener("click", handleClickDeleteOrCheck);
document.querySelector(".clearAll").addEventListener("click", handleClearAll);

window.addEventListener("beforeunload", function (e) {
  localStorage.setItem("todo", JSON.stringify(todoList));
});

function handleSubmitForm(e) {
  e.preventDefault();

  let input = document.querySelector("input");

  if (input.value !== "") addTodo(input.value);
  input.value = "";
}

function addTodo(todo) {
  let ul = document.querySelector("ul");
  let li = document.createElement("li");

  li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button name="checkButton"><i class="fas fa-check-square"></i></button>
        <button name="deleteButton"><i class="fas fa-trash"></i></button>
        `;

  li.classList.add("todo-list-item");
  ul.appendChild(li);

  todoList.push(todo);
}

function handleClickDeleteOrCheck(e) {
  if (e.target.name === "checkButton") checkTodo(e);
  else if (e.target.name === "deleteButton") deleteTodo(e);
}

function checkTodo(e) {
  const item = e.target.parentNode;

  if (item.style.textDecoration === "line-through")
    item.style.textDecoration = "none";
  else item.style.textDecoration = "line-through";
}

function deleteTodo(e) {
  const item = e.target.parentNode;

  item.addEventListener("transitionend", function () {
    const todo = item.firstElementChild.innerHTML;

    const index = todoList.indexOf(todo);
    if (index >= 0) todoList.splice(index, 1);

    item.remove();
  });

  item.classList.add("todo-list-item-fall");
}

function handleClearAll(e) {
  document.querySelector("ul").innerHTML = "";
}

function loadTodo() {
  document.querySelector(".loader").style.display = "none";
  document.querySelector("ul").style.display = "block";
  document.querySelector(".clearAll").style.display = "block";

  let list = localStorage.getItem("todo");
  list = list !== null ? JSON.parse(list) : [];

  for (let i = 0; i < list.length; i++) {
    addTodo(list[i]);
  }
}

// load todo list from local storage
setTimeout(loadTodo, 500);
