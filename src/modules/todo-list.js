import { saveToLocalStorage } from "./local-storage"
import { format } from "date-fns"

const timedProjects = []
const projects = []
const getProjects = (arg) => (arg === "timed" ? timedProjects : projects)

let currProject = null
const getCurrentProject = () => currProject
const setCurrentProject = (project) => {
  currProject = project
}

const addProject = (project, isTimed = false) => {
  if (isTimed) {
    timedProjects.push(project)
  } else {
    projects.push(project)
  }
  saveToLocalStorage()
}

const deleteProject = (id) => {
  const projectIndex = projects.findIndex((project) => id === project.id)
  projects.splice(projectIndex, 1)
  saveToLocalStorage()
}

const getProject = (id, arg) => {
  if (arg === "timed") {
    return timedProjects.find((project) => id === project.id)
  }

  return projects.find((project) => id === project.id)
}

const mapTimedProjects = () => {
  const todayProjs = []
  const weekProjs = []
  const today = new Date()

  const getDayDiff = (d1, d2) => {
    const timeDiff = d2.getTime() - d1.getTime()
    const dayDiff = Math.round(timeDiff / (1000 * 3600 * 24))
    return dayDiff
  }

  todayProjs.length = 0
  weekProjs.length = 0

  projects.forEach((project) => {
    todayProjs.push(
      ...project.todos.filter((todo) => {
        return format(today, "yyyy-MM-dd") === todo.dueDate
      })
    )
    weekProjs.push(
      ...project.todos.filter(
        (todo) => getDayDiff(today, new Date(todo.dueDate)) <= 7
      )
    )
  })
  timedProjects[0].todos = todayProjs
  timedProjects[1].todos = weekProjs
}

export {
  getProjects,
  addProject,
  deleteProject,
  getProject,
  getCurrentProject,
  setCurrentProject,
  mapTimedProjects,
}
