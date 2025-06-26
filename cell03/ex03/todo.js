window.onload = function() {
    loadTodos();
}

function newTodo() {
    let text = prompt("Enter new TO DO :")
    if (text && text.trim() !== "") {
        addTodo(text.trim());
        saveTodos();
    }
}

function addTodo(text) {
    let ftlist = document.getElementById('ft_list');
    let newDiv = document.createElement('div');
    newDiv.className = 'todo_item' ;
    newDiv.innerText = text;

    newDiv.addEventListener('click', function() {
        if (confirm("Do you want to delete this TO DO?")) {
            ftlist.removeChild(newDiv);
            saveTodos();
        }
    });

    ftlist.insertBefore(newDiv,ftlist.firstChild);

}

function saveTodos() {
    let todos = [];
    let todoItems = document.querySelectorAll('.todo_item')
        todoItems.forEach(item => {
        todos.push(item.innerText);
    });
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
    let cookies = document.cookie.split(';');
    let todoData = cookies.find(row => row.trim().startsWith('todos='));
    if (todoData) {
        let todos = JSON.parse(decodeURIComponent(todoData.split('=')[1]));
        todos.forEach(todo => {
            addTodo(todo);
        });
    }
}