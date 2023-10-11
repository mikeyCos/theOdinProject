import pubSub from './pubsub';
import { populateStorage } from '../storage/storage';

const getFormValues = (inputs) => {
  const obj = {};
  inputs.forEach((input) => {
    if (input.id === 'priority') {
      obj[input.id] = parseInt(input.value.slice(input.value.length - 1, input.value.length), 10);
    } else if (
      input.id === 'due_date' && input.value.length === 0 && [...inputs].find((item) => item.id === 'due_time').value.length !== 0
    ) {
      // if time has a value and date has no value
      // date set to today's date
      obj[input.id] = new Date().toISOString().split('T')[0];
    } else if (input.value.length !== 0) {
      obj[input.id] = input.value;
    }
  });
  return obj;
};

const buildProject = (tasks) => {
  const state = {
    tasks,
    uuid: crypto.randomUUID(),
  };

  return Object.assign({}, project(state));
};

const task = (uuid) => {
  const type = 'task';
  const uuidTask = crypto.randomUUID();
  const uuidProj = uuid;
  return { uuidTask, uuidProj, type };
};

// creates a project object
// tasks property created upon object creation
const project = (state) => ({
  type: 'project',
  active: false, // there can only be one project active
  uuid: state.uuid,
  tasks: state.tasks || [],
  addTask(inputs) {
    // need to allow user to pick what project to assign the newly/edited task
    // pushes task to respective project
    const formValues = getFormValues(inputs);
    const newTask = Object.assign(task(this.uuid), formValues);

    if (formValues.project && formValues.project !== newTask.uuidProj) {
      newTask.uuidProj = formValues.project;
      projectController.find(formValues.project).tasks.push(newTask);
      if (
        new Date(`${newTask.due_date}T00:00:00`).toDateString() ===
        new Date().toDateString()
      ) {
        pubSub.publish('addTask', newTask);
      }
    } else {
      this.tasks.push(newTask);
      pubSub.publish('addTask', newTask);
    }
    projectController.setAllProjects();
  },
  removeTask(uuid) {
    // if the remove task is in today
    // remove it from today AND it's respective project
    // if the task's date in today is edited
    // remove it from only today
    const task = this.findTask(uuid);
    this.tasks.splice(this.tasks.indexOf(task), 1);
    // removes task in respective project
    projectController.allProjects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.uuidTask === uuid) {
          project.tasks.splice(project.tasks.indexOf(task), 1);
        }
      });
    });
    projectController.setAllProjects();
  },
  updateTask(uuid, inputs) {
    const formValues = getFormValues(inputs);
    const newTask = Object.assign(this.findTask(uuid), formValues);
    // if the project is change for a task
    if (formValues.project && formValues.project !== newTask.uuidProj) {
      this.removeTask(newTask.uuidTask);
      newTask.uuidProj = formValues.project;
      projectController.find(formValues.project).tasks.push(newTask);
      pubSub.publish('removeTask');
      if (projectController.findActive().title === 'Today') {
        pubSub.publish('updateTask', newTask);
      }
    } else {
      if (projectController.findActive().title === 'Today') {
        if (new Date(`${newTask.due_date}T00:00:00`).toDateString() === new Date().toDateString()) {
          pubSub.publish('updateTask', newTask);
        } else {
          pubSub.publish('removeTask');
        }
      } else {
        pubSub.publish('updateTask', newTask);
      }
    }
    projectController.setAllProjects();
  },
  findTask(uuid) {
    return this.tasks.find((element) => element.uuidTask === uuid);
  },
});

const projectController = {
  misc: null,
  projects: null,
  inbox: [Object.assign(buildProject(), { title: 'Inbox' })], // will hold tasks assigned to the 'inbox'
  today: [Object.assign(buildProject(), { title: 'Today' })],
  allProjects: [],
  addProject(inputs) {
    const formValues = getFormValues(inputs);
    const newProject = buildProject();
    this.projects.push(Object.assign(newProject, formValues));
    this.setAllProjects();
    this.setActive(newProject.uuid);
  },
  remove(uuid) {
    if (uuid === projectController.findActive().uuid) {
      pubSub.publish('content', projectController.inbox[0].uuid);
    }
    this.projects.splice(this.projects.indexOf(this.find(uuid)), 1);
    this.setAllProjects();
  },
  find(uuid) {
    return this.allProjects.find((project) => project.uuid === uuid);
  },
  setActive(uuid) {
    if (this.findActive()) {
      this.findActive().active = false;
    }

    if (uuid) {
      this.find(uuid).active = true;
    } else if (!uuid && typeof uuid === 'boolean') {
      this.inbox.active = true;
    }
  },
  findActive() {
    if (!this.allProjects.find((project) => project.active === true)) {
      this.inbox[0].active = true;
      return this.inbox;
    } else {
      return this.allProjects.find((project) => project.active === true);
    }
  },
  setAllProjects() {
    this.allProjects = this.inbox.concat(this.projects, this.today);
    this.sort();
    populateStorage();
  },
  setMiscProjects() {
    this.misc = this.inbox.concat(this.today);
  },
  sort() {
    const today = new Date().toDateString();
    this.allProjects.forEach((project) => {
      if (project.tasks.length > 0 && project.title !== 'Today') {
        project.tasks.forEach((task) => {
          const taskDate = new Date(`${task.due_date}T00:00:00`).toDateString();
          if (!this.today[0].findTask(task.uuidTask) && taskDate === today) {
            this.today[0].tasks.push(task);
          }
        });
      }
    });
  },
  init() {
    this.projects.forEach((obj) => {
      Object.assign(obj, buildProject(obj.tasks));
      obj.tasks.forEach((task) => {
        task.uuidProj = obj.uuid;
      });
    });

    Object.assign(this.inbox[0], buildProject(this.inbox[0].tasks));
    this.inbox[0].tasks.forEach((task) => {
      task.uuidProj = this.inbox[0].uuid;
    });
    this.setAllProjects();
  },
};

export default projectController;
