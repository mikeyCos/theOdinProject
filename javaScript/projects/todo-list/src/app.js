import buildHeader from './components/header.js';
import buildSideBar from './components/sidebar/sidebar.js';
import buildMain from './components/main.js';
import './app.css';


const appController = (function() {
    const build = {
        header: buildHeader,
        sidebar: buildSideBar,
        main: buildMain,
        // home: buildHome, // renders all tasks
        // projects: buildProjectsList,
        // projectTasks: buildProjectTasks, // renders project's task
    }

    const app = {
        activeContent: null,
        init: function() {
            this.render();
        },
        cacheDOM: function() {

        },
        render: function() {
            
            const appWrapper = document.createElement('div');
            const appContent = document.createElement('div');
            // const main = document.createElement('main');
            appWrapper.id = 'todo_app';
            appContent.id = 'content';
            // main.id = 'main_content';

            appWrapper.appendChild(build.header());
            appContent.appendChild(build.sidebar());
            // appContent.appendChild(main);
            appWrapper.appendChild(appContent);

            document.body.appendChild(appWrapper);

        },
        bindEvents: function() {

        },
        switchContent: function(e) {

        },
        setActiveContent: function() {

        },
    }

    app.init();
})();

//main
    // 1. view all projects
    // 2. view all todos in each project
    // 3. expand a single todo to see/edit its details
    // 4. delete a todo

    // todo list item
        // create item button
        // renders form
            // title, required
            // description
            // due date
                //renders form
                    // default values
                        // today, tomorrow, no date
                    // calendar
                    // time
                    // cancel and save button
            // project label/tag
            // submit
        // delete
        // complete
        // reorder todo list item
        // change priority
    // create new todo list item

// todo list OBJECT
    // title
    // description
        // subtask
    // reminder
    // due date
    // time
    // prioirty

// webpack external library: date-fns
