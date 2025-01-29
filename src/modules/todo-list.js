import { createProject } from "./project";

const projects = [];
const getProjects = () => projects;

const addProject = (name, todos) => {
	const project = createProject(name, todos);
	projects.push(project);
};

const deleteProject = (index) => projects.splice(index, 1);

addProject("Default");

export { getProjects, addProject, deleteProject };
