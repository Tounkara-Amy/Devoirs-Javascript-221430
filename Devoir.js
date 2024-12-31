
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const clearAllButton = document.getElementById('clearAllButton');
const taskCount = document.getElementById('taskCount');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateTaskList() {
    taskList.innerHTML = '';
    let completedCount = 0;
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        if (task.completed) {
            li.classList.add('completed');
            completedCount++;
        }

        li.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            updateTaskList();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            updateTaskList();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    taskCount.textContent = `Total: ${tasks.length} | Terminé: ${completedCount}`;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskButton.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        saveTasks();
        taskInput.value = ''; 
        updateTaskList();
    }
});

clearAllButton.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    updateTaskList();
});

updateTaskList();