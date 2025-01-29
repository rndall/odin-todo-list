import { loadMainPage } from "./main-page";
import { loadSidebarNav } from "./sidebar-nav";
import { addProject, deleteProject } from "./todo-list";

function updateScreen() {
	loadSidebarNav();
	loadMainPage("Default");

	const nav = document.querySelector(".nav");
	nav.addEventListener("click", (e) => {
		if (e.target.matches(".nav__button")) {
			const btnText = e.target.textContent;
			loadMainPage(btnText);
		}
	});

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
			loadMainPage(inputVal);
		}
	});
	newProjectBtn.addEventListener("click", () => newProjectDialog.showModal());
	closeNewProjectBtn.addEventListener("click", () => newProjectDialog.close());

	const main = document.querySelector("#main");
	main.addEventListener("click", (e) => {
		if (e.target.matches("#delete-project")) {
			const projectName = document.querySelector("#project-name");
			deleteProject(projectName.textContent);
			loadSidebarNav();
			loadMainPage();
		}
	});
}

export { updateScreen };
