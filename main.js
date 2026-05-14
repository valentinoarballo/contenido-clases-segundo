const taskInput = document.getElementById('taskInput');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const prioritySelect = document.getElementById('prioritySelect');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = "all";

taskForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText === "") return;

  createTask(taskText, priority);

  taskInput.value = "";
  prioritySelect.value = "medium";
})


function createTask(text, priority) {

  const li = document.createElement("li");
  li.classList.add("flex", "items-center", "justify-between", "p-4", "border-b", "border-zinc-500", "bg-zinc-800", "rounded", "mb-2", "hover:bg-zinc-700", "transition-colors", "duration-200");

  li.dataset.priority = priority;
  li.dataset.status = "pending";


  const leftConteiner = document.createElement("div");
  leftConteiner.classList.add("flex", "items-center", "gap-2", "flex-1");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("form-checkbox", "h-5", "w-5", "text-blue-600");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("text-gray-800", "dark:text-gray-200", "break-all");

  const priorityTag = document.createElement("span");
  priorityTag.textContent = priority.toUpperCase();
  priorityTag.classList.add("text-xs", "font-bold", "px-2", "py-1", "rounded-full");

  switch (priority) {
    case "low":
      priorityTag.classList.add("bg-green-200", "text-green-800");
      break;
    case "medium":
      priorityTag.classList.add("bg-yellow-200", "text-yellow-800");
      break;
    case "high":
      priorityTag.classList.add("bg-red-200", "text-red-800");
      break;
  }

  const deleteButton = document.createElement("button");

  deleteButton.classList.add("text-red-500", "hover:text-red-700", "focus:outline-none");

  deleteButton.innerHTML = `<svg width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>`;

  deleteButton.addEventListener("click", () => {
    li.remove();
  });

  checkbox.addEventListener("change", () => {

    if (checkbox.checked) {
      li.dataset.status = "completed";
      span.classList.add("line-through", "text-gray-400");
    } else {
      li.dataset.status = "pending";
      span.classList.remove("line-through", "text-gray-400");
    }

    filterTasks();
  })

  span.addEventListener("dblclick", () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText === null) return;
    span.textContent = newText.trim();
  })

  leftConteiner.appendChild(checkbox);
  leftConteiner.appendChild(span);
  leftConteiner.appendChild(priorityTag);

  li.appendChild(leftConteiner);
  li.appendChild(deleteButton);

  taskList.appendChild(li);
}

searchInput.addEventListener("input", filterTasks);

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;
    filterTasks();
  });
});


function filterTasks() {

  const tasks = taskList.children

  for (let task of tasks) {

    const text = task.querySelector("span").textContent.toLowerCase();
    const searchText = searchInput.value.toLowerCase();
    const matchesSearch = text.includes(searchText);
    
    
    const status = task.dataset.status;


    let matchesFilter = true;

    if (currentFilter == "completed") {
      matchesFilter = status === "completed";
    } 

    if (currentFilter == "pending") {
      matchesFilter = status === "pending";
    }

    if ( matchesSearch && matchesFilter ) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  }
}
