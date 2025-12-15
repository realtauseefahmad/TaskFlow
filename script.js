let taskData = {};
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector('#done');
const tasks = document.querySelectorAll(".task");
const columns = [todo, progress, done];
let dragElement = null;

// Helper function to add drag + touch events
function makeTaskDraggable(div) {
    // Desktop drag
    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    // Mobile touch drag
    div.addEventListener("touchstart", (e) => {
        dragElement = div;
        div.style.position = "absolute";
        div.style.zIndex = "1000";
    });

    div.addEventListener("touchmove", (e) => {
        e.preventDefault(); 
        const touch = e.touches[0];
        div.style.left = touch.clientX - div.offsetWidth/2 + "px";
        div.style.top = touch.clientY - div.offsetHeight/2 + "px";
    });

    div.addEventListener("touchend", (e) => {
        div.style.position = "static";
        div.style.zIndex = "auto";

        const touch = e.changedTouches[0];
        columns.forEach(col => {
            const rect = col.getBoundingClientRect();
            if(touch.clientX > rect.left &&
               touch.clientX < rect.right &&
               touch.clientY > rect.top &&
               touch.clientY < rect.bottom){
                   col.appendChild(div);
                   updateTaskCount();
            }
        });
    });
}

function addTask(title, desc, column) {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `<h2>${title}</h2>
                    <p>${desc}</p>
                    <button>Delete</button>`;
    column.appendChild(div);

    makeTaskDraggable(div);

    const deleteBtn = div.querySelector("button");
    deleteBtn.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    });

    return div;
}

function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            };
        });

        localStorage.setItem("tasks", JSON.stringify(taskData));
        if (count) count.innerText = tasks.length;
    });
}

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            addTask(task.title, task.desc, column);
        });
    }
    updateTaskCount();
}

tasks.forEach(task => {
    makeTaskDraggable(task);
});

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
        updateTaskCount();
    });
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

const toggleModalbtn = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalbtn.addEventListener("click", () => {
    modal.classList.toggle("active");
});
modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});
addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-description-input").value;

    addTask(taskTitle, taskDesc, todo);
    updateTaskCount();
    modal.classList.remove("active");
    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-description-input").value = "";
});
