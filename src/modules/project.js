import createTodo from "./todo"

export default function createProject(name) {
  const todos = []
  const getTodos = () => todos

  const addTodo = (title, description, dueDate, priority) =>
    todos.push(createTodo(title, description, dueDate, priority))

  const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => id === todo.id)
    todos.splice(todoIndex, 1)
  }

  const getTodo = (id) => todos.find((todo) => id === todo.id)

  return { id: Date.now(), name, getTodos, addTodo, removeTodo, getTodo }
}
