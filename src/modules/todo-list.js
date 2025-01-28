import { createProject } from "./project";

const projects = [];
const getProjects = () => projects;

const addProject = (name, todos) => {
	const project = createProject(name, todos);
	projects.push(project);
};

addProject("Default");

export { getProjects };
