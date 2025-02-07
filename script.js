class Task {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.status = true;
  }
  editName(name) {
    this.name = name;
  }
  active() {
    return this.status;
  }
  done() {
    this.status = false;
  }
  undone() {
    this.status = true;
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
    if (this.isEmpty()) this.counter = 1;
  }
  #getTask(id) {
    for (let i in this.arr) {
      if (this.arr[i].id == id) return i;
    }
  }
  get(id) {
    for (let task of this.arr) if (task.id == id) return task;
  }
  isEmpty() {
    if (this.arr.length == 0) return true;
    else return false;
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
      <input type="checkbox" id=${task.id} ${
      task.active() ? "" : "checked"
    } class="task-checkbox"/>
      <input id=${task.id} type="text" value="${task.name}" class="task-name ${(task.active()?"":"done")}">
      <input type="button" id=${task.id} class="btn delete" value="delete">
    </div>`;
    const element = parse(html);
    const del = element.querySelector(".delete");
    const checkbox = element.querySelector(".task-checkbox");
    const input = element.querySelector('.task-name');
    del.addEventListener("click", function (event) {
      tasklog.delete(del.id);
      displayTasks(tasklog);
    });
    input.addEventListener('blur', function (event) {
      const name = input.value;
      tasklog.edit(input.id, name);
      displayTasks(tasklog);
    })
    checkbox.addEventListener("change", function (event) {
      const task = tasklog.get(checkbox.id);
      if (task.active()) task.done();
      else task.undone();
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
    console.log(task);
    const element = elements.createTask(task);
    elements.tasklog.appendChild(element);
  });
  storeTasks(tasklog);
}
function storeTasks(tasklog) {
  if (tasklog.isEmpty()) localStorage.removeItem("tasklog");
  else {
    const jsonString = JSON.stringify(tasklog);
    localStorage.setItem("tasklog", jsonString);
  }
}

function restoreTasks() {
  let obj = JSON.parse(localStorage.getItem("tasklog")) || new TaskLog();
  for (let i in obj.arr) obj.arr[i] = Object.assign(new Task(), obj.arr[i]);
  obj = Object.assign(new TaskLog(), obj);
  return obj;
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
