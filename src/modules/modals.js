import { addProject } from "./todo-list"
import { updateProjectsNavList } from "./sidebar"
import { updateMainPage } from "./main-page"

const newProjectDialog = document.querySelector("#new-project")
const closeNewProjectBtn = document.querySelector("#project-close")
const newProjectForm = document.querySelector("#project-form")
const newProjectInput = document.querySelector("#project_name")

function showNewProjectModal() {
  newProjectDialog.showModal()
}

closeNewProjectBtn.addEventListener("click", () => newProjectDialog.close())

newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const inputVal = newProjectInput.value.trim()
  if (!inputVal) return

  const project = addProject(inputVal)
  newProjectInput.value = ""
  newProjectDialog.close()
  updateProjectsNavList()
  updateMainPage(project.id)
})

export { showNewProjectModal }
