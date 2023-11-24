import createElement from '../../../helpers/createElement';
import forecast from './forecast.config';
import createContentRows from '../../../helpers/createContentRows';

const forecastBuilder = {
  init() {},
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
          [{ class: 'forecast_day' }, { class: 'forecast_day_item' }],
          `${day.day.maxtemp_f}°/${day.day.mintemp_f}°`,
          day.day.condition.text,
          `${day.day.daily_chance_of_rain}%`,
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
  forecast.init('imperial', weatherData);
  return forecastBuilder.render();
}

// date | temp high / low | condition | preciptation % | wind
// example
// Wed 20 | 60° / 47° | Sunny | 1% | NNE 6 mph
