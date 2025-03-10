import { mapTimedProjects } from "./todo-list"

export default class Project {
  constructor(name, isTimed = false, todos = []) {
    this.id = Date.now()
    this.name = name
    this.isTimed = isTimed
    this.todos = todos
  }

  addTodo(todo) {
    this.todos.push(todo)
    mapTimedProjects()
  }

  removeTodo(todoId) {
    const todoIndex = this.todos.findIndex((todo) => todoId === todo.id)
    this.todos.splice(todoIndex, 1)
    mapTimedProjects()
  }

  getTodo(todoId) {
    return this.todos.find((todo) => todoId === todo.id)
  }
}
