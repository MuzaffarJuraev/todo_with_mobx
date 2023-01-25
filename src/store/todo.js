import axios from "axios";
import { makeAutoObservable } from "mobx";

class Todos {
  todos = [];
  editingTodo = {};

  constructor() {
    makeAutoObservable(this);
  }

  setTodos(todos) {
    this.todos = todos;
  }

  setTodo(todo) {
    this.todos.push(todo);
  }

  async getTodos() {
    const result = axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/todos",
      params: {
        _limit: 10,
      },
    }).then((resp) => this.setTodos(resp.data));
  }

  toggleTodo(todoId) {
    this.todos = this.todos.map((value) =>
      value.id === todoId ? { ...value, completed: !value.completed } : value
    );
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  editTodo(todo) {
    this.editingTodo = todo;
  }

  saveTodo(todo) {
    this.todos = this.todos.map((value) =>
      value.id === todo.id ? todo : value
    );
    this.editingTodo = {};
  }
}

export const TodosStore = new Todos();
