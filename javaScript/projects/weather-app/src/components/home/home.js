import createElement from '../../helpers/createElement';
import '../../styles/home.css';

const homeBuilder = {
  cacheDOM() {
    console.log('cacheDOM() running from home.js');
  },
  bindEvents() {
    console.log('bindEvents() running from home.js');
  },
  render() {
    const homeSection = createElement('section');
    homeSection.id = 'home';
    const homeHeading = createElement('h1');
    homeHeading.setAttributes({ textContent: 'HOME' });

    homeSection.appendChild(homeHeading);

    return homeSection;
  },
};

export default function buildHome() {
  return homeBuilder.render();
}
