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
    this.getActiveTab = this.getActiveTab.bind(this);
    // pubSub.subscribe('switchTab', this.switchTab);
    pubSub.subscribe('getActiveTab', this.getActiveTab);
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
  render(key, update) {
    let content;
    if (!update) {
      if (!key) {
        // if no key
        content = build.today(this.weatherData, this.timeStamp);
      } else {
        content = build[key](this.weatherData, this.timeStamp);
        this.tabsSection.lastChild.remove();
      }
      console.log(content);
      this.tabsSection.appendChild(content);
    } else {
      console.log('update exists');
      pubSub.publish('getWeather', this.location, key);
    }
  },
  switchTab(e, tabKey) {
    console.log(tabKey);
    let renderKey;
    let update = true;
    if (tabKey) {
      renderKey = tabKey;
      update = false;
    } else {
      const { className: elementClassName } = e.currentTarget;
      renderKey = elementClassName;
    }

    this.render(renderKey, update);
  },
  setActiveTab(renderKey) {
    this.activeKey = renderKey;
    console.log(this.activeKey);
  },
  getActiveTab() {
    return this.activeKey;
  },
};

export default function buildTabs(weatherData, tabKey) {
  console.log(tabKey);
  if (!tabKey) {
    tabsBuilder.init(weatherData);
  }

  const tabsSection = createElement('section');
  const tabsHeading = createElement('h1');
  tabsSection.id = 'tabs';
  tabsHeading.setAttributes({ textContent: 'TABS' });

  tabsSection.appendChild(tabsHeading);
  tabsSection.appendChild(build.tabsNavbar());
  tabsBuilder.cacheDOM(tabsSection);
  tabsBuilder.render();
  // tabsBuilder.switchTab(null, tabKey);
  tabsBuilder.bindEvents();
  if (tabKey) {
    //   console.log('tabsBuilder.render() running once more');
    tabsBuilder.setWeather(weatherData);
    //   tabsBuilder.render(tabKey);
    tabsBuilder.switchTab(null, tabKey);
  }
  return tabsSection;
}
