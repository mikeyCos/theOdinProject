import pubSub from '../../containers/pubSub';
import createElement from '../../helpers/createElement';
import homeBuilder from '../home/home';
import errorBuilder from '../error/error';
import tabsBuilder from '../tabs/tabs';
import loadingBuilder from '../loading/loading';

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
  render(key, data, tabKey) {
    console.log('render() running from main.js');

    let content;
    if (!key) {
      // initial onload
      content = build.home();
      // this.bindEvents();
    } else {
      // render today
      content = build[key](data, tabKey);
      this.main.lastChild.remove();
    }
    this.main.appendChild(content);
  },
  switchContent(e, tabKey) {
    let renderKey;
    console.log('switchContent() running from main.js');
    console.log(e);
    if (e.error) {
      renderKey = 'error';
    } else if (e === 'loading') {
      renderKey = 'loading';
    } else {
      console.log('fetch success');
      renderKey = 'tabs';
    }
    this.render(renderKey, e, tabKey);
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
