import { loadMainPage } from "./main-page";
import { loadSidebarNav } from "./sidebar-nav";
import {
	addProject,
	deleteProject,
	getProject,
	getProjects,
} from "./todo-list";

function updateScreen() {
	loadSidebarNav();
	loadMainPage();

	// Change project
	const nav = document.querySelector(".nav");
	nav.addEventListener("click", (e) => {
		if (e.target.matches(".nav__button")) {
			const index = +e.target.dataset.project;
			loadMainPage(index);
		}
	});

	// Add project
	const newProjectForm = document.querySelector("#project-form");
	const newProjectBtn = document.querySelector("#new-project-btn");
	const closeNewProjectBtn = document.querySelector("#project-close");
	const newProjectDialog = document.querySelector("#new-project");
	newProjectForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const newProjectInput = document.querySelector("#project_name");
		const inputVal = newProjectInput.value.trim();
		if (inputVal) {
			addProject(inputVal);
			newProjectInput.value = "";
			newProjectDialog.close();
			loadSidebarNav();
			loadMainPage(getProjects().length - 1);
		}
	});
	newProjectBtn.addEventListener("click", () => newProjectDialog.showModal());
	closeNewProjectBtn.addEventListener("click", () => newProjectDialog.close());

	const main = document.querySelector("#main");
	main.addEventListener("click", (e) => {
		const projectIndex = e.target.dataset.project;

		// Delete project
		if (e.target.matches("#delete-project")) {
			deleteProject(projectIndex);
			loadSidebarNav();
			loadMainPage();
		}

		// Add todo
		if (e.target.matches("#add-btn")) {
			const newTodoForm = document.querySelector("#todo-form");
			const closeNewTodoBtn = document.querySelector("#todo-close");
			const newTodoDialog = document.querySelector("#new-todo");
			newTodoDialog.showModal();

			newTodoForm.addEventListener("submit", (e) => {
				e.preventDefault();

				const todoTitle = document.querySelector("#title");
				const todoDesc = document.querySelector("#description");
				const todoDueDate = document.querySelector("#due_date");
				const todoPriority = document.querySelector("#priority");

				const project = getProject(projectIndex);
				project.addTodo(
					todoTitle.value.trim(),
					todoDesc.value.trim(),
					todoDueDate.value,
					todoPriority.value,
				);

				todoTitle.value = "";
				todoDesc.value = "";
				todoDueDate.value = "";
				todoPriority.selectedIndex = 0;

				loadMainPage(projectIndex);
				newTodoDialog.close();
			});
			closeNewTodoBtn.addEventListener("click", () => newTodoDialog.close());
		}
	});
}

export { updateScreen };
