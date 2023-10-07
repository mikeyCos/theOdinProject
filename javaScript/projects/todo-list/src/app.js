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