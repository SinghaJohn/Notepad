document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('task-list');
    const clearTasksBtn = document.getElementById('clear-tasks');

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToList(task));
    }

    // Add task to the list
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.innerHTML = `${task} <button class="delete">X</button>`;
        taskList.appendChild(li);
    }

    // Save tasks to local storage
    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove task from local storage
    function removeTaskFromLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for adding a task
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskValue = taskInput.value.trim();
        if (taskValue !== '') {
            addTaskToList(taskValue);
            saveTaskToLocalStorage(taskValue);
            taskInput.value = '';
        }
    });

    // Event listener for deleting a task
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            const li = e.target.parentElement;
            const task = li.innerText.replace('X', '').trim();
            li.remove();
            removeTaskFromLocalStorage(task);
        }
    });

    // Event listener for clearing all tasks
    clearTasksBtn.addEventListener('click', function () {
        while (taskList.firstChild) {
            taskList.firstChild.remove();
        }
        localStorage.removeItem('tasks');
    });

    // Load tasks on page load
    loadTasks();
});
