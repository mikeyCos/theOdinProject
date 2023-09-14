import { pubSub } from './pubsub';

const getFormValues = (inputs) => {
    const obj = {}
    inputs.forEach(input => { 
        if (input.id === 'priority') {
            obj[input.id] = parseInt(input.value.slice(input.value.length - 1, input.value.length));
        } else if (input.value.length !== 0) {
        // } else {
            // console.log(input.value)
            obj[input.id] = input.value
        }
    });
    console.log(obj)
    return obj;
}
// creates a project object
    // tasks property created upon object creation
const project = () => {
    let active = false; // there can only be one project active
    const uuid = crypto.randomUUID();
    const tasks = [];
    const addTask = (inputs) => {
        // need to allow user to pick what project to assign the newly/edited task
            // pushes task to respective project
        const formValues = getFormValues(inputs);
        const newTask = Object.assign(task(uuid), formValues);

        console.log(formValues.project)
        console.log(newTask.uuidProj)

        if (formValues.project && formValues.project !== newTask.uuidProj) {
            console.log(`new uuid proj: ${formValues.project}`);
            console.log(`old uuid proj: ${newTask.uuidProj}`);
            newTask.uuidProj = formValues.project;
            projectController.find(formValues.project).tasks.push(newTask);
        } else {
            tasks.push(newTask);
            pubSub.publish('addTask', newTask);
        }

        console.log(tasks); // for debugging
        console.log(projectController.projects);
    };
    const removeTask = (uuid) => {
        const task = findTask(uuid);
        tasks.splice(tasks.indexOf(task), 1);
    };
    const updateTask = (uuid, inputs) => {
        console.log(`updateTask() from project-controller.js is running`); // for debugging
        const formValues = getFormValues(inputs);
        const newTask = Object.assign(findTask(uuid), formValues);

        if (formValues.project && formValues.project !== newTask.uuidProj) {
            removeTask(newTask.uuidTask);
            newTask.uuidProj = formValues.project;
            projectController.find(formValues.project).tasks.push(newTask);
            pubSub.publish('removeTask');
        } else {
            pubSub.publish('updateTask', newTask);
        }
        
        console.log(tasks); // for debugging
        console.log(projectController.projects); // for debugging
    };
    const findTask = (uuid) => {
        return tasks.find(element => element.uuidTask === uuid);
    };
    return { tasks, uuid, active, addTask, removeTask, updateTask };
}


export const projectController = {
    inbox: [Object.assign(project(), {title: 'Inbox',})], // will hold tasks assigned to the 'inbox'
    projects: [],
    allProjects: [],
    addProject: function(inputs) {
        console.log(inputs) // for debugging
        const formValues = getFormValues(inputs);
        this.projects.push(Object.assign(project(), formValues));
        this.setAllProjects()
    },
    remove: function(uuid) {
        this.projects.splice(this.projects.indexOf(this.find(uuid)), 1);
        this.setAllProjects();
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
        console.table(this.projects); // for debugging
        console.table(this.allProjects);
    },
    findActive: function() {
        console.log(this.projects.find(project => project.active === true));
        // return this.projects.find(project => project.active === true);
        if (!this.allProjects.find(project => project.active === true)) {
            this.inbox[0].active = true;
            return this.inbox;
        } else {
            return this.allProjects.find(project => project.active === true);
        }
        // return this.allProjects.find(project => project.active === true) ? this.allProjects.find(project => project.active === true) : this.inbox ;
    },
    setAllProjects: function() {
        this.allProjects = this.inbox.concat(this.projects);
        console.table(this.allProjects)
    },
    sort: function() {
        // this.allProjects.forEach()
    },
}


const task = (uuid) => {
    const uuidTask = crypto.randomUUID();
    const uuidProj = uuid;
    return { uuidTask, uuidProj };
}

projectController.addProject([{id: 'title', value: 'test1'}]);
projectController.addProject([{id: 'title', value: 'test2', priority: 1}]);
projectController.projects[0].addTask([{id: 'name', value: 'taskA'}, {id: 'description', value: 'pizza pizza'}, {id: 'priority', value: 'prirotiy 2'}]);
projectController.projects[0].addTask([{id: 'name', value: 'taskB'}, {id: 'description', value: 'foo bar'}, {id: 'priority', value: 'priority 4'}]);
projectController.projects[1].addTask([{id: 'name', value: 'taskA'}, {id: 'priority', value: 'priority 3'}]);

// gets project's index from projects[] based on project name
// const getProjectIndex = (uuid) => {
//     for (const index in projects) {
//         for (const key in projects[index]) {
//             if (key === 'uuid' && projects[index][key] === uuid) {
//                 return index;
//             }
//         }
//     }
// }