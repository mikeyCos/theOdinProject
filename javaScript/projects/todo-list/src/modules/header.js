import importAll from './import-all.js';

export default function buildHeader() {
    const headerElement = document.createElement('header');

    headerElement.appendChild(nav.render());

    document.body.insertBefore(headerElement, document.body.firstChild);
}

const assets = {
    icons: importAll(require.context('../assets/icons', false, /\.svg$/)),
}

const nav = {
    navLeft: [
        {element: 'button', class: 'btn-menu', childElement: 'img', src: assets.icons.files['menu.svg']},
        {element: 'button', class: 'btn-home', childElement: 'img', src: assets.icons.files['home.svg']},
        {element: 'input', class: 'input-search', placeholder: 'Search'}
    ],
    navRight: [
        {element: 'button', },
        {element: 'button', },
        {element: 'a'}
    ],
    render: function() {
        const navElement = document.createElement('nav');
        const navContainer = document.createElement('div');

        navElement.id = 'navbar';
        navContainer.classList.add('container');

        const navLeftWrapper = document.createElement('div');
        const navLeftContainer = document.createElement('div');

        navLeftWrapper.classList.add('nav-left');
        navLeftContainer.classList.add('.container');

        this.navLeft.forEach((item) => {
            const navItem = document.createElement(item.element);
            navItem.classList.add(item.class);
            if ('placeholder' in item) {
                console.log(item);
                navItem.setAttribute('placeholder', item.placeholder);
            } else {
                const navIcon = document.createElement(item.childElement);
                navIcon.src = item.src;
                navItem.appendChild(navIcon);
            }
            navLeftContainer.appendChild(navItem);
        })

        navLeftWrapper.appendChild(navLeftContainer);
        navContainer.appendChild(navLeftWrapper);
        navElement.appendChild(navContainer);
        return navElement;
    }
}