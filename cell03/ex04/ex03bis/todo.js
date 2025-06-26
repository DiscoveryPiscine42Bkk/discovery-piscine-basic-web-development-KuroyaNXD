$(function () {
  const saveTodos = () => {
    const todos = $('.todo_item').map((_, el) => $(el).text()).get();
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
  };

  const addTodo = text => {
    const $item = $('<div class="todo_item"></div>').text(text).click(function () {
      if (confirm("Do you want to delete this TO DO?")) {
        $(this).remove();
        saveTodos();
      }
    });
    $('#ft_list').prepend($item);
  };

  $('#newTodo').click(() => {
    const text = prompt("Enter new TO DO :");
    if (text && text.trim()) {
      addTodo(text.trim());
      saveTodos();
    }
  });

  const cookie = document.cookie.split(';').find(c => c.trim().startsWith('todos='));
  if (cookie) {
    JSON.parse(decodeURIComponent(cookie.split('=')[1])).forEach(addTodo);
  }
});
n