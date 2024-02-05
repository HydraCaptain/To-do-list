document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskText = taskInput.value.trim();

    const task = document.createElement('li');
    task.innerHTML = `
        <input type="checkbox" onclick="toggleCheck(this)">
        <span>${taskText}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(task);
    saveTask(taskText);

    taskInput.value = '';
}

function editTask(button) {
    const newTaskText = prompt('Edit task:', button.parentElement.querySelector('span').innerText);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        button.parentElement.querySelector('span').innerText = newTaskText.trim();
        updateLocalStorage();
    }
}

function deleteTask(button) {
    if (confirm('Are you sure you want to delete this task?')) {
        button.parentElement.remove();
        updateLocalStorage();
    }
}

function toggleCheck(checkbox) {
    const taskText = checkbox.nextElementSibling; // Get the next sibling, which is the <span> element
    taskText.classList.toggle('completed');
    updateLocalStorage();
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    const tasks = [];
    const taskList = document.getElementById('taskList').getElementsByTagName('li');

    for (let i = 0; i < taskList.length; i++) {
        const span = taskList[i].querySelector('span');
        const checkbox = taskList[i].querySelector('input[type="checkbox"]');
        tasks.push({ text: span.innerText, completed: checkbox.checked });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleCheck(this)">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        taskList.appendChild(taskElement);
    });
}

