import createElement from '../../../utilities/createElement';

const hourlyBuilder = {
  cacheDOM() {
    console.log('cacheDOM() running from hourly.js');
  },
  bindEvents() {
    console.log('bindEvents() running from hourly.js');
  },
  render() {
    console.log('render() running from hourly.js');
    const hourlySection = createElement('section');
    const hourlySectionHeading = createElement('h1');
    hourlySection.id = 'today';
    hourlySectionHeading.setAttributes({ textContent: 'HOURLY' });
    hourlySection.appendChild(hourlySectionHeading);

    return hourlySection;
  },
};

export default function buildHourly(weatherData) {
  console.log(weatherData.forecast.forecastday[0].hour);
  return hourlyBuilder.render();
}

// Date
// time | temp | condition | preciptation % | wind
// example
// 1:30 pm | 47° | Sunny | 1% | N 6 mph
