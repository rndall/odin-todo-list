import { mapTimedProjects } from "./todo-list"

export default function createTodo(title, description, dueDate, priority) {
  let currTitle = title
  const getTitle = () => currTitle

  let currDescription = description
  const getDescription = () => currDescription

  let currDue = dueDate
  const getDueDate = () => currDue

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

  const edit = (title, description, dueDate, priority) => {
    currTitle = title
    currDescription = description
    currDue = dueDate
    currPriority = priority
    mapTimedProjects()
  }

  return {
    id: Date.now(),
    getTitle,
    getDescription,
    getDueDate,
    getStatus,
    setStatus,
    getPriority,
    setPriority,
    edit,
  }
}
