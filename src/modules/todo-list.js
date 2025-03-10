import Project from "./project"
import { format } from "date-fns"

const timedProjects = []
const projects = []
const getProjects = (arg) => (arg === "timed" ? timedProjects : projects)

let currProject = null
const getCurrentProject = () => currProject
const setCurrentProject = (project) => {
  currProject = project
}

const addProject = (project, store = projects) => {
  store.push(project)
}

const deleteProject = (id) => {
  const projectIndex = projects.findIndex((project) => id === project.id)
  projects.splice(projectIndex, 1)
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
  todayProjects.todos = todayProjs
  thisWeekProjects.todos = weekProjs
}

const todayProjects = new Project("Today", true)
todayProjects.id = 1
addProject(todayProjects, timedProjects)

const thisWeekProjects = new Project("This Week", true)
thisWeekProjects.id = 2
addProject(thisWeekProjects, timedProjects)

addProject(new Project("Default"))

export {
  getProjects,
  addProject,
  deleteProject,
  getProject,
  getCurrentProject,
  setCurrentProject,
  mapTimedProjects,
}
