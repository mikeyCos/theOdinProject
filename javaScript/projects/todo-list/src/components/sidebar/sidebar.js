import importAll from "../../utilities/import-all";
import buildButton from "../buttons";
import buildProjectForm from "../projects_form";
import projectController from "../../containers/project_controller";
import { buildList } from "../projects_list";
import pubSub from "../../containers/pubsub";
import "../../styles/sidebar.css";

export default function buildSidebar(content) {
  const sidebarWrapper = document.createElement("div");
  sidebarWrapper.id = "sidebar";

  if (window.innerWidth > 768) {
    sidebarWrapper.classList.add("show");
    sidebar.on = true;
  } else {
    sidebarWrapper.classList.add("hide");
  }

  sidebarWrapper.appendChild(sidebar.render());
  sidebar.cacheDOM(sidebarWrapper);
  touchController.init();
  sidebar.bindEvents();

  // published in header.js
  pubSub.subscribe("toggleSidebar", sidebar.toggleSidebar);
  // published in projects_list.js, projects_form.js, modal_remove.js
  pubSub.subscribe("hideSidebar", sidebar.hideSidebar);
  return sidebarWrapper;
}

const assets = {
  icons: importAll(require.context("../../assets/icons", false, /\.svg$/)),
};

const sidebar = {
  cacheDOM(container) {
    this.sidebar = container;
    this.sidebarWrapper = this.sidebar.querySelector(".sidebar_wrapper");
    this.projectsContainer = this.sidebar.querySelector("#projects_container");
    this.anchorProjects = this.projectsContainer.querySelector(".nav_projects");
    this.btnAddProject = container.querySelector(".btn_add_project");
  },
  bindEvents() {
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
    this.publish = this.publish.bind(this);
    this.callDimOverlay = this.callDimOverlay.bind(this);
    this.btnAddProject.addEventListener("click", buildProjectForm);
    this.anchorProjects.addEventListener("click", this.publish, {
      capture: true,
    });
    this.sidebar.addEventListener("click", this.toggleSidebar);
    window.addEventListener("resize", this.callDimOverlay);
    document.body.addEventListener(
      "touchstart",
      touchController.setTouchStart,
      false
    );
    document.body.addEventListener(
      "touchend",
      touchController.setTouchEnd,
      false
    );
  },
  render() {
    const sidebarContainer = document.createElement("div");

    projectController.setMiscProjects();
    const navMisc = document.createElement("div");
    buildList.add("misc", navMisc, projectController.misc);
    buildList.find(`misc`).init();

    const projectsContainer = document.createElement("div");
    const anchorWrapper = document.createElement("div");
    const projectsAnchor = document.createElement("a");

    sidebarContainer.classList.add("container");
    projectsContainer.id = "projects_container";
    navMisc.classList.add("projects_misc_container");

    projectsAnchor.textContent = "Projects";
    projectsAnchor.href = "#projects";
    projectsAnchor.classList.add("nav_projects");

    anchorWrapper.appendChild(projectsAnchor);
    anchorWrapper.appendChild(buildButton("add", "project"));
    projectsContainer.appendChild(anchorWrapper);

    buildList.add("sidebar", projectsContainer, projectController.projects);
    buildList.find(`sidebar`).init();

    sidebarContainer.appendChild(navMisc);
    sidebarContainer.appendChild(projectsContainer);
    return sidebarContainer;
  },
  toggleSidebar(e) {
    if (e instanceof MouseEvent) {
      if (e.target === this.sidebar) {
        this.toggleSidebar();
      }
    } else {
      if (this.sidebar.classList.contains("show")) {
        this.hideSidebar();
      } else {
        this.showSidebar();
      }
    }
  },
  hideSidebar() {
    if (this.sidebar.classList.contains("show")) {
      this.sidebar.classList.remove("show");
      this.sidebar.classList.add("hide");
      this.callDimOverlay();
      pubSub.publish("animate_nav");
    }
  },
  showSidebar() {
    if (!this.sidebar.classList.contains("show")) {
      this.sidebar.classList.remove("hide");
      this.sidebar.classList.add("show");
      this.callDimOverlay();
      pubSub.publish("animate_nav");
    }
  },
  publish(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    // when sidebar projects anchor is clicked
    // change content to projects
    // if window width is < 768px
    //sidebar will close
    if (window.innerWidth < 768) {
      this.hideSidebar();
    }
    pubSub.publish("content", e.currentTarget);
  },
  callDimOverlay: function () {
    pubSub.publish("dim", this.sidebar);
  },
};

const touchController = {
  touchStartX: null,
  touchEndX: null,
  touchStartY: null,
  touchEndY: null,
  init() {
    this.swipe = this.swipe.bind(this);
    this.setTouchStart = this.setTouchStart.bind(this);
    this.setTouchEnd = this.setTouchEnd.bind(this);
  },
  setTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  },
  setTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.touchEndY = e.changedTouches[0].screenY;
    this.swipe();
  },
  swipe() {
    if (this.touchEndX < this.touchStartX) {
      // swipe left
      sidebar.hideSidebar();
    }

    if (this.touchEndX > this.touchStartX) {
      // swipe right
      sidebar.showSidebar();
    }

    if (this.touchEndY < this.touchStartY) {
      // swipe up
    }

    if (this.touchEndY > this.touchStartY) {
      // swipe down
    }
  },
};
