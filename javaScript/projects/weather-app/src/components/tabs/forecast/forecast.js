import createElement from '../../../utilities/createElement';
import forecast from './forecast.config';
import createContentRows from '../../../helpers/createContentRows';

const forecastBuilder = {
  init(weatherData) {
    Object.keys(forecast).forEach((key) => {
      if (!(forecast[key] instanceof Array)) {
        Object.keys(forecast[key]).forEach((subkey) => {
          forecast[key][subkey] = weatherData[key][subkey];
        });
      } else {
        weatherData.forecast.forecastday.forEach((item) => {
          forecast.forecastday.push(item);
        });
      }
    });
  },
  cacheDOM() {
    console.log('cacheDOM() running from forecast.js');
  },
  bindEvents() {
    console.log('bindEvents() running from forecast.js');
  },
  render() {
    console.log('render() running from forecast.js');
    console.log(forecast);
    const forecastSection = createElement('section');
    const forecastSectionHeading = createElement('h1');
    forecastSection.id = 'forecast';
    forecastSectionHeading.setAttributes({ textContent: '3 Day Weather' });
    forecastSection.appendChild(forecastSectionHeading);

    // temporary
    const forecastContent = createElement('section');
    forecastContent.id = 'forecast_content';

    const forecastContentList = createElement('ol');
    forecast.forecastday.forEach((day) => {
      forecastContentList.appendChild(
        createContentRows(
          createElement,
          `${day.day.maxtemp_f}°/${day.day.mintemp_f}°`,
          day.day.condition.text,
          `${day.day.daily_chance_of_rain}`,
        ),
      );
    });
    forecastContent.appendChild(forecastContentList);
    forecastSection.appendChild(forecastContent);
    // temporary

    return forecastSection;
  },
};

export default function buildForecast(weatherData) {
  forecastBuilder.init(weatherData);
  return forecastBuilder.render();
}

// date | temp high / low | condition | preciptation % | wind
// example
// Wed 20 | 60° / 47° | Sunny | 1% | NNE 6 mph
