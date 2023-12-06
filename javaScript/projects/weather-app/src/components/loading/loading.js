import createElement from '../../helpers/createElement';
import '../../styles/loading.css';
import LoadingIcon from '../../assets/icons/progress_activity.svg';

const loadingBuilder = {
  cacheDOM() {
    console.log('cacheDOM() running from loading.js');
  },
  bindEvents() {
    console.log('bindEvents() running from loading.js');
  },
  render() {
    const loadingSection = createElement('section');
    const loadingImage = createElement('img');
    loadingSection.id = 'loading';
    loadingImage.setAttributes({ onload: 'SVGInject(this)', src: LoadingIcon, id: 'loading_img' });

    loadingSection.appendChild(loadingImage);

    return loadingSection;
  },
};

export default function buildHome() {
  return loadingBuilder.render();
}
