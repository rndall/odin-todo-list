import { addProject, getCurrentProject, getProjects } from "./todo-list"
import Project from "./project"
import Todo from "./todo"
import { updateProjectsNavList } from "./sidebar"
import { updateMainPage } from "./main-page"
import { format } from "date-fns"

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

  const project = new Project(inputVal)
  addProject(project)
  newProjectInput.value = ""
  newProjectDialog.close()
  updateProjectsNavList()
  updateMainPage(project.id)
})

const todoDialog = document.querySelector("#todo")
const closeNewTodoBtn = document.querySelector("#todo-close")
const todoForm = document.querySelector("#todo-form")

const todoTitle = document.querySelector("#title")
const todoDesc = document.querySelector("#description")
const todoDueDate = document.querySelector("#due_date")
const todoPriority = document.querySelector("#priority")

let todoToEdit = null

function showNewTodoModal() {
  todoToEdit = null
  todoDialog.showModal()
  todoDueDate.value = format(new Date(), "yyyy-MM-dd")
}

function editTodoModal(id) {
  todoId = id
  todoDialog.showModal()

  todoToEdit = getCurrentProject().getTodo(id)
  todoTitle.value = todoToEdit.title
  todoDesc.value = todoToEdit.description
  todoDueDate.value = todoToEdit.dueDate
  todoPriority.value = todoToEdit.priority
}

closeNewTodoBtn.addEventListener("click", () => {
  todoDialog.close()
})

let todoId

todoForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const currProject = getCurrentProject()
  let project = currProject
  if (currProject.isTimed) {
    getProjects().forEach((proj) => {
      const todo = proj.todos.find((todo) => todoId === todo.id)
      if (todo) {
        project = proj
      }
    })
  }

  if (todoToEdit) {
    todoToEdit.edit(
      todoTitle.value.trim(),
      todoDesc.value.trim(),
      todoDueDate.value,
      todoPriority.value
    )
  } else {
    project.addTodo(
      new Todo(
        todoTitle.value.trim(),
        todoDesc.value.trim(),
        todoDueDate.value,
        todoPriority.value
      )
    )
  }

  updateMainPage(currProject.id, currProject.isTimed)
  todoDialog.close()
})

todoDialog.addEventListener("close", () => {
  todoForm.reset()
})

export { showNewProjectModal, showNewTodoModal, editTodoModal }
