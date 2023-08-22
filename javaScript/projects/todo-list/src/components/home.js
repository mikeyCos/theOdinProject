export default function buildHome() {
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const header = document.createElement('h1');
    header.textContent = 'HOME';

    homeContainer.appendChild(header);
    return homeContainer
}

const home = {
    cacheDOM: function() {

    },
    bindEvents: function() {

    },
    render: function() {

    },
}