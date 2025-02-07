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
    this.arr.splice(i - 1, 1);
  }
  #getTask(id) {
    for (let i in this.arr) {
      if (this.arr[i].id == id)
        return i;
    }
  }
  insert(arr) {
    this.arr = arr;
  }
  tasks() {
    return this.arr;
  }
}

const elements = {
  tasklog: document.querySelector(".tasklog"),
  add: document.querySelector('.add'),
  input: document.querySelector('.task-input'),
  createInput: function (value) {
    const html = `<input type="text" value="${value}" class="task-name">`;
    const element = parse(html);
    return element;
  },
  createTask: function (task) {
    const html = 
    `<div class="task">
      <input type="checkbox" class="task-checkbox"/>
      <p class="task-name" contenteditable="true">${task.name}</p>
      <input type="button" id=${task.id} class="btn delete" value="delete" />
    </div>`
    const element = parse(html);
    const del = element.querySelector('.delete');
    const name = element.querySelector('.task-name');
    del.addEventListener('click', function (event) {
      console.log('delete button is clicked')
      console.log(tasklog)
      tasklog.delete(del.id);
      displayTasks(tasklog);
    });
    return element;
  }
};

function parse(html) {
  const element = document.createElement('div');
  element.innerHTML = html;
  return element.firstElementChild;
}

function displayTasks(tasklog) {
  elements.tasklog.innerHTML = "";
  tasklog.arr.forEach((task) => {
    const element = elements.createTask(task);
    elements.tasklog.appendChild(element);
  });
}

function addTask(name) {
  tasklog.add(name);
  displayTasks(tasklog);
}

function isValidTask(name) {
  if (name == '')
    return false;
  return true;
}

const tasklog = new TaskLog();

elements.add.addEventListener('click', function (event) {
  const name = elements.input.value;
  if (isValidTask(name))
  {
    addTask(name);
    elements.input.value = '';
  }
});

elements.input.addEventListener('keydown', function (event) {
  const name = elements.input.value;
  if (event.key == 'Enter' && isValidTask(name))
  {
    addTask(name);
    elements.input.value = '';
  }
})