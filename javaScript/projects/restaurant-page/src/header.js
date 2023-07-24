const navLinks = ['home', 'about', 'menu', 'contact'];

export default function buildHeader() {
    console.log(`navbar.js running`); //for debugging
    const headerWrapper = document.createElement('header');
    headerWrapper.id = 'header';
    const headerContainer = document.createElement('div');
    const heading = document.createElement('h1');
    const headingText = document.createTextNode('Restaurant');
    headerContainer.id = 'hero';

    heading.appendChild(headingText);
    headerContainer.appendChild(heading);
    headerWrapper.appendChild(headerContainer);

    // headerWrapper.appendChild(buildNav());
    headerWrapper.insertBefore(buildNav(), headerContainer);
    document.body.insertBefore(headerWrapper, document.body.firstChild);
}

function buildNav() {
    const navWrapper = document.createElement('nav');
    const navContainer = document.createElement('div');
    // document.body.insertBefore(navWrapper, document.body.firstChild);

    navWrapper.id = 'navbar';
    navContainer.classList.add('container');

    const navList = document.createElement('ul');
    navLinks.forEach(item => {
        const navItem = document.createElement('li');
        const anchor = document.createElement('a');
        //need to set anchor attributes
        //href, class
        anchor.href = '#';
        anchor.classList.add(item);

        const navItemText = document.createTextNode(item);
        anchor.appendChild(navItemText);
        navItem.appendChild(anchor);
        navList.appendChild(navItem);
    })
    navContainer.appendChild(navList);
    navWrapper.appendChild(navContainer);

    return navWrapper;
}