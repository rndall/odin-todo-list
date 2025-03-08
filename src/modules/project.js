import createTodo from "./todo"
import { mapTimedProjects } from "./todo-list"

export default function createProject(name) {
  let todos = []
  const getTodos = () => todos
  const setTodos = (newTodos) => {
    todos = newTodos
  }

  const addTodo = (title, description, dueDate, priority) => {
    const todo = todos.push(createTodo(title, description, dueDate, priority))
    mapTimedProjects()
    return todo
  }

  const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => id === todo.id)
    todos.splice(todoIndex, 1)
    mapTimedProjects()
  }

  const getTodo = (id) => todos.find((todo) => id === todo.id)

  return {
    id: Date.now(),
    name,
    getTodos,
    setTodos,
    addTodo,
    removeTodo,
    getTodo,
  }
}
