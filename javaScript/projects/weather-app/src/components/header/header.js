import createElement from '../../helpers/createElement';
import pubSub from '../../containers/pubSub';
import header from './header.config';
import buildNavbar from '../navbar/navbar';
import { setUnitSystem } from '../tabs/unitsystems';
import '../../styles/header.css';

const headerBuilder = {
  cacheDOM(headerElement) {
    this.header = headerElement;
    this.form = headerElement.querySelector('#form');
    this.inputSearch = headerElement.querySelector('#location');
    this.inputUnitsystem = headerElement.querySelector('#unitsystem');
    this.inputErrors = headerElement.querySelectorAll('.validity_error');
  },
  bindEvents() {
    this.submitForm = this.submitForm.bind(this);
    this.setUnitSystem = this.setUnitSystem.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.form.addEventListener('submit', this.submitForm);
    pubSub.subscribe('setUnitSystem', this.setUnitSystem);
    pubSub.subscribe('setActiveTab', this.setActiveTab);
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

          if (input.error) formItem.appendChild(inputLabel);
          formItem.appendChild(formInput);
          if (input.error) formItem.appendChild(inputError);
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
    if (e) e.preventDefault();
    setUnitSystem(this.inputUnitsystem.value);
    pubSub.publish('getWeather', this.inputSearch.value, this.activeTab);
  },
  setUnitSystem(selection) {
    this.inputUnitsystem.value = selection;
    if (this.inputSearch.value.length !== 0) {
      this.submitForm();
    }
  },
  setActiveTab(key) {
    this.activeTab = key;
  },
};

export default function buildHeader() {
  return headerBuilder.render();
}
