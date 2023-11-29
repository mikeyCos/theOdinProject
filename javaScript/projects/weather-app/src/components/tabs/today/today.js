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
    const todayDetails = createElement('section');
    todayDetails.id = 'today_details';

    Object.keys(today.details).forEach((key, i) => {
      todayDetails.appendChild(
        createContentRows(
          createElement,
          null,
          today.details[key].icon,
          today.details[key].setLabel,
          today.details[key].setText(),
        ),
      );
    });

    // todaySection.appendChild(todaySummary);
    // todayDetails.appendChild(todayDetailsList);
    todaySection.appendChild(todayDetails);
    // temporary

    return todaySection;
  },
};

export default function buildToday(weatherData, timeStamp) {
  console.log(timeStamp);
  today.init(weatherData, 'imperial', timeStamp);
  return todayBuilder.render();
}

// High / Low
// ex, 87° / 40°

// Wind
// ex, NNW 14 mph
