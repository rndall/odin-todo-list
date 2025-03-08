import { getProjects, deleteProject, mapTimedProjects } from "./todo-list"
import { updateMainPage } from "./main-page"
import { showNewProjectModal } from "./modals"

const addProjectBtn = document.querySelector("#add-project")
addProjectBtn.addEventListener("click", () => showNewProjectModal())

const aside = document.querySelector(".aside")
aside.addEventListener("click", (e) => {
  const projectId = +e.target.parentElement.dataset.id

  if (e.target.matches(".nav__button--time")) {
    updateMainPage(projectId, true)
  } else if (e.target.matches(".nav__button--project")) {
    updateMainPage(projectId)
  } else if (e.target.matches(".nav__button--delete")) {
    deleteProject(projectId)
    updateProjectsNavList()
    mapTimedProjects()
    updateMainPage()
  }
})

function createProjectsNavList() {
  const projects = getProjects()

  const ul = document.createElement("ul")
  ul.classList.add("list")

  projects.forEach((project) => {
    const li = document.createElement("li")
    li.classList.add("list__item")
    li.dataset.id = project.id
    li.innerHTML = `
      <button class="nav__button button nav__button--project">${project.name}</button>
      <button class="nav__button button nav__button--delete">x</button>
    `
    ul.appendChild(li)
  })

  return ul
}

function updateProjectsNavList() {
  const nav = document.querySelector(".nav")
  const sidebarNav = createProjectsNavList()
  nav.innerHTML = ""
  nav.appendChild(sidebarNav)
}

export { updateProjectsNavList }
