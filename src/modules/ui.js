import { createMainPage } from "./main-page";
import { createSidebarNav } from "./sidebar-nav";
import { addProject, getProjects } from "./todo-list";

const projects = getProjects();

function loadSidebar() {
	const nav = document.querySelector(".nav");

	nav.textContent = "";
	nav.appendChild(createSidebarNav(projects));
}

function loadTab(tab) {
	const mainDiv = document.querySelector("#main");

	for (const proj of projects) {
		if (tab === proj.name) {
			mainDiv.textContent = "";
			mainDiv.append(createMainPage(proj));
		}
	}
}

function updateScreen() {
	const nav = document.querySelector(".nav");

	// Load sidebar nav on page load
	loadSidebar();

	// Load default project on page load
	loadTab("Default");

	nav.addEventListener("click", (e) => {
		if (e.target.matches(".nav__button")) {
			const btnText = e.target.textContent;
			loadTab(btnText);
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
			loadSidebar();
			loadTab(inputVal);
		}
	});
	newProjectBtn.addEventListener("click", () => newProjectDialog.showModal());
	closeNewProjectBtn.addEventListener("click", () => newProjectDialog.close());
}

export { updateScreen };
