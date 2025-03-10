import { saveToLocalStorage } from "./local-storage"
import { mapTimedProjects } from "./todo-list"

export default class Project {
  constructor(name, isTimed = false, id = Date.now(), todos = []) {
    this.id = id
    this.name = name
    this.isTimed = isTimed
    this.todos = todos
  }

  addTodo(todo) {
    this.todos.push(todo)
    mapTimedProjects()
    saveToLocalStorage()
  }

  removeTodo(todoId) {
    const todoIndex = this.todos.findIndex((todo) => todoId === todo.id)
    this.todos.splice(todoIndex, 1)
    mapTimedProjects()
    saveToLocalStorage()
  }

  getTodo(todoId) {
    return this.todos.find((todo) => todoId === todo.id)
  }
}
