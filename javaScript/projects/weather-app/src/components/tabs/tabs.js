import createElement from '../../helpers/createElement';
import buildTabsNavbar from './tabs_navbar/tabs_navbar';
import buildToday from './today/today';
import buildHourly from './hourly/hourly';
import buildForecast from './forecast/forecast';
import pubSub from '../../containers/pubSub';
import '../../styles/tabs/tabs.css';

const build = {
  tabsNavbar: buildTabsNavbar,
  today: buildToday,
  hourly: buildHourly,
  forecast: buildForecast,
};

const tabsBuilder = {
  init(weatherData) {
    this.timeStamp = Math.floor(Date.now() / 1000);
    this.setWeather(weatherData);
    this.switchTab = this.switchTab.bind(this);
    pubSub.subscribe('render', this.render);
  },
  setWeather(weatherData) {
    this.weatherData = weatherData;
    this.location = weatherData.location.name;
    this.apiLastUpdated = weatherData.current.last_updated_epoch;
  },
  cacheDOM(tabsSection) {
    this.tabsSection = tabsSection;
    this.tabsList = tabsSection.querySelectorAll('.tabs_list_item > a');
  },
  bindEvents() {
    this.switchTab = this.switchTab.bind(this);
    this.tabsList.forEach((tab) => tab.addEventListener('click', this.switchTab));
  },
  render(key) {
    let content;
    if (!key) {
      // if no key
      content = build.today(this.weatherData, this.timeStamp);
    } else {
      content = build[key](this.weatherData, this.timeStamp);
      // this.tabsSection.lastChild.remove();
    }
    this.setActiveTab(content.id);
    this.tabsSection.appendChild(content);
  },
  switchTab(e, tabKey) {
    console.log(e.currentTarget);
    console.log(tabKey);
    const { className: elementClassName } = e.currentTarget;
    const renderKey = elementClassName;

    pubSub.publish('getWeather', this.location, renderKey);
  },
  setActiveTab(id) {
    console.log(id);
    console.log(this.tabsList);
    console.log([...this.tabsList].find((anchor) => anchor.classList.contains(id)));
    // if (this.activeTab) this.activeTab.classList.remove('active');
    this.activeTab = [...this.tabsList].find((anchor) => anchor.classList.contains(id));
    // this.activeTab.classList.add('active');
    this.activeTab.setAttributes({ 'data-active': true });
    this.activeKey = id;
    console.log(`activeKey: ${this.activeKey}`);
    pubSub.publish('setActiveTab', id);
    // sends id to setActiveTab in header.js module
  },
  // updateData(weatherData, key) {
  //   this.weatherData = weatherData;
  //   this.render(key);
  // },
};

export default function buildTabs(weatherData, renderKey) {
  console.log(renderKey);
  tabsBuilder.init(weatherData);
  const tabsSection = createElement('section');
  // const tabsHeading = createElement('h1');
  tabsSection.id = 'tabs';
  // tabsHeading.setAttributes({ textContent: 'TABS' });

  // tabsSection.appendChild(tabsHeading);
  tabsSection.appendChild(build.tabsNavbar());
  tabsBuilder.cacheDOM(tabsSection);
  if (renderKey) {
    tabsBuilder.render(renderKey);
  } else {
    tabsBuilder.render();
  }
  tabsBuilder.bindEvents();
  return tabsSection;
}
