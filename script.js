// Selecionando elementos do DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Carregar tarefas armazenadas no LocalStorage
document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);

// Função para adicionar tarefa
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, insira uma tarefa!');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Adicionar botão de deletar à tarefa
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', deleteTask);

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    // Salvar tarefas no LocalStorage
    saveTasks();

    // Limpar campo de input
    taskInput.value = '';
}

// Função para excluir tarefa
function deleteTask(event) {
    const taskItem = event.target.parentElement;
    taskItem.remove();
    saveTasks();
}

// Função para salvar tarefas no LocalStorage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.getElementsByTagName('li');
    
    for (let item of taskItems) {
        tasks.push(item.firstChild.textContent);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar tarefas no carregamento da página
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;

        // Adicionar botão de deletar à tarefa
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', deleteTask);

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}
