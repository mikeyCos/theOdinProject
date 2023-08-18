import importAll from '../../utilities/import-all.js';
import buildButtonAdd from '../button_add.js';
import buildFormProject from '../form_project.js';

export default function buildSidebar(content) {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';
    sidebarWrapper.appendChild(sidebar.render());
    content.appendChild(sidebarWrapper);
    sidebar.cacheDOM();
    sidebar.bindEvents();
}

const assets = {
    icons: importAll(require.context('../../assets/icons', false, /\.svg$/)),
}

export const sidebar = {
    cacheDOM: function() {
        this.sidebar = document.querySelector('#sidebar');
        this.projectsContainer = this.sidebar.querySelector('.section_projects');
        this.btnAddProject = document.querySelector('.btn_add_project');
    },
    bindEvents: function() {
        this.btnAddProject.addEventListener('click', buildFormProject);
    },
    render: function() {
        const sidebarContainer = document.createElement('div');

        const projectsHeader = document.createElement('div');
        const projectsHeaderWrapper = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        const anchor = document.createElement('a');

        sidebarContainer.classList.add('container');
        projectsHeader.classList.add('section_projects');
        projectsHeaderWrapper.classList.add('projects_wrapper');
        anchorWrapper.classList.add('anchor-wrapper');

        anchor.textContent = 'Projects';
        anchor.href = '#projects';

        anchorWrapper.appendChild(anchor);
        anchorWrapper.appendChild(buildButtonAdd('project'));
        projectsHeaderWrapper.appendChild(anchorWrapper);
        projectsHeader.appendChild(projectsHeaderWrapper);
        sidebarContainer.appendChild(projectsHeader);
        return sidebarContainer;
    },
}

// adds/removes class that changes sidebar's display
export function toggleSidebar(e) {
    let sidebarElement = sidebar.sidebar;
    console.log(`toggle_sidebar.js running`);
    if (sidebarElement.style.display === 'none') {
        sidebarElement.style.display = '';
    } else {
        sidebarElement.style.display = 'none';
    }
}