import pubSub from '../../containers/pubSub';
import createElement from '../../utilities/createElement';
import homeBuilder from '../home/home';
import errorBuilder from '../error/error';
import tabsBuilder from '../tabs/tabs';

const build = {
  home: homeBuilder,
  error: errorBuilder,
  tabs: tabsBuilder,
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
  render(key, data) {
    console.log('render() running from main.js');

    let content;
    if (!key) {
      // initial onload
      content = build.home();
      // this.bindEvents();
    } else {
      // render today
      content = build[key](data);
      this.main.lastChild.remove();
    }
    this.main.appendChild(content);
  },
  switchContent(e) {
    let renderKey;
    console.log('switchContent() running from main.js');
    console.log(e);
    if (e.error) {
      console.log('fetch error');
      renderKey = 'error';
    } else {
      console.log('fetch success');
      renderKey = 'tabs';
    }
    this.render(renderKey, e);
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
