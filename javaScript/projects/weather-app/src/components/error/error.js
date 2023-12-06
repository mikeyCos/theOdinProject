import createElement from '../../helpers/createElement';
import '../../styles/error.css';

const errorBuilder = {
  init(weatherError) {
    this.setError(weatherError);
  },
  setError(error) {
    this.error = error.error;
    this.errorMessage = `Error code: ${error.status}
    ${error.error.message}`;
  },
  cacheDOM() {},
  bindEvents() {},
  render() {
    const errorSection = createElement('section');
    const errorHeading = createElement('h2');
    errorSection.id = 'error';
    errorHeading.setAttributes({ textContent: this.errorMessage });

    errorSection.appendChild(errorHeading);
    return errorSection;
  },
};

export default function errorHeader(weatherError) {
  errorBuilder.init(weatherError);
  return errorBuilder.render();
}
