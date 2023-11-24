import createElement from '../../helpers/createElement';

const loadingBuilder = {
  cacheDOM() {
    console.log('cacheDOM() running from loading.js');
  },
  bindEvents() {
    console.log('bindEvents() running from loading.js');
  },
  render() {
    const loadingSection = createElement('section');
    loadingSection.id = 'loading';
    const loadingHeading = createElement('h1');
    loadingHeading.setAttributes({ textContent: 'LOADING...' });

    loadingSection.appendChild(loadingHeading);

    return loadingSection;
  },
};

export default function buildHome() {
  return loadingBuilder.render();
}
