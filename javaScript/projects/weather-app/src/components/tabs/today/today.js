import createElement from '../../../helpers/createElement';
import createContentRows from '../../../helpers/createContentRows';
import today from './today.config';
import '../../../styles/tabs/today.css';
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
    const todaySectionHeading = createElement('h3');
    const todayTimeStamp = createElement('span');

    todaySummary.id = 'today_summary';
    // todaySectionHeading.setAttributes({ textContent: 'TODAY' });
    todaySectionHeading.textContent = `${today.location.setText()} `;
    todayTimeStamp.textContent = `As of ${today.last_updated}`;

    todaySectionHeading.appendChild(todayTimeStamp);
    todayHeader.appendChild(todaySectionHeading);
    todaySummary.appendChild(todayHeader);

    today.summary.forEach((detail) => {
      todaySummary.appendChild(
        createContentRows(createElement, null, detail.icon, detail.setText()),
      );
    });

    const todayDetails = createElement('section');
    todayDetails.id = 'today_details';

    const todayDetailsHeader = createElement('div');
    const todayDetailsContainer = createElement('div');
    todayDetailsHeader.classList.add('today_details_header');
    todayDetailsContainer.classList.add('today_details_container');

    todayDetailsHeader.appendChild(
      createContentRows(
        createElement,
        null,
        today.details.header[0].icon,
        today.details.header[0].label,
        today.details.header[0].setText(),
      ),
    );

    const todayDetailsSun = createElement('div');
    todayDetailsSun.classList.add('today_details_sun');
    today.details.header.forEach((detail, i) => {
      if (i > 0) {
        todayDetailsSun.appendChild(
          createContentRows(createElement, null, detail.icon, detail.label, detail.setText()),
        );
      }
    });

    today.details.body.forEach((detail) => {
      todayDetailsContainer.appendChild(
        createContentRows(createElement, null, detail.icon, detail.label, detail.setText()),
      );
    });

    todayDetailsHeader.appendChild(todayDetailsSun);
    todaySection.appendChild(todaySummary);
    todayDetails.appendChild(todayDetailsHeader);
    todayDetails.appendChild(todayDetailsContainer);
    todaySection.appendChild(todayDetails);
    // temporary

    return todaySection;
  },
};

export default function buildToday(weatherData, timeStamp) {
  // console.log(timeStamp);
  today.init(weatherData, timeStamp);
  return todayBuilder.render();
}

// High / Low
// ex, 87° / 40°

// Wind
// ex, NNW 14 mph
