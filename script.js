class Task {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  editName(name) {
    this.name = name;
  }
}
class TaskLog {
  constructor() {
    this.arr = [];
    this.counter = 1;
  }
  add(name) {
    this.arr.push(new Task(this.counter++, name));
  }
  edit(id, name) {
    const i = this.#getTask(id);
    const task = this.arr[i];
    task.editName(name);
  }
  delete(id) {
    const i = this.#getTask(id);
    this.arr.splice(i, 1);
    if (this.isEmpty())
      this.counter = 1;
  }
  #getTask(id) {
    for (let i in this.arr) {
      if (this.arr[i].id == id) return i;
    }
  }
  isEmpty() {
    if (this.arr.length == 0) return true;
    else return false;
  }
  tasks() {
    return this.arr;
  }
}

const elements = {
  tasklog: document.querySelector(".tasklog"),
  add: document.querySelector(".add"),
  input: document.querySelector(".task-input"),
  createInput: function (value) {
    const html = `<input type="text" value="${value}" class="task-name">`;
    const element = parse(html);
    return element;
  },
  createTask: function (task) {
    const html = `<div class="task">
      <input type="checkbox" class="task-checkbox"/>
      <p class="task-name" contenteditable="true">${task.name}</p>
      <input type="button" id=${task.id} class="btn delete" value="delete" />
    </div>`;
    const element = parse(html);
    const del = element.querySelector(".delete");
    del.addEventListener("click", function (event) {
      tasklog.delete(del.id);
      displayTasks(tasklog);
    });
    return element;
  },
};

function parse(html) {
  const element = document.createElement("div");
  element.innerHTML = html;
  return element.firstElementChild;
}

function displayTasks(tasklog) {
  elements.tasklog.innerHTML = "";
  tasklog.arr.forEach((task) => {
    const element = elements.createTask(task);
    elements.tasklog.appendChild(element);
  });
  storeTasks(tasklog);
}
function storeTasks(tasklog) {
  if (tasklog.isEmpty())
    localStorage.removeItem('tasklog');
  else
  {
    const jsonString = JSON.stringify(tasklog);
    localStorage.setItem("tasklog", jsonString);
  }
}

function restoreTasks() {
  const obj = JSON.parse(localStorage.getItem("tasklog"));
  return Object.assign(new TaskLog(), obj);
}

function addTask(name) {
  tasklog.add(name);
  displayTasks(tasklog);
}

function isValidTask(name) {
  if (name == "") return false;
  return true;
}

const tasklog = restoreTasks();
displayTasks(tasklog);

elements.add.addEventListener("click", function (event) {
  const name = elements.input.value;
  if (isValidTask(name)) {
    addTask(name);
    elements.input.value = "";
  }
});

elements.input.addEventListener("keydown", function (event) {
  const name = elements.input.value;
  if (event.key == "Enter" && isValidTask(name)) {
    addTask(name);
    elements.input.value = "";
  }
});
