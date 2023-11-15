import createElement from '../../../utilities/createElement';
import today from './today.config';

const todayBuilder = {
  init(weatherData) {
    today.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        const value = weatherData.current[key]
          ? weatherData.current[key]
          : weatherData.forecast.forecastday[0].day[key];
        Object.assign(obj, { value });
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
    today.forEach((obj) => {
      const todaySummaryListItem = createElement('li');
      const text = [];
      Object.values(obj).forEach((value) => {
        text.push(value);
      });
      todaySummaryListItem.textContent = text.join(' ');
      todaySummaryList.appendChild(todaySummaryListItem);
    });

    todaySummary.appendChild(todaySummaryList);
    todaySection.appendChild(todaySummary);
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
