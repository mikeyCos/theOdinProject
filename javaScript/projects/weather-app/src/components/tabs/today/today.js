import createElement from '../../../utilities/createElement';
import today from './today.config';

const todayBuilder = {
  init(weatherData) {
    today.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        // is the conditional redundant?
        if (weatherData.current[key] || weatherData.forecast.forecastday[0].day[key]) {
          const value = weatherData.current[key]
            ? weatherData.current[key]
            : weatherData.forecast.forecastday[0].day[key];
          Object.assign(obj, { value });
        }
      });
    });
  },
  cacheDOM() {
    console.log('cacheDOM() running from today.js');
  },
  bindEvents() {
    console.log('bindEvents() running from today.js');
  },
  render(weatherData) {
    const todaySection = createElement('section');
    const todaySectionHeading = createElement('h1');
    todaySection.id = 'today';
    todaySectionHeading.setAttributes({ textContent: 'TODAY' });
    todaySection.appendChild(todaySectionHeading);

    // temporary
    const todaySummary = createElement('section');
    const todaySummaryList = createElement('ul');
    todaySummary.id = 'today_summary';

    const todayDetails = createElement('section');
    const todayDetailsList = createElement('ul');
    todayDetails.id = 'today_details';
    today.forEach((obj) => {
      const todayDetailsListItem = createElement('li');
      // please refactor me!
      let text;
      const prop = Object.keys(obj).at(0);
      if (obj.unit) {
        if (prop.includes('_f') || !prop.includes('_')) {
          text = `${obj[prop]}: ${obj.value}${obj.unit}`;
        } else {
          text = `${obj[prop]}: ${obj.value} ${obj.unit}`;
        }
      } else {
        text = `${obj[prop]}: ${obj.value}`;
      }
      todayDetailsListItem.textContent = text;
      todayDetailsList.appendChild(todayDetailsListItem);
    });

    todayDetails.appendChild(todayDetailsList);
    todaySection.appendChild(todayDetails);
    // temporary

    return todaySection;
  },
};

export default function buildToday(weatherData) {
  todayBuilder.init(weatherData);
  return todayBuilder.render(weatherData);
}

// High / Low
// ex, 87° / 40°

// Wind
// ex, NNW 14 mph
