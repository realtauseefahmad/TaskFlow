const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const toggleModalBtn = document.querySelector("#openModal");
const addTaskBtn = document.querySelector("#addTask");

const titleInput = document.querySelector("#title");
const descInput = document.querySelector("#desc");

let draggedTask = null;

// Storage handlers

function saveTasks() {
    const data = {};
    columns.forEach(col => {
        data[col.id] = [...col.querySelectorAll(".task")].map(task => ({
            title: task.querySelector("strong").innerText,
            desc: task.querySelector("p").innerText
        }));
    });
    localStorage.setItem("tasks", JSON.stringify(data));
}

function loadTasks() {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (!data) return;

    columns.forEach(col => col.querySelectorAll(".task").forEach(t => t.remove()));

    for (const colId in data) {
        const column = document.querySelector(`#${colId}`);
        data[colId].forEach(task => {
            createTask(task.title, task.desc, column);
        });
    }

    updateCounts();
}

// task creation

function createTask(title, desc, column) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.setAttribute("draggable", "true");

    task.innerHTML = `
        <strong>${title}</strong>
        <p>${desc}</p>
        <button>Delete</button>
    `;

    column.appendChild(task);
    enableDrag(task);

    task.querySelector("button").addEventListener("click", () => {
        task.remove();
        saveTasks();
        updateCounts();
    });

    updateCounts();
}

// count updater

function updateCounts() {
    columns.forEach(col => {
        const span = col.querySelector("h2 span");
        if (span) span.innerText = col.querySelectorAll(".task").length;
    });
}

// Drag and Drop

function enableDrag(task) {
    // Desktop drag
    task.addEventListener("dragstart", () => {
        draggedTask = task;
    });

    // Column drop
    columns.forEach(col => {
        col.addEventListener("dragover", e => e.preventDefault());
        col.addEventListener("drop", () => {
            if (draggedTask) {
                col.appendChild(draggedTask);
                draggedTask = null;
                saveTasks();
                updateCounts();
            }
        });
    });

    // Mobile drag
    task.addEventListener("touchstart", () => {
        draggedTask = task;
    });

    task.addEventListener("touchend", e => {
        const touch = e.changedTouches[0];
        columns.forEach(col => {
            const rect = col.getBoundingClientRect();
            if (
                touch.clientX > rect.left &&
                touch.clientX < rect.right &&
                touch.clientY > rect.top &&
                touch.clientY < rect.bottom
            ) {
                col.appendChild(task);
            }
        });
        draggedTask = null;
        saveTasks();
        updateCounts();
    });
}

// modal handlers

toggleModalBtn.addEventListener("click", () => modal.classList.add("active"));
overlay.addEventListener("click", () => modal.classList.remove("active"));

addTaskBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    if (!title) return;

    createTask(title, descInput.value.trim(), todo);
    saveTasks();
    updateCounts();

    titleInput.value = "";
    descInput.value = "";
    modal.classList.remove("active");
});

// INIT 
loadTasks();
