function createSidebarNav(projects) {
	const ul = document.createElement("ul");

	for (const proj of projects) {
		const li = document.createElement("li");

		const button = document.createElement("button");
		button.classList.add("button", "nav__button");
		button.textContent = proj.name;

		li.appendChild(button);
		ul.appendChild(li);
	}

	return ul;
}

export { createSidebarNav };
