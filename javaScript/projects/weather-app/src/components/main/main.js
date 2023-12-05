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
  init() {
    console.log('init() methid running from main.js');
  },
  cacheDOM(mainElement) {
    console.log('cacheDOM() running from main.js');
    this.main = mainElement;
  },
  bindEvents() {
    console.log('bindEvents() running from main.js');
    this.switchContent = this.switchContent.bind(this);
    pubSub.subscribe('switchContent', this.switchContent);
  },
  render(key, data, renderKey) {
    console.log('render() running from main.js');

    let content;
    if (!key) {
      // initial onload
      content = build.home();
      // this.bindEvents();
    } else {
      // render today
      content = build[key](data, renderKey);
      this.main.lastChild.remove();
    }
    this.main.appendChild(content);
  },
  switchContent(weatherData, renderKey) {
    let contentKey;
    console.log('switchContent() running from main.js');
    if (weatherData.error) {
      contentKey = 'error';
    } else if (weatherData === 'loading') {
      contentKey = 'loading';
    } else {
      // console.log('fetch success');
      contentKey = 'tabs';
    }
    this.render(contentKey, weatherData, renderKey);
  },
  setActiveTab(tab) {
    console.log('setActiveTab() running from main.js');
  },
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
