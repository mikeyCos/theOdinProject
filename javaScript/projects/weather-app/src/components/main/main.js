import pubSub from '../../containers/pubSub';
import createElement from '../../utilities/createElement';
import homeBuilder from '../home/home';

const build = {
  home: homeBuilder,
};

const mainBuilder = {
  activeContent: null,
  activeTab: null,
  init() {
    console.log('init() methid running from main.js');
  },
  setWeather(weatherData) {
    this.weather = weatherData;
    console.log(this.weather);
  },
  cacheDOM(mainElement) {
    console.log('cacheDOM() running from main.js');
    this.main = mainElement;
  },
  bindEvents() {
    console.log('bindEvents() running from main.js');

    this.setWeather = this.setWeather.bind(this);
    this.switchContent = this.switchContent.bind(this);
    pubSub.subscribe('setWeather', this.setWeather);
  },
  render(key) {
    console.log('render() running from main.js');

    let content;
    if (!key) {
      // initial onload
      const main = createElement('main');
      main.id = 'main_content';
      content = build.home();
      main.appendChild(content);

      this.cacheDOM(main);
      this.bindEvents();
      return main;
    } else {
      return 'test';
      // render today
    }
  },
  switchContent(e) {
    console.log('switchContent() running from main.js');
    console.log(e);
  },
  setActiveTab(tab) {
    console.log('setActiveTab() running from main.js');
  },
};

export default function buildMain() {
  return mainBuilder.render();
}
