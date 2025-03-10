import "./assets/reset.css"
import "./assets/style.css"

import Project from "./modules/project"
import { addProject, getProjects } from "./modules/todo-list"
import { loadFromLocalStorage } from "./modules/local-storage"
import { updateProjectsNavList } from "./modules/sidebar"
import { updateMainPage } from "./modules/main-page"

loadFromLocalStorage()

if (!getProjects("timed").length) {
  const todayProjects = new Project("Today", true)
  todayProjects.id = 1
  addProject(todayProjects, true)

  const thisWeekProjects = new Project("This Week", true)
  thisWeekProjects.id = 2
  addProject(thisWeekProjects, true)
}

if (!getProjects().length) {
  addProject(new Project("Default"))
}

updateProjectsNavList()
updateMainPage()
