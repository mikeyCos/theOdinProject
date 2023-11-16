import createElement from '../../../utilities/createElement';
import hourly from './hourly.config';
import formatDate from '../../../helpers/formatDate';
import createContentRows from '../../../helpers/createContentRows';

const hourlyBuilder = {
  init(weatherData) {
    // copying specific object properties from weatherData to hourly
    Object.keys(hourly).forEach((key) => {
      if (!(hourly[key] instanceof Array)) {
        Object.keys(hourly[key]).forEach((subkey) => {
          hourly[key][subkey] = weatherData[key][subkey];
        });
      } else {
        const date1 = new Date(hourly.current.last_updated);
        weatherData.forecast.forecastday[0][key].forEach((item) => {
          const date2 = new Date(item.time);
          if (date1.getTime() < date2.getTime()) {
            hourly[key].push(item);
          }
        });
      }
    });
  },
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

    // temporary
    const hourlyContent = createElement('section');
    const hourlyContentHeading = createElement('h2');
    hourlyContent.id = 'hourly_content';
    hourlyContentHeading.textContent = formatDate(hourly.current.last_updated);
    hourlyContent.appendChild(hourlyContentHeading);

    const hourlyContentList = createElement('ol');
    hourly.hour.forEach((hour) => {
      hourlyContentList.appendChild(
        createContentRows(
          createElement,
          hour.time.split(' ')[1],
          `${hour.temp_f}°`,
          hour.condition.text,
          `${hour.chance_of_rain}%`,
          `${hour.wind_dir} ${hour.wind_mph} mph`,
        ),
      );
    });

    hourlyContent.appendChild(hourlyContentList);
    hourlySection.appendChild(hourlyContent);
    // temporary
    return hourlySection;
  },
};

export default function buildHourly(weatherData) {
  hourlyBuilder.init(weatherData);
  return hourlyBuilder.render();
}

// Date
// time | temp | condition | preciptation % | wind
// example
// 1:30 pm | 47° | Sunny | 1% | N 6 mph
