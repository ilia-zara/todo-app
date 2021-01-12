import Todo from "./model/todo.js";

const apiRoot = "http://localhost:3000";

async function createTodo(todoText) {
  const todo = new Todo(todoText);

  const addResponse = await fetch(`${apiRoot}/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!addResponse.ok) {
    console.log(`Error with status ${addResponse.status}`);
    return;
  }

  console.log(`Ok with status ${addResponse.status}`);

  const addedTodo = await addResponse.json();

  return addedTodo.id;
}

export async function dataBase() {
  const newTodoId = createTodo("Todo 5");
}
