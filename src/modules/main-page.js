import { getProjects, getProject, setCurrentProject } from "./todo-list"
import { showNewTodoModal, editTodoModal } from "./modals"

const main = document.querySelector(".main")

function createMainPage(projectId, isTimed) {
  let project

  if (!projectId) {
    project = getProjects().length ? getProjects()[0] : getProjects("timed")[0]
  } else {
    project = isTimed ? getProject(projectId, "timed") : getProject(projectId)
  }
  setCurrentProject(project)

  const container = document.createElement("div")
  container.innerHTML = `
    <div class="main__header">
      <div>
        <h2>${project.name}</h2>
        <p>${project.getTodos().length} ${
    project.getTodos().length === 1 ? "todo" : "todos"
  }</p>
      </div>

      ${
        !isTimed ? '<button class="button" id="add-todo">Add Todo</button>' : ""
      }
    </div>
  `

  container.addEventListener("click", (e) => {
    if (e.target.matches("#add-todo")) {
      showNewTodoModal()
    }
  })

  const todoList = document.createElement("div")
  todoList.classList.add("todo-list")

  project.getTodos().forEach((todo) => {
    const todoItem = document.createElement("div")
    todoItem.classList.add(
      "todo-list__item",
      `todo-list__item--priority-${todo.getPriority().toLowerCase()}`
    )
    todoItem.dataset.id = todo.id

    const todoContent = document.createElement("div")
    todoContent.classList.add("todo-list__content")

    const todoStatus = document.createElement("input")
    todoStatus.type = "checkbox"
    todoStatus.classList.add("todo-list__status")
    todoStatus.checked = todo.getStatus()

    const textContainer = document.createElement("div")
    const titleElement = document.createElement("h3")
    titleElement.classList.add("todo-list__title")
    titleElement.textContent = todo.getTitle()

    const dueDateElement = document.createElement("p")
    dueDateElement.classList.add("todo-list__due")
    dueDateElement.textContent = todo.getDueDate()

    textContainer.append(titleElement, dueDateElement)

    const moreTodoDetails = document.createElement("div")
    moreTodoDetails.classList.add("todo-list__details")
    const todoDesc = document.createElement("p")
    todoDesc.classList.add("todo-list__desc")
    todoDesc.textContent = todo.getDescription()
    const todoPrio = document.createElement("p")
    todoPrio.textContent = `${todo.getPriority()} Priority`
    moreTodoDetails.append(todoDesc, todoPrio)

    todoContent.append(todoStatus, textContainer)

    const buttonsContainer = document.createElement("div")
    buttonsContainer.classList.add("todo-list__buttons")

    const editButton = document.createElement("button")
    editButton.classList.add("todo-list__edit", "button")
    editButton.textContent = "Edit"

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("todo-list__del", "button")
    deleteButton.textContent = "x"

    buttonsContainer.append(editButton, deleteButton)
    todoItem.append(todoContent, moreTodoDetails, buttonsContainer)
    todoList.appendChild(todoItem)
  })

  todoList.addEventListener("click", (e) => {
    const todoId = +e.target.parentElement.parentElement.dataset.id

    if (e.target.matches(".todo-list__status")) {
      const todo = project.getTodo(todoId)
      todo.setStatus(e.target.checked)
    } else if (e.target.matches(".todo-list__del")) {
      if (isTimed) {
        getProjects().forEach((project) => {
          const todo = project.getTodos().find((todo) => todoId === todo.id)
          if (todo) {
            project.removeTodo(todoId)
          }
        })
      } else {
        project.removeTodo(todoId)
      }
      updateMainPage(project.id, isTimed)
    } else if (e.target.matches(".todo-list__edit")) {
      editTodoModal(todoId)
    }
  })

  container.appendChild(todoList)
  return container
}

function updateMainPage(projectId, isTimed = false) {
  const mainPage = createMainPage(projectId, isTimed)
  main.innerHTML = ""

  if (!mainPage) return
  main.appendChild(mainPage)
}

export { updateMainPage }
