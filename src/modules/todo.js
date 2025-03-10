import { mapTimedProjects } from "./todo-list"

export default class Todo {
  constructor(title, description, dueDate, priority, status = false) {
    this.id = Date.now()
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.status = status
  }

  edit(title, description, dueDate, priority) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    mapTimedProjects()
  }
}
