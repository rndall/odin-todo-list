export default function createTodo(title, description, dueDate, priority) {
  return { id: Date.now(), title, description, dueDate, priority }
}
