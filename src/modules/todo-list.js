import createProject from "./project"

const timedProjects = []
const projects = []
const getProjects = (arg) => (arg === "timed" ? timedProjects : projects)

let currProject = null
const getCurrentProject = () => currProject
const setCurrentProject = (project) => {
  currProject = project
}

const addProject = (name, store = projects) => {
  const project = createProject(name)
  store.push(project)
  return project
}

const deleteProject = (id) => {
  const projectIndex = projects.findIndex((project) => id === project.id)
  projects.splice(projectIndex, 1)
}

const getProject = (id, arg) => {
  if (arg === "timed") {
    return timedProjects.find((project) => id === project.id)
  }

  return projects.find((project) => id === project.id)
}

addProject("Today", timedProjects).id = 1
addProject("This Week", timedProjects).id = 2
addProject("Default")

export {
  getProjects,
  addProject,
  deleteProject,
  getProject,
  getCurrentProject,
  setCurrentProject,
}
