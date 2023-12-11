import pubSub from '../../containers/pubSub';
import createElement from '../../helpers/createElement';
import homeBuilder from '../home/home';
import errorBuilder from '../error/error';
import tabsBuilder from '../tabs/tabs';
import loadingBuilder from '../loading/loading';
import '../../styles/content.css';

const build = {
  home: homeBuilder,
  error: errorBuilder,
  tabs: tabsBuilder,
  loading: loadingBuilder,
};

const mainBuilder = {
  activeContent: null,
  activeTab: null,
  init() {},
  cacheDOM(mainElement) {
    this.main = mainElement;
  },
  bindEvents() {
    this.switchContent = this.switchContent.bind(this);
    pubSub.subscribe('switchContent', this.switchContent);
  },
  render(key, data, renderKey) {
    let content;
    if (!key) {
      content = build.home();
    } else {
      content = build[key](data, renderKey);
      this.main.lastChild.remove();
    }
    this.main.appendChild(content);
  },
  switchContent(weatherData, renderKey) {
    let contentKey;
    if (weatherData.error) {
      contentKey = 'error';
    } else if (weatherData === 'loading') {
      contentKey = 'loading';
    } else {
      contentKey = 'tabs';
    }
    this.render(contentKey, weatherData, renderKey);
  },
  setActiveTab(tab) {},
};

export default function buildMain() {
  // return mainBuilder.render();
  const main = createElement('main');
  main.id = 'main_content';
  mainBuilder.cacheDOM(main);
  mainBuilder.bindEvents();
  mainBuilder.render();
  return main;
}
