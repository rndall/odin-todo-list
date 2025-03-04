import { addProject, getCurrentProject } from "./todo-list"
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

const newTodoDialog = document.querySelector("#new-todo")
const closeNewTodoBtn = document.querySelector("#todo-close")
const newTodoForm = document.querySelector("#todo-form")

const todoTitle = document.querySelector("#title")
const todoDesc = document.querySelector("#description")
const todoDueDate = document.querySelector("#due_date")
const todoPriority = document.querySelector("#priority")

function showNewTodoModal() {
  newTodoDialog.showModal()
}

closeNewTodoBtn.addEventListener("click", () => newTodoDialog.close())

newTodoForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const project = getCurrentProject()
  project.addTodo(
    todoTitle.value.trim(),
    todoDesc.value.trim(),
    todoDueDate.value,
    todoPriority.value
  )

  todoTitle.value = ""
  todoDesc.value = ""
  todoDueDate.value = ""
  todoPriority.selectedIndex = 0

  updateMainPage(project.id)
  newTodoDialog.close()
})

export { showNewProjectModal, showNewTodoModal }
