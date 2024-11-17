document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setInterval(changeBackgroundColor, 10000); // Change background color every 10 seconds
});

function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;
    const taskMessage = document.getElementById('taskMessage').value.trim();
    const taskPriority = document.getElementById('taskPriority').value;

    if (taskInput === '') return;

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    const dateTime = taskDate && taskTime ? `${taskDate} ${taskTime}` : 'No deadline';

    li.innerHTML = `
        <span>${taskInput}</span>
        <div class="task-info">Due: ${dateTime}</div>
        <div class="task-info">Priority: ${capitalizeFirstLetter(taskPriority)}</div>
        <div class="task-info">Message: ${taskMessage || 'No message'}</div>
        <div>
            <button class="complete" onclick="toggleComplete(this)">Complete</button>
            <button class="remove" onclick="removeTask(this)">Remove</button>
        </div>
    `;

    li.classList.add(`priority-${taskPriority}`);
    taskList.appendChild(li);
    clearInputs();
    saveTasks();
}

function removeTask(button) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(button.parentElement.parentElement);
    saveTasks();
}

function toggleComplete(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
    saveTasks();
}

function clearInputs() {
    document.getElementById('taskInput').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskTime').value = '';
    document.getElementById('taskMessage').value = '';
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById('taskList');
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').innerText,
            date: li.querySelector('.task-info').innerText.split('Due: ')[1] || '',
            priority: li.className.split('priority-')[1] || 'low',
            message: li.querySelector('.task-info').innerText.split('Message: ')[1] || '',
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `priority-${task.priority} ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-info">Due: ${task.date || 'No deadline'}</div>
            <div class="task-info">Priority: ${capitalizeFirstLetter(task.priority)}</div>
            <div class="task-info">Message: ${task.message || 'No message'}</div>
            <div>
                <button class="complete" onclick="toggleComplete(this)">Complete</button>
                <button class="remove" onclick="removeTask(this)">Remove</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function changeBackgroundColor() {
    const colors = ['#f4f4f9', '#e3f2fd', '#e8f5e9', '#fce4ec', '#fff3e0'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}
