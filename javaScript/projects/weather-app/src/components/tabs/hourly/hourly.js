import createElement from '../../../helpers/createElement';
import hourly from './hourly.config';
import formatDate from '../../../helpers/formatDate';
import formatTime from '../../../helpers/formatTime';
import createContentRows from '../../../helpers/createContentRows';

const hourlyBuilder = {
  init(weatherData) {},
  cacheDOM() {
    console.log('cacheDOM() running from hourly.js');
  },
  bindEvents() {
    console.log('bindEvents() running from hourly.js');
  },
  render() {
    console.log('render() running from hourly.js');
    console.log(hourly);
    const hourlySection = createElement('section');
    const hourlySectionHeading = createElement('h1');
    hourlySection.id = 'hourly';
    hourlySectionHeading.textContent = 'Hourly weather';
    hourlySection.appendChild(hourlySectionHeading);
    return hourlySection;
  },
};

export default function buildHourly(weatherData, timeStamp) {
  hourly.init(weatherData, 'imperial', timeStamp);
  return hourlyBuilder.render();
}

// Date
// time | temp | condition | preciptation % | wind
// example
// 1:30 pm | 47° | Sunny | 1% | N 6 mph
