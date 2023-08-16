import importAll from '../../utilities/import-all.js';
import buildButtonAdd from '../button_add.js';

export default function buildSidebar(content) {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';
    sidebarWrapper.appendChild(sidebar.render());
    content.appendChild(sidebarWrapper);
    sidebar.cacheDOM();
}

const assets = {
    icons: importAll(require.context('../../assets/icons', false, /\.svg$/)),
}

const sidebar = {
    cacheDOM: function() {
        this.sidebar = document.querySelector('#sidebar');
        console.log(this.sidebar);
    },
    bindEvents: {

    },
    render: function() {
        const sidebarContainer = document.createElement('div');
        sidebarContainer.classList.add('container');
        sidebarContainer.appendChild(buildButtonAdd('project'));
        return sidebarContainer;
    },
}

// adds/removes class that changes sidebar's display
export function toggleSidebar(e) {
    
    console.log(`toggle_sidebar.js running`);
    console.log(sidebar.sidebar);
}