import { buildList } from "../components/projects_list";
import buildButton from "../components/buttons";
import buildProjectForm from "../components/projects_form";
import projectController from "../containers/project_controller";
import "../styles/projects.css";

export default function buildProjects() {
  projectController.setActive();
  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("projects");
  const header = document.createElement("h1");

  header.textContent = "Projects";

  projectsContainer.appendChild(header);
  projectsContainer.appendChild(projects.render());
  projects.cacheDOM(projectsContainer);
  projects.bindEvents();

  return projectsContainer;
}

const projects = {
  cacheDOM(container) {
    this.btnAddProject = container.querySelector(".btn_add_project");
  },
  bindEvents() {
    this.btnAddProject.addEventListener("click", buildProjectForm);
  },
  render() {
    const parentContainer = document.createElement("div");
    const anchorWrapper = document.createElement("div");
    anchorWrapper.classList.add("nav_projects");

    anchorWrapper.appendChild(buildButton("add", "project", "Add project"));
    parentContainer.appendChild(anchorWrapper);

    buildList.add("content", parentContainer, projectController.projects);
    buildList.find("content").clearCache();
    buildList.find("content").init();
    return parentContainer;
  },
};
