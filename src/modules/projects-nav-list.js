import { getProjects, deleteProject } from "./todo-list"

function createProjectsNavList() {
  const projects = getProjects()

  const ul = document.createElement("ul")
  ul.classList.add("list")
  ul.addEventListener("click", (e) => {
    if (e.target.matches(".nav__button--project")) {
      // Project switching logic
    } else if (e.target.matches(".nav__button--delete")) {
      deleteProject(+e.target.parentElement.dataset.id)
      updateProjectsNavList()
    }
  })

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
