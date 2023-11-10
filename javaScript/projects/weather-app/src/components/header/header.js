import createElement from '../../utilities/createElement';
import header from './header.config';
import buildNavbar from '../navbar/navbar';

export default {
  cacheDOM(headerElement) {
    this.header = headerElement;
    this.form = headerElement.querySelector('#form');
    this.inputSearch = headerElement.querySelector('#location');
    console.log(this.header);
    console.log(this.inputSearch);
  },
  bindEvents() {},
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

          formInput.setAttributes(input.attributes);
          inputLabel.setAttributes({ for: input.attributes.id });
          formItem.setAttributes({ class: 'form_item' });

          formItem.appendChild(inputLabel);
          formItem.appendChild(formInput);
          headerItem.appendChild(formItem);
        });
      }

      headerElement.appendChild(headerItem);
    });

    this.cacheDOM(headerElement);
    return headerElement;
  },
};
