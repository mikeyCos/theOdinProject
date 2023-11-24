import createElement from '../../helpers/createElement';
import buildTabsNavbar from './tabs_navbar/tabs_navbar';
import buildToday from './today/today';
import buildHourly from './hourly/hourly';
import buildForecast from './forecast/forecast';

const build = {
  tabsNavbar: buildTabsNavbar,
  today: buildToday,
  hourly: buildHourly,
  forecast: buildForecast,
};

const tabsBuilder = {
  init(weatherData) {
    this.setWeather(weatherData);
  },
  setWeather(weatherData) {
    this.weatherData = weatherData;
  },
  cacheDOM(tabsSection) {
    this.tabsSection = tabsSection;
    this.tabsList = tabsSection.querySelectorAll('.tabs_list_item > a');
    console.log(this.tabsSection);
    console.log(this.tabsList);
  },
  bindEvents() {
    this.switchTab = this.switchTab.bind(this);
    this.tabsList.forEach((tab) => tab.addEventListener('click', this.switchTab));
  },
  render(key) {
    let content;
    if (!key) {
      // if no key
      content = build.today(this.weatherData);
    } else {
      content = build[key](this.weatherData);
      this.tabsSection.lastChild.remove();
    }
    console.log(content);
    this.tabsSection.appendChild(content);
  },
  switchTab(e) {
    const { className: elementClassName } = e.currentTarget;
    const renderKey = elementClassName;
    this.render(renderKey);
  },
};

export default function buildTabs(weatherData) {
  tabsBuilder.init(weatherData);
  const tabsSection = createElement('section');
  const tabsHeading = createElement('h1');
  tabsSection.id = 'tabs';
  tabsHeading.setAttributes({ textContent: 'TABS' });

  tabsSection.appendChild(tabsHeading);
  tabsSection.appendChild(build.tabsNavbar());
  tabsBuilder.cacheDOM(tabsSection);
  tabsBuilder.render();
  tabsBuilder.bindEvents();
  return tabsSection;
}
