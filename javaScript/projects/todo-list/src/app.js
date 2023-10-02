import buildHeader from './components/header';
import buildSideBar from './components/sidebar/sidebar';
import buildMain from './components/main';
import { setProjects } from './storage/storage';
import buildOverlay from './components/overlay';
import SVGInject from '@iconfu/svg-inject'
// SVGInject
// https://www.npmjs.com/package/@iconfu/svg-inject

import './app.css';

const appController = (function() {
    const build = {
        header: buildHeader,
        sidebar: buildSideBar,
        overlay: buildOverlay,
        main: buildMain,
    }

    const app = {
        init: function() {
            setProjects();
            this.render();
        },
        cacheDOM: function() {

        },
        render: function() {
            const appWrapper = document.createElement('div');
            const appContent = document.createElement('div');
            appWrapper.id = 'todo_app';
            appContent.id = 'content';

            appWrapper.appendChild(build.header());
            appContent.appendChild(build.overlay());
            appContent.appendChild(build.sidebar());
            appContent.appendChild(build.main());
            appWrapper.appendChild(appContent);

            document.body.appendChild(appWrapper);
        },
        bindEvents: function() {

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
