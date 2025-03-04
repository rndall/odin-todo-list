export default function createTodo(title, description, dueDate, priority) {
  let currPriority = priority
  const getPriority = () => currPriority
  const setPriority = (newPriority) => {
    currPriority = newPriority
  }

  let status = false
  const getStatus = () => status
  const setStatus = (newStatus) => {
    status = newStatus
  }

  return {
    id: Date.now(),
    title,
    description,
    dueDate,
    getStatus,
    setStatus,
    getPriority,
    setPriority,
  }
}
