import { getProjects } from "./todo-list";

function createMainPage({ name, todos }) {
	const main = document.createElement("div");
	main.classList.add("container");

	const mainHeader = document.createElement("div");
	mainHeader.classList.add("header");

	const titleEl = document.createElement("h2");
	titleEl.id = "project-name";
	titleEl.textContent = name;

	const taskCount = todos.length;
	const taskCountEl = document.createElement("p");
	taskCountEl.textContent = `${taskCount} ${taskCount === 1 ? "task" : "tasks"}`;

	const headerText = document.createElement("div");
	headerText.append(titleEl, taskCountEl);

	const addTodoBtn = document.createElement("button");
	addTodoBtn.classList.add("button", "header__button");
	addTodoBtn.textContent = "+";
	addTodoBtn.id = "add-btn";

	mainHeader.append(headerText, addTodoBtn);

	const deleteProjectBtn = document.createElement("button");
	deleteProjectBtn.classList.add("button");
	deleteProjectBtn.textContent = "Delete Project";
	deleteProjectBtn.id = "delete-project";

	const todosDiv = document.createElement("div");
	todosDiv.classList.add("todos");

	for (let i = 0; i < todos.length; i++) {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		todoDiv.dataset.index = i;
		const todoTitle = document.createElement("h3");
		todoTitle.textContent = todos[i].title;
		todoTitle.classList.add("todo__title");

		const todoDueDate = document.createElement("p");
		todoDueDate.textContent = todos[i].dueDate;
		todoDueDate.classList.add("todo__body");

		const todoPriority = document.createElement("select");

		const priorityOptions = ["Low", "Medium", "High"];
		for (const option of priorityOptions) {
			const optionEl = document.createElement("option");
			optionEl.value = option;
			optionEl.textContent = option;

			if (todos[i].priority === option) {
				optionEl.selected = true;
			}
			todoPriority.appendChild(optionEl);
		}

		const deleteBtn = document.createElement("button");
		deleteBtn.id = "delete-btn";
		deleteBtn.classList.add("button", "button--red");
		deleteBtn.textContent = "Delete";

		todoDiv.append(todoTitle, todoDueDate, todoPriority, deleteBtn);
		todosDiv.appendChild(todoDiv);
	}

	main.append(mainHeader, deleteProjectBtn, todosDiv);

	return main;
}

function loadMainPage(tab) {
	const projects = getProjects();
	const mainDiv = document.querySelector("#main");
	mainDiv.textContent = "";

	if (!projects.length) return;

	if (!tab) {
		mainDiv.appendChild(createMainPage(projects[0]));
		return;
	}

	for (const proj of projects) {
		if (tab === proj.name) {
			mainDiv.appendChild(createMainPage(proj));
		}
	}
}

export { loadMainPage };
