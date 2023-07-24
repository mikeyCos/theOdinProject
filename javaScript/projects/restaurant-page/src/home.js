export default function buildHome() {
    console.log('buildHome running');
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Welcome');
    header.appendChild(headerText);
    homeContainer.appendChild(header);

    return homeContainer;
}