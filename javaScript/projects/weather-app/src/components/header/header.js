import createElement from '../../utilities/createElement';
import pubSub from '../../containers/pubSub';
import header from './header.config';
import buildNavbar from '../navbar/navbar';

const headerBuilder = {
  cacheDOM(headerElement) {
    this.header = headerElement;
    this.form = headerElement.querySelector('#form');
    this.inputSearch = headerElement.querySelector('#location');
    this.inputErrors = headerElement.querySelectorAll('.validity_error');
  },
  bindEvents() {
    this.submitForm = this.submitForm.bind(this);
    this.form.addEventListener('submit', this.submitForm);
  },
  render() {
    const headerElement = createElement('header');
    headerElement.id = 'header';
    headerElement.appendChild(buildNavbar.render());

    Object.keys(header).forEach((key) => {
      const headerItem = createElement(header[key].element);
      headerItem.setAttributes(header[key].attributes);

      if (header[key].inputs) {
        header[key].inputs.forEach((input) => {
          const formItem = createElement('div');
          const inputLabel = createElement('label');
          const formInput = createElement(input.element);
          const inputError = createElement('span');

          inputError.setAttributes({
            class: `validity_error ${input.attributes.id}`,
            textContent: input.error,
          });
          formInput.setAttributes(input.attributes);
          inputLabel.setAttributes({
            for: input.attributes.id,
            textContent: input.attributes.placeholder,
          });
          formItem.setAttributes({ class: 'form_item' });

          formItem.appendChild(inputLabel);
          formItem.appendChild(formInput);
          formItem.appendChild(inputError);
          headerItem.appendChild(formItem);
        });
      }

      headerElement.appendChild(headerItem);
    });

    this.cacheDOM(headerElement);
    this.bindEvents();
    return headerElement;
  },
  submitForm(e) {
    e.preventDefault();
    console.log(this.inputSearch.value);
    pubSub.publish('getWeather', this.inputSearch.value);
  },
};

export default function buildHeader() {
  return headerBuilder.render();
}
