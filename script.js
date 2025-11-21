let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let profile = JSON.parse(localStorage.getItem("profile") || "{}");

// ========== TASKS ==========
function addTask() {
    const input = document.getElementById("taskInput");
    if (!input || input.value.trim() === "") return;

    const task = {
        id: Date.now(),
        text: input.value,
        done: false,
    };

    tasks.push(task);
    input.value = "";
    saveTasks();
    loadTasks();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    saveTasks();
    loadTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    loadTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const list = document.getElementById("taskList");
    if (!list) return;

    list.innerHTML = "";

    tasks.forEach(t => {
        const div = document.createElement("div");
        div.className = "task" + (t.done ? " done" : "");
        div.innerHTML = `
            <span>${t.text}</span>
            <div>
                <button onclick="toggleTask(${t.id})">Done</button>
                <button onclick="deleteTask(${t.id})">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}

// ========== SETTINGS ==========
function saveSettings() {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    if (!name || !email) {
        alert("Please fill in both fields!");
        return;
    }

    profile = { name, email };
    localStorage.setItem("profile", JSON.stringify(profile));
    loadProfileCard();

    const msg = document.getElementById("successMsg");
    msg.style.display = "inline";
    setTimeout(() => { msg.style.display = "none"; }, 2000);
}

function loadProfileCard() {
    if (!profile) return;

    const name = document.getElementById("cardName");
    const email = document.getElementById("cardEmail");
    const done = document.getElementById("cardDone");

    if (name) name.textContent = profile.name || "--";
    if (email) email.textContent = profile.email || "--";
    if (done) done.textContent = tasks.filter(t => t.done).length;
}

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadProfileCard();

    const input = document.getElementById("taskInput");
    if (input) {
        input.addEventListener("keypress", e => {
            if (e.key === "Enter") addTask();
        });
    }
});