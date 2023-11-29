import createElement from '../../helpers/createElement';
import buildTabsNavbar from './tabs_navbar/tabs_navbar';
import buildToday from './today/today';
import buildHourly from './hourly/hourly';
import buildForecast from './forecast/forecast';
import pubSub from '../../containers/pubSub';

const build = {
  tabsNavbar: buildTabsNavbar,
  today: buildToday,
  hourly: buildHourly,
  forecast: buildForecast,
};

const tabsBuilder = {
  init(weatherData) {
    this.setWeather(weatherData);
    this.switchTab = this.switchTab.bind(this);
    pubSub.subscribe('switchTab', this.switchTab);
  },
  setWeather(weatherData) {
    this.weatherData = weatherData;
    this.location = weatherData.location.name;
    this.apiLastUpdated = weatherData.current.last_updated_epoch;
    // this.timeStamp = weatherData.current.last_updated_epoch;
    this.timeStamp = Math.floor(Date.now() / 1000);

    console.log(this.timeStamp);
    console.log(this.apiLastUpdated);
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
    // debugger;
    let content;
    if (!update) {
      if (!key) {
        // if no key
        content = build.today(this.weatherData, this.timeStamp);
      } else {
        content = build[key](this.weatherData, this.timeStamp);
        this.tabsSection.lastChild.remove();
      }
      this.tabsSection.appendChild(content);
    } else {
      console.log('update exists');
      pubSub.publish('getWeather', this.location, key);
    }
  },
  switchTab(e, tabKey) {
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
  tabsBuilder.bindEvents();
  if (tabKey) {
    console.log('tabsBuilder.render() running once more');
    tabsBuilder.setWeather(weatherData);
    tabsBuilder.render(tabKey);
  }
  return tabsSection;
}
