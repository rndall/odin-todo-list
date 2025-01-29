import { getProjects } from "./todo-list";

function createSidebarNav() {
	const projects = getProjects();
	console.log(projects);
	const ul = document.createElement("ul");

	for (const [i, { name }] of projects.entries()) {
		const li = document.createElement("li");

		const button = document.createElement("button");
		button.classList.add("button", "nav__button");
		button.textContent = name;
		button.dataset.project = i;

		li.appendChild(button);
		ul.appendChild(li);
	}

	return ul;
}

function loadSidebarNav() {
	const nav = document.querySelector(".nav");
	nav.textContent = "";
	nav.appendChild(createSidebarNav());
}

export { loadSidebarNav };
