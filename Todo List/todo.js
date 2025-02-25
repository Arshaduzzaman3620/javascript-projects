const todoList = [
  { name: "Your tusk", dueDate: "2025-02-25" },
  { name: "Add some thing", dueDate: "2025-02-25" },
];

// Initial render
renderTodoList();

function renderTodoList() {
  const todoListElement = document.querySelector(".js-todo-list");
  todoListElement.innerHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    const { name, dueDate } = todoList[i];

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    todoItem.innerHTML = `
      <span>${name} - ${dueDate}</span>
      <button class="delete-todo-button" onclick="deleteTodo(${i})">Delete</button>
    `;

    todoListElement.appendChild(todoItem);
  }
}

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value.trim();

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  if (name === "" || dueDate === "") {
    alert("Please enter both task name and date!");
    return;
  }

  todoList.push({ name, dueDate });

  inputElement.value = "";
  dateInputElement.value = "";

  renderTodoList();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  renderTodoList();
}
