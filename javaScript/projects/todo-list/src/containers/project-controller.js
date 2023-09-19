import { pubSub } from './pubsub';
import { populateStorage } from '../storage/storage';

const getFormValues = (inputs) => {
    // tasks is empty with local storage
    const obj = {}
    inputs.forEach(input => { 
        if (input.id === 'priority') {
            obj[input.id] = parseInt(input.value.slice(input.value.length - 1, input.value.length));
        } else if (input.value.length !== 0) {
            obj[input.id] = input.value
        }
    });
    console.log(obj)
    return obj;
}

const buildProject = (tasks) => {
    let state = {
        tasks,
        uuid: crypto.randomUUID(),
    }

    return Object.assign(
        {},
        project(state),
    )
}

// creates a project object
    // tasks property created upon object creation
const project = (state) => ({
    type: 'project',
    active: false, // there can only be one project active
    uuid: state.uuid,
    tasks: state.tasks || [],
    addTask: function(inputs) {
        // need to allow user to pick what project to assign the newly/edited task
            // pushes task to respective project
        const formValues = getFormValues(inputs);
        const newTask = Object.assign(task(this.uuid), formValues);

        if (formValues.project && formValues.project !== newTask.uuidProj) {
            console.log(`new uuid proj: ${formValues.project}`);
            console.log(`old uuid proj: ${newTask.uuidProj}`);
            newTask.uuidProj = formValues.project;
            projectController.find(formValues.project).tasks.push(newTask);
        } else {
            this.tasks.push(newTask);
            pubSub.publish('addTask', newTask);
        }
        populateStorage();
    },
    removeTask: function(uuid) {
        const task = this.findTask(uuid);
        this.tasks.splice(this.tasks.indexOf(task), 1);
        populateStorage();
    },
    updateTask: function(uuid, inputs) {
        console.log(`updateTask() from project-controller.js is running`); // for debugging
        const formValues = getFormValues(inputs);
        const newTask = Object.assign(this.findTask(uuid), formValues);

        if (formValues.project && formValues.project !== newTask.uuidProj) {
            this.removeTask(newTask.uuidTask);
            newTask.uuidProj = formValues.project;
            projectController.find(formValues.project).tasks.push(newTask);
            pubSub.publish('removeTask');
        } else {
            pubSub.publish('updateTask', newTask);
        }
        populateStorage();
    },
    findTask: function(uuid) {
        return this.tasks.find(element => element.uuidTask === uuid);
    },
})


export const projectController = {
    inbox: [Object.assign(buildProject(), {title: 'Inbox',})], // will hold tasks assigned to the 'inbox'
    projects: null,
    allProjects: [],
    addProject: function(inputs) {
        const formValues = getFormValues(inputs);
        this.projects.push(Object.assign(buildProject(), formValues));
        this.setAllProjects()
        populateStorage();
    },
    remove: function(uuid) {
        this.projects.splice(this.projects.indexOf(this.find(uuid)), 1);
        this.setAllProjects();
        populateStorage();
    },
    find: function(uuid) {
        // return this.projects.find(project => project.uuid === uuid);
        return this.allProjects.find(project => project.uuid === uuid);
    },
    setActive: function(uuid) {
        console.log(`setActive() is running from project-controller.js`) // for debugging
        if (this.findActive()) {
            this.findActive().active = false;
        }
        this.find(uuid).active = true;
    },
    findActive: function() {
        // return this.projects.find(project => project.active === true);
        if (!this.allProjects.find(project => project.active === true)) {
            this.inbox.active = true;
            return this.inbox;
        } else {
            return this.allProjects.find(project => project.active === true);
        }
        // return this.allProjects.find(project => project.active === true) ? this.allProjects.find(project => project.active === true) : this.inbox ;
    },
    setAllProjects: function() {
        this.allProjects = this.inbox.concat(this.projects);
    },
    sort: function() {
        // this.allProjects.forEach()
    },
    init: function() {
        this.projects.forEach(obj => {
            Object.assign(obj, buildProject(obj.tasks));
        });
        Object.assign(this.inbox[0], buildProject(this.inbox[0].tasks));
    }
}


const task = (uuid) => {
    const type = 'task';
    const uuidTask = crypto.randomUUID();
    const uuidProj = uuid;
    return { uuidTask, uuidProj, type };
}

// projectController.addProject([{id: 'title', value: 'test1'}]);
// projectController.addProject([{id: 'title', value: 'test2'}]);
// projectController.projects[0].addTask([{id: 'name', value: 'taskA'}, {id: 'description', value: 'pizza pizza'}, {id: 'priority', value: 'prirotiy 2'}]);
// projectController.projects[0].addTask([{id: 'name', value: 'taskB'}, {id: 'description', value: 'foo bar'}, {id: 'priority', value: 'priority 4'}]);
// projectController.projects[1].addTask([{id: 'name', value: 'taskA'}, {id: 'description', value: 'Lorem ipsum'}, {id: 'due_date', value: '2024-03-04'}, {id: 'due_time', value: '11:20'}, {id: 'priority', value: 'priority 3'}]);