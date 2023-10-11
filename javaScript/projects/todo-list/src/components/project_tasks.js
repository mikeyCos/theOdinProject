import projectController from "../containers/project_controller";
import buildButton from "../components/buttons";
import buildTasksForm from "../components/tasks_form";
import tasksList from "../components/tasks_list";

// renders a project's page and it's tasks
// when we are at a project's page
// we delete it from there or from the sidebar
// change content to home
export default function buildProjectTasks(uuid) {
  projectController.setActive(uuid);
  const project = projectController.find(uuid);
  projectTasks.project = project;
  const content = projectTasks.render();
  projectTasks.cacheDOM(content);
  projectTasks.bindEvents();
  return content;
}

export const projectTasks = {
  project: null,
  cacheDOM(container) {
    this.projectTasksContainer = container;
    this.ulList = this.projectTasksContainer.querySelector(".tasks_list");
    this.listContainer = this.ulList.firstChild;
    this.btnAddTask = this.ulList.querySelector(".btn_add_task");
  },
  bindEvents() {
    this.btnAddTask.addEventListener("click", buildTasksForm);
  },
  render() {
    const projectsContainer = document.createElement("div");
    const header = document.createElement("h1");
    const list = document.createElement("ul");
    const listItem = document.createElement("li");

    projectsContainer.classList.add("task");
    list.classList.add("tasks_list");
    header.textContent = this.project.title;

    projectsContainer.appendChild(header);
    listItem.appendChild(tasksList.init());
    listItem.appendChild(buildButton("add", "task", "Add task"));
    list.appendChild(listItem);

    projectsContainer.appendChild(list);
    return projectsContainer;
  },
};
