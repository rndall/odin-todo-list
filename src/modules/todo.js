import { saveToLocalStorage } from "./local-storage"
import { mapTimedProjects } from "./todo-list"

export default class Todo {
  constructor(
    projectTitle,
    title,
    description,
    dueDate,
    priority,
    id = Date.now(),
    status = false
  ) {
    this.id = id
    this.projectTitle = projectTitle
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.status = status
  }

  setStatus(value) {
    this.status = value
    saveToLocalStorage()
  }

  edit(title, description, dueDate, priority) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    mapTimedProjects()
    saveToLocalStorage()
  }
}
