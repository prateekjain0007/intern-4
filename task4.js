
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (task.completed) taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <div>
                <strong>${task.name}</strong>
                <p>${task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleString()}` : ''}</p>
            </div>
            <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <span class="task-edit" onclick="editTask(${index})">✏️</span>
            <span class="task-delete" onclick="deleteTask(${index})">🗑️</span>
        `;

        taskList.appendChild(taskItem);
    });
}


function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;

    if (taskName.trim() === '') {
        alert('Task name cannot be empty!');
        return;
    }

    const newTask = {
        name: taskName,
        completed: false,
        dueDate: taskDate ? new Date(taskDate).toISOString() : null
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

   
    document.getElementById('taskName').value = '';
    document.getElementById('taskDate').value = '';
    renderTasks();
}


function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}


function editTask(index) {
    const newTaskName = prompt('Edit task name:', tasks[index].name);
    if (newTaskName && newTaskName.trim() !== '') {
        tasks[index].name = newTaskName;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}


function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}


renderTasks();
