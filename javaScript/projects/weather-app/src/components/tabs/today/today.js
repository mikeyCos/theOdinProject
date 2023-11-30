import createElement from '../../../helpers/createElement';
import createContentRows from '../../../helpers/createContentRows';
import today from './today.config';
import formatTime from '../../../helpers/formatTime';

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

    todaySection.id = 'today';

    // temporary
    const todaySummary = createElement('section');
    const todayHeader = createElement('header');
    const todaySectionHeading = createElement('h2');
    const todayLocation = createElement('span');
    const todayTimeStamp = createElement('p');

    todaySummary.id = 'today_summary';
    todaySectionHeading.setAttributes({ textContent: 'TODAY' });
    todayLocation.textContent = ` - ${today.location.setText()}`;
    todayTimeStamp.textContent = `As of ${today.last_updated}`;

    todaySectionHeading.appendChild(todayLocation);
    todayHeader.appendChild(todaySectionHeading);
    todayHeader.appendChild(todayTimeStamp);
    todaySummary.appendChild(todayHeader);

    today.summary.forEach((detail) => {
      todaySummary.appendChild(
        createContentRows(createElement, null, detail.icon, detail.setText()),
      );
    });

    const todayDetails = createElement('section');
    todayDetails.id = 'today_details';

    today.details.forEach((detail) => {
      todayDetails.appendChild(
        createContentRows(createElement, null, detail.icon, detail.label, detail.setText()),
      );
    });

    todaySection.appendChild(todaySummary);
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
