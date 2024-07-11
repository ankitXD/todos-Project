const form = document.getElementById('form');
const input = document.getElementById('input');
const todoUl = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoElem = document.createElement('li');
        if (todo && todo.completed) {
            todoElem.classList.add('completed');
        }
        todoElem.innerText = todoText;

        todoElem.addEventListener('click', () => {
            todoElem.classList.toggle('completed');
            update();
        });

        todoElem.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoElem.remove();
            update();
        });

        todoUl.appendChild(todoElem);
        input.value = '';
        update();
    }
}

function update() {
    const todoElems = document.querySelectorAll('li');
    const todos = [];

    todoElems.forEach(todoElem => {
        todos.push({
            text: todoElem.innerText,
            completed: todoElem.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}
