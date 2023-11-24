import createElement from '../../../helpers/createElement';
import createContentRows from '../../../helpers/createContentRows';
import today from './today.config';

const todayBuilder = {
  init() {},
  cacheDOM() {
    console.log('cacheDOM() running from today.js');
  },
  bindEvents() {
    console.log('bindEvents() running from today.js');
  },
  render() {
    console.log(today);
    const todaySection = createElement('section');
    const todaySectionHeading = createElement('h1');
    todaySection.id = 'today';
    todaySectionHeading.setAttributes({ textContent: 'TODAY' });
    todaySection.appendChild(todaySectionHeading);

    // temporary
    const todaySummary = createElement('section');
    todaySummary.id = 'today_summary';

    ['temp_f', 'condition'].forEach((item) => {
      todaySummary.appendChild(createContentRows(createElement, null, today.data[item].setText()));
    });

    const todayDetails = createElement('section');
    todayDetails.id = 'today_details';
    Object.keys(today.data).forEach((key, i) => {
      if (i > 1) {
        console.log(key);
        todayDetails.appendChild(
          createContentRows(
            createElement,
            null,
            today.data[key].setLabel ? today.data[key].setLabel() : today.data[key].text,
            today.data[key].setText(),
          ),
        );
      }
    });

    todaySection.appendChild(todaySummary);
    todaySection.appendChild(todayDetails);
    // temporary

    return todaySection;
  },
};

export default function buildToday(weatherData) {
  today.init('imperial', weatherData);
  return todayBuilder.render(weatherData);
}

// High / Low
// ex, 87° / 40°

// Wind
// ex, NNW 14 mph
