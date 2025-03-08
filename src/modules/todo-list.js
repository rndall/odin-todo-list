import createProject from "./project"
import { format } from "date-fns"

const timedProjects = []
const projects = []
const getProjects = (arg) => (arg === "timed" ? timedProjects : projects)

let currProject = null
const getCurrentProject = () => currProject
const setCurrentProject = (project) => {
  currProject = project
}

const addProject = (name, store = projects) => {
  const project = createProject(name)
  store.push(project)
  return project
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
      ...project.getTodos().filter((todo) => {
        return format(today, "yyyy-MM-dd") === todo.getDueDate()
      })
    )
    weekProjs.push(
      ...project
        .getTodos()
        .filter((todo) => getDayDiff(today, new Date(todo.getDueDate())) <= 7)
    )
  })
  todayProjects.setTodos(todayProjs)
  thisWeekProjects.setTodos(weekProjs)
}

const todayProjects = addProject("Today", timedProjects)
todayProjects.id = 1
todayProjects.isTimed = true
const thisWeekProjects = addProject("This Week", timedProjects)
thisWeekProjects.id = 2
thisWeekProjects.isTimed = true
addProject("Default")

export {
  getProjects,
  addProject,
  deleteProject,
  getProject,
  getCurrentProject,
  setCurrentProject,
  mapTimedProjects,
}
