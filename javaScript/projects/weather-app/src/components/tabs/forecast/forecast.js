import createElement from '../../../helpers/createElement';
import forecast from './forecast.config';
import '../../../styles/tabs/forecast.css';
import createContentRows from '../../../helpers/createContentRows';
import formatTime from '../../../helpers/formatTime';

const forecastBuilder = {
  init() {},
  cacheDOM() {},
  bindEvents() {},
  render() {
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

    const forecastDetails = createElement('section');
    forecastDetails.id = 'forecast_details';

    forecast.forecastday.forEach((day) => {
      const forecastday = createElement('div');
      forecastday.className = 'day';
      Object.values(day).forEach((detail) => {
        forecastday.append(createContentRows(createElement, null, detail.icon, detail.setText()));
      });
      forecastDetails.appendChild(forecastday);
    });

    forecastSection.appendChild(forecastDetails);
    return forecastSection;
  },
};

export default function buildForecast(weatherData, timeStamp) {
  forecast.init(weatherData, timeStamp);
  return forecastBuilder.render();
}
