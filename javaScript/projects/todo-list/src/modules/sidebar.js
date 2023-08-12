

export default function buildSidebar() {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';
    sidebarWrapper.appendChild(sidebar.render());
    console.log(document.body.firstElementChild.lastElementChild);
    document.body.firstElementChild.lastElementChild.appendChild(sidebarWrapper);
}

const sidebar = {
    sections: {
        // placeholder: [
        //     {element: 'div', class: 'projects', childElement: 'a', content: 'Placeholder0',},
        //     {element: 'div', class: 'list', childElement: 'a', content: 'Placeholder1',}
        // ],
        projects: [
            {element: 'div', class: 'projects', childElement: 'a', content: 'Projects', href: 'project'},
            // {element: 'div', class: 'list', childElement: 'a', content: 'Lists',}
        ]
    },
    render: function() {
        const sidebarContainer = document.createElement('div');
        sidebarContainer.classList.add('container');

        for (let section in this.sections) {
            const wrapper = document.createElement('div');
            wrapper.classList.add(`section-${section}`);
            this.sections[section].forEach(item => {
                const parentElement = document.createElement(item.element);
                const childElement = document.createElement(item.childElement);
                const text = document.createTextNode(item.content);
                childElement.href = item.href;
                
                childElement.appendChild(text);
                parentElement.appendChild(childElement);
                wrapper.appendChild(parentElement);
            });
            sidebarContainer.appendChild(wrapper);
        }

        const list = document.createElement('ul');

        return sidebarContainer;
    }
}