import { addProject, getProjects } from "./todo-list"
import Project from "./project"
import Todo from "./todo"

function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(getProjects()))
  localStorage.setItem("timedProjects", JSON.stringify(getProjects("timed")))
}

function loadFromLocalStorage() {
  const savedProjects = JSON.parse(localStorage.getItem("projects"))
  const savedTimedProjects = JSON.parse(localStorage.getItem("timedProjects"))

  if (savedTimedProjects) {
    savedTimedProjects.forEach((proj) => {
      let project = getProjects("timed").find(
        (projCheck) => proj.id === projCheck.id
      )
      if (!project) {
        project = new Project(proj.name, proj.isTimed, proj.id)
        addProject(project, true)
      }
    })
  }
  if (savedProjects) {
    savedProjects.forEach(({ name, isTimed, id, todos }) => {
      let project = getProjects().find((proj) => id === proj.id)
      if (!project) {
        project = new Project(name, isTimed, id)
        addProject(project)
      }
      todos.forEach(
        ({
          projectTitle,
          title,
          description,
          dueDate,
          priority,
          id,
          status,
        }) => {
          const todo = new Todo(
            projectTitle,
            title,
            description,
            dueDate,
            priority,
            id,
            status
          )
          project.addTodo(todo)
        }
      )
    })
  }
}

export { saveToLocalStorage, loadFromLocalStorage }
