import buildHeader from './components/header.js';
import buildSideBar from './components/sidebar/sidebar.js';
import './app.css';


const appController = (function() {
    const app = {
        init: function() {
            this.cacheDOM();
            // buildHeader(this.app, this.content);
            
            buildSideBar(this.content);
            buildHeader(this.app, this.content);
        },
        cacheDOM: function() {
            this.app = document.querySelector('#todo_app');
            this.content = this.app.querySelector('#content');
        },
        render: function() {

        },
        bindEvents: function() {

        },
        switchContent: function() {

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
