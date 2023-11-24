import createElement from '../../../helpers/createElement';
import hourly from './hourly.config';
import formatDate from '../../../helpers/formatDate';
import formatTime from '../../../helpers/formatTime';
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
        weatherData.forecast[key].forEach((day, i) => {
          const date1 = new Date(hourly.current.last_updated);
          hourly[key] = weatherData.forecast[key];
          const newHours = day.hour.filter((hour) => {
            const date2 = new Date(hour.time);
            return date1.getTime() < date2.getTime();
          });
          hourly[key][i].hour = newHours;
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
    hourlyContent.id = 'hourly_content';

    hourly.forecastday.forEach((day) => {
      const hourlyContentList = createElement('ol');
      const hourlyContentHeading = createElement('h2');
      hourlyContentList.className = 'day';
      hourlyContentHeading.textContent = formatDate(day.date);
      hourlyContentList.appendChild(hourlyContentHeading);
      day.hour.forEach((hour) => {
        hourlyContentList.appendChild(
          createContentRows(
            createElement,
            [{ class: 'hour' }, { class: 'hourly_item' }],
            formatTime(hour.time.split(' ')[1]),
            `${Math.round(hour.temp_f)}°`,
            hour.condition.text,
            `${hour.chance_of_rain}%`,
            `${hour.wind_dir} ${Math.round(hour.wind_mph)} mph`,
          ),
        );
      });
      hourlyContent.appendChild(hourlyContentList);
    });

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
