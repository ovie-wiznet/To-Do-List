let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
}
 
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach((taskText, index)=>renderTask(taskText, index));
    }
}

function renderTask(taskText, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        const newText = prompt("edit task :", span.textContext);
        if (newText !== null && newText.trim() !== ""){
            tasks[index] = newText.trim();
            saveTasks();
            updateList();
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent ="Delete";
    deleteBtn.onclick = function () {
        const removeConfirm = confirm("Do you want to remove " + (li.firstChild.textContent) + " from the line?" );

    if (removeConfirm) {
        
        tasks.splice(index, 1);
        saveTasks();
        updateList();

      }
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    document.getElementById("taskList").appendChild(li);
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Please task must not be empty");

    tasks.push(taskText);
    saveTasks();
    updateList();
    taskInput.value = "";
}

function updateList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => renderTask(task, index));
}

window.onload = loadTasks;