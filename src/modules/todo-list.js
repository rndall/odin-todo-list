import { createProject } from "./project";

const projects = [];
const getProjects = () => projects;

const addProject = (name, todos) => {
	const project = createProject(name, todos);
	projects.push(project);
};

const deleteProject = (index) => projects.splice(index, 1);

const getProject = (index) => projects[index];

addProject("Default");
addProject("test");
projects[0].addTodo("rsrsrarsars", "", "2025-01-23");
projects[1].addTodo("Test2", "desc", "2025-01-23");
projects[1].addTodo("Tst2", "desc", "2025-01-23");

export { getProjects, addProject, deleteProject, getProject };
