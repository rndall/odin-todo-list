import createProject from "./project"

const projects = []
const getProjects = () => projects

let currProject = null
const getCurrentProject = () => currProject
const setCurrentProject = (project) => {
  currProject = project
}

const addProject = (name) => {
  const project = createProject(name)
  projects.push(project)
  return project
}

const deleteProject = (id) => {
  const projectIndex = projects.findIndex((project) => id === project.id)
  projects.splice(projectIndex, 1)
}

const getProject = (id) => projects.find((project) => id === project.id)

addProject("Default")

export {
  getProjects,
  addProject,
  deleteProject,
  getProject,
  getCurrentProject,
  setCurrentProject,
}
