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
        <button onclick="editTask(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></button>
        
        <button onclick="deleteTask(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
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
            <button onclick="editTask(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></button>
           
            <button onclick="deleteTask(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        `;

        taskList.appendChild(taskElement);
    });
}

