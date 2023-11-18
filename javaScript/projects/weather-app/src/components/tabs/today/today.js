import createElement from '../../../utilities/createElement';
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
    console.log(today.print());
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
    Object.keys(today.data).forEach((key) => {
      todayDetails.appendChild(
        createContentRows(
          createElement,
          today.data[key].setLabel ? today.data[key].setLabel() : today.data[key].text,
          today.data[key].setText(),
        ),
      );
    });

    todaySection.appendChild(todayDetails);
    // temporary

    return todaySection;
  },
};

export default function buildToday(weatherData) {
  today.setProperties('imperial', weatherData);
  return todayBuilder.render(weatherData);
}

// High / Low
// ex, 87° / 40°

// Wind
// ex, NNW 14 mph
