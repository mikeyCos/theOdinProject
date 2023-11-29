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
    const forecastSection = createElement('section');
    const forecastSectionHeading = createElement('h1');
    forecastSection.id = 'forecast';
    forecastSectionHeading.setAttributes({ textContent: '3 Day Weather' });
    forecastSection.appendChild(forecastSectionHeading);

    return forecastSection;
  },
};

export default function buildForecast(weatherData) {
  return forecastBuilder.render();
}

// date | temp high / low | condition | preciptation % | wind
// example
// Wed 20 | 60° / 47° | Sunny | 1% | NNE 6 mph
