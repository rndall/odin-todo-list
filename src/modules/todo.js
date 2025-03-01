export default function createTodo(title, description, dueDate, priority) {
  let currPriority = priority
  const getPriority = () => currPriority
  const setPriority = (newPriority) => {
    currPriority = newPriority
  }

  let status = false
  const getStatus = () => status
  const toggleStatus = () => {
    status = !status
  }

  return {
    id: Date.now(),
    title,
    description,
    dueDate,
    getStatus,
    toggleStatus,
    getPriority,
    setPriority,
  }
}
