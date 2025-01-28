import { createMainPage } from "./main-page";
import { getProjects } from "./todo-list";

function loadTab(tab) {
	const mainDiv = document.querySelector("#main");
	const projects = getProjects();

	for (const proj of projects) {
		if (tab === proj.name) {
			mainDiv.textContent = "";
			mainDiv.append(createMainPage(proj));
		}
	}
}

function renderTodos() {
	const nav = document.querySelector(".nav");

	// Load default project on page load
	loadTab("Default");

	nav.addEventListener("click", (e) => {
		if (e.target.matches(".nav__button")) {
			const btnText = e.target.textContent;
			loadTab(btnText);
		}
	});
}

export { renderTodos };
