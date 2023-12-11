import createElement from '../../helpers/createElement';
import '../../styles/home.css';
import home from './home.config';

const homeBuilder = {
  cacheDOM() {},
  bindEvents() {},
  render() {
    const homeSection = createElement('section');
    homeSection.id = 'home';
    home.forEach((item) => {
      const section = createElement(item.element);
      section.setAttributes(item.attributes);

      if (item.children) {
        item.children.forEach((subItem) => {
          const subSection = createElement(subItem.element);
          subSection.setAttributes(subItem.attributes);
          section.appendChild(subSection);
        });
      }
      homeSection.appendChild(section);
    });

    return homeSection;
  },
};

export default function buildHome() {
  return homeBuilder.render();
}
