import Todo from "./todo.js";

const apiRoot = "http://localhost:3000";

class TodoStorage {
  constructor() {
    this.storage = {};

    this.currentId = 0;
    this.todoCount = 0;
    this.postponeCount = 0;
    this.completeCount = 0;
    this.deleteCount = 0;
  }

  convertToTodo(todoDto) {
    const todo = new Todo(todoDto.text);
    todo.state = todoDto.state;
    todo.dateCreated = new Date(todoDto.dateCreated);
    todo.dateCompleted =
      todoDto.dateCompleted === null ? null : new Date(todoDto.dateCompleted);

    return todo;
  }

  createTodo(text) {
    const newTodo = new Todo(text);
    this.storage[this.currentId] = newTodo;
    this.currentId += 1;
    this.todoCount += 1;
  }

  totalTodoCount() {
    return this.todoCount;
  }

  totalPostponeCount() {
    return this.postponeCount;
  }
  totalCompleteCount() {
    return this.completeCount;
  }
  totalDeleteCount() {
    return this.deleteCount;
  }

  getTodoById(id) {
    const todo = this.storage[id];
    return {
      id,
      text: todo.text,
      state: todo.state,
      dateCreated: new Date(todo.dateCreated),
      dateCompleted:
        todo.dateCompleted !== null ? new Date(todo.dateCompleted) : null,
    };
  }

  postponeById(id) {
    const todo = this.storage[id];
    todo.postpone();
    this.postponeCount += 1;
  }

  resumeById(id) {
    const todo = this.storage[id];
    todo.resume();
    this.postponeCount -= 1;
  }

  completeById(id) {
    const todo = this.storage[id];
    todo.done();
    this.completeCount += 1;
  }

  deleteById(id) {
    delete this.storage[id];
    this.todoCount -= 1;
    this.deleteCount += 1;
  }

  async getAllTodo() {
    const returnAllTodo = await fetch(`${apiRoot}/todos/`);

    if (!returnAllTodo.ok) {
      console.log(`Error with status ${returnAllTodo.status}`);
      return;
    }

    console.log(`Ok with status ${returnAllTodo.status}`);
    const returnedDto = await returnAllTodo.json();

    return returnedDto.map((dto) => this.convertToTodo(dto));
  }
}

const todoStorage = new TodoStorage();

export default todoStorage;
