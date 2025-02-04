// components
function taskString(data) {
  return `
  <div class="task">
    <input type="checkbox" class="task-checkbox">
    <p class="task-name">${data.taskName}</p>
    <input type="button" value="edit">
  </div>
         `
}

// variables
let searchBar = document.querySelector("#search .search-bar");
let addTaskButton = document.querySelector("#buttons .add-btn");
let tasksSection = document.querySelector("#tasks");

// event listeners
addTaskButton.addEventListener("click", function () {
  addTask(tasksSection, searchBar, taskElement)
});

// event handlers
function addTask(tasksLog, searchBar) {
  const newTask = taskString({taskName:searchBar.value})
  
}

// utils
function parseElement(htmlString) {
  const temp = document.createElement('div')
  temp.innerHTML = htmlString;
  return temp.firstElementChild
}