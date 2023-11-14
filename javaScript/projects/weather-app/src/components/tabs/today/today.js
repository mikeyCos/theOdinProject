import createElement from '../../../utilities/createElement';

const todayBuilder = {
  cacheDOM() {
    console.log('cacheDOM() running from today.js');
  },
  bindEvents() {
    console.log('bindEvents() running from today.js');
  },
  render() {
    console.log('render() running from today.js');
    const todaySection = createElement('section');
    const todaySectionHeading = createElement('h1');
    todaySection.id = 'today';
    todaySectionHeading.setAttributes({ textContent: 'TODAY' });
    todaySection.appendChild(todaySectionHeading);

    return todaySection;
  },
};

export default function buildToday(weatherData) {
  console.log(weatherData);
  return todayBuilder.render();
}
