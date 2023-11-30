import createElement from '../../../helpers/createElement';
import forecast from './forecast.config';
import createContentRows from '../../../helpers/createContentRows';
import formatTime from '../../../helpers/formatTime';

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
    const forecastSectionHeader = createElement('header');
    const forecastSectionHeading = createElement('h2');
    const forecastLocation = createElement('span');
    const forecastTimeStamp = createElement('p');

    forecastSection.id = 'forecast';
    forecastSectionHeading.textContent = '3 Day Weather';
    forecastLocation.textContent = ` - ${forecast.location.setText()}`;
    forecastTimeStamp.textContent = `As of ${forecast.last_updated}`;

    forecastSectionHeading.appendChild(forecastLocation);
    forecastSectionHeader.appendChild(forecastSectionHeading);
    forecastSectionHeader.appendChild(forecastTimeStamp);
    forecastSection.appendChild(forecastSectionHeader);

    // temporary
    const forecastDetails = createElement('section');
    forecastDetails.id = 'forecast_details';

    forecast.forecastday.forEach((day) => {
      Object.values(day).forEach((detail) => {
        forecastDetails.append(
          createContentRows(createElement, null, detail.icon, detail.setText()),
        );
      });
    });
    // temporary
    forecastSection.appendChild(forecastDetails);
    return forecastSection;
  },
};

export default function buildForecast(weatherData, timeStamp) {
  forecast.init(weatherData, 'imperial', timeStamp);
  return forecastBuilder.render();
}

// date | temp high / low | condition | preciptation % | wind
// example
// Wed 20 | 60° / 47° | Sunny | 1% | NNE 6 mph
