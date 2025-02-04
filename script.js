// variables
const searchBar = document.querySelector("#search .search-bar");
const addTaskButton = document.querySelector("#buttons .add-btn");
const deleteButton = document.querySelector("#buttons .delete-all-btn");
const tasksSection = document.querySelector("#tasks");

// event listeners
addTaskButton.addEventListener("click", function () {
  const text = searchBar.value;
  if (tasksSection.classList.contains("empty"))
    tasksSection.classList.remove("empty");
  addTask(text);
  searchBar.value = new String();
});

deleteButton.addEventListener("click", function () {
  deleteAll(tasksSection);
  tasksSection.classList.add("empty");
});

tasksSection.addEventListener("click", function (event) {
  if (event.target.className == "edit-btn")
    editTask(event.target.parentElement);
  else if (event.target.className == "delete-btn") {
    deleteTask(event.target.parentElement);
    if (tasksSection.childElementCount == 0)
      tasksSection.classList.add("empty");
  }
});

tasksSection.addEventListener("change", function (event) {
  if (event.target.className == "task-checkbox")
    updateTask(event.target.parentElement);
});

// event handlers
function addTask(text) {
  const element = parse(
    `
  <div class="task">
    <input type="checkbox" class="task-checkbox">
    <p class="task-name">${text}</p>
    <input type="button" class="edit-btn" value="edit">
    <input type="button" class="delete-btn" value="delete">
  </div>
`
  );
  tasksSection.appendChild(element);
}

function deleteTask(element) {
  element.remove();
}

function deleteAll(element) {
  element.innerHTML = new String();
}

function editTask(task) {
  const name = task.querySelector(".task-name");
  const input = parse('<input type="text" class="task-name">');
  input.value = name.innerText;
  input.addEventListener("blur", function () {
    name.innerText = input.value;
    input.replaceWith(name);
  });
  name.replaceWith(input);
  input.focus();
}

function updateTask(element) {
  const checkbox = element.querySelector(".task-checkbox");
  const name = element.querySelector(".task-name");
  if (checkbox.checked) name.classList.add("disabled");
  else name.classList.remove("disabled");
}

// utils
function parse(htmlString) {
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  return temp.firstElementChild;
}
