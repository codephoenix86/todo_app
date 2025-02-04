// variables
const searchBar = document.querySelector("#search .search-bar");
const addTaskButton = document.querySelector("#buttons .add-btn");
const tasksSection = document.querySelector("#tasks");

// event listeners
addTaskButton.addEventListener("click", function () {
  const text = searchBar.value
  addTask(text);
  searchBar.value = new String()
});

function addTask(text) {
  const element = parseElement(
`
  <div class="task">
    <input type="checkbox" class="task-checkbox">
    <p class="task-name">${text}</p>
    <input type="button" value="edit">
  </div>
`
  )
  tasksSection.appendChild(element)
}

// utils
function parseElement(htmlString) {
  const temp = document.createElement('div')
  temp.innerHTML = htmlString;
  return temp.firstElementChild
}