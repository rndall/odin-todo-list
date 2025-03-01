import createProject from "./project"

const projects = []
const getProjects = () => projects

const addProject = (name) => {
  const project = createProject(name)
  projects.push(project)
}

const deleteProject = (id) => {
  const projectIndex = projects.findIndex((project) => id === project.id)
  projects.splice(projectIndex, 1)
}

addProject("Default")

export { getProjects, addProject, deleteProject }
