import { getProjects, getProject, setCurrentProject } from "./todo-list"
import { showNewTodoModal } from "./modals"

function createMainPage(projectId) {
  let project

  if (!projectId) {
    project = getProjects()[0]
  } else {
    project = getProject(projectId)
  }
  setCurrentProject(project)

  if (!project) return
  const container = document.createElement("div")
  container.innerHTML = `
    <div class="main__header">
      <div>
        <h2>${project.name}</h2>
        <p>${project.todos.length} ${
    project.todos.length === 1 ? "todo" : "todos"
  }</p>
      </div>

      <button class="button" id="add-todo">Add Todo</button>
    </div>
  `

  container.addEventListener("click", (e) => {
    if (e.target.matches("#add-todo")) {
      showNewTodoModal()
    }
  })

  const todoList = document.createElement("div")
  todoList.classList.add("todo-list")

  project.todos.forEach((todo) => {
    const todoItem = document.createElement("div")
    todoItem.classList.add(
      "todo-list__item",
      `todo-list__item--priority-${todo.getPriority().toLowerCase()}`
    )
    todoItem.dataset.id = todo.id
    todoItem.innerHTML = `
      <div class="todo-list__content">
        <input type="checkbox" class="todo-list__status">
        <div>
          <h3 class="todo-list__title">${todo.title}</h3>
          <p class="todo-list__due">${todo.dueDate}</p>
        </div>
      </div>

      <div class="todo-list__buttons">
        <button class="todo-list__edit button">Edit</button>
        <button class="todo-list__del button">x</button>
      </div>
    `
    todoList.appendChild(todoItem)
  })

  todoList.addEventListener("click", (e) => {
    const todoId = +e.target.parentElement.parentElement.dataset.id

    if (e.target.matches(".todo-list__status")) {
      const todo = project.getTodo(todoId)
      todo.setStatus(e.target.checked)
    } else if (e.target.matches(".todo-list__del")) {
      project.removeTodo(todoId)
      updateMainPage(project.id)
    }
  })

  container.appendChild(todoList)
  return container
}

function updateMainPage(projectId) {
  const main = document.querySelector(".main")
  const mainPage = createMainPage(projectId)
  main.innerHTML = ""

  if (!mainPage) return
  main.appendChild(mainPage)
}

export { updateMainPage }
