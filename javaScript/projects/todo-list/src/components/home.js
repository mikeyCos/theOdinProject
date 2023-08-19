export default function buildHome() {
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const header = document.createElement('h1');
    header.textContent = 'HOME';

    homeContainer.appendChild(header);
    return homeContainer
}