import createElement from '../../../helpers/createElement';
import hourly from './hourly.config';
import '../../../styles/tabs/hourly.css';
import formatDate from '../../../helpers/formatDate';
import formatTime from '../../../helpers/formatTime';
import createContentRows from '../../../helpers/createContentRows';

const hourlyBuilder = {
  init(weatherData) {},
  cacheDOM() {},
  bindEvents() {},
  render() {
    const hourlySection = createElement('section');
    const hourlySectionHeader = createElement('header');
    const hourlySectionHeading = createElement('h2');
    const hourlyLocation = createElement('span');
    const hourlyTimeStamp = createElement('p');

    hourlySection.id = 'hourly';
    hourlySectionHeading.textContent = 'Hourly weather';
    hourlyLocation.textContent = ` - ${hourly.location.setText()}`;
    hourlyTimeStamp.textContent = `As of ${hourly.last_updated}`;

    hourlySectionHeading.appendChild(hourlyLocation);
    hourlySectionHeader.appendChild(hourlySectionHeading);
    hourlySectionHeader.appendChild(hourlyTimeStamp);
    hourlySection.appendChild(hourlySectionHeader);

    const hourlyDetails = createElement('section');
    hourlyDetails.id = 'hourly_details';

    hourly.forecastday.forEach((day) => {
      const hourlyDay = createElement('ol');
      const hourlyDayHeading = createElement('h3');
      hourlyDay.className = 'day';
      hourlyDayHeading.textContent = formatDate(day.date);
      hourlyDay.appendChild(hourlyDayHeading);
      day.hours.forEach((hour) => {
        const hourContainer = createElement('div');
        hourContainer.className = 'hour';
        Object.values(hour.summary).forEach((detail) => {
          hourContainer.appendChild(
            createContentRows(createElement, null, detail.icon, detail.setText()),
          );
        });

        hourlyDay.appendChild(hourContainer);
      });
      hourlyDetails.appendChild(hourlyDay);
    });

    hourlySection.appendChild(hourlyDetails);
    return hourlySection;
  },
};

export default function buildHourly(weatherData, timeStamp) {
  hourly.init(weatherData, timeStamp);
  return hourlyBuilder.render();
}
