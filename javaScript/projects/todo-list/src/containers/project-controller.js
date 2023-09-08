import { taskList } from '../components/tasks_list';
import { pubSub } from './pubsub';

const getFormValues = (inputs) => {
    const obj = {}
    inputs.forEach(input => { 
        if (input.id === 'priority') {
            obj[input.id] = parseInt(input.value.slice(input.value.length - 1, input.value.length));
        } else if (input.value.length !== 0 ) {
            obj[input.id] = input.value
        }
    });
    return obj;
}
// creates a project object
    // tasks property created upon object creation
const project = () => {
    let active = false; // there can only be one project active
    const uuid = crypto.randomUUID();
    const tasks = [];
    const addTask = (inputs) => {
        const newTask = Object.assign(task(uuid), getFormValues(inputs));
        tasks.push(newTask);
        pubSub.publish('addTask', newTask);
        console.log(tasks);
    };
    const removeTask = (uuid) => {
        const task = findTask(uuid);
        tasks.splice(tasks.indexOf(task), 1);
    };
    const updateTask = (uuid, inputs) => {
        const newTask = Object.assign(findTask(uuid), getFormValues(inputs));
        pubSub.publish('updateTask', newTask);
        console.log(tasks);
    };
    const findTask = (uuid) => {
        return tasks.find(element => element.uuidTask === uuid);
    };
    return { tasks, uuid, active, addTask, removeTask, updateTask };
}


export const projectController = {
    inbox: [],
    projects: [],
    addProject: function(inputs) {
        console.log(inputs)
        this.projects.push(Object.assign(project(), getFormValues(inputs)));
    },
    remove: function(uuid) {
        this.projects.splice(this.projects.indexOf(this.find(uuid)), 1);
    },
    find: function(uuid) {
        return this.projects.find(project => project.uuid === uuid);
    },
    setActive: function(uuid) {
        if (this.findActive()) {
            this.findActive().active = false;
        }
        this.find(uuid).active = true;
        console.log(this.projects);
    },
    findActive: function() {
        return this.projects.find(project => project.active === true);
    }
}


const task = (uuid) => {
    const uuidTask = crypto.randomUUID();
    const uuidProj = uuid;
    // let priority = 4;
    // let dueDate = null;
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