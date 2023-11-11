import createElement from '../../utilities/createElement';

const homeBuilder = {
  cacheDOM() {
    console.log('cacheDOM() running from home.js');
  },
  bindEvents() {
    console.log('bindEvents() running from home.js');
  },
  render() {
    const home = createElement('div');
    home.id = 'home';
    const homeHeading = createElement('h1');
    homeHeading.setAttributes({ textContent: 'HOME' });

    home.appendChild(homeHeading);

    return home;
  },
};

export default function buildHome() {
  return homeBuilder.render();
}
