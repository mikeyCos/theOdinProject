import createElement from '../../../helpers/createElement';
import tabs from './tabs_navbar.config';

const tabsNavbarBuilder = {
  init() {},
  cacheDOM() {},
  bindEvents() {},
  render() {
    const tabsNavbar = createElement('section');
    const tabsList = createElement('ul');
    tabsNavbar.id = 'tabs_navbar';
    Object.values(tabs).forEach((tab) => {
      const tabsListItem = createElement('li');
      const tabsNavAnchor = createElement('a');
      tabsListItem.setAttributes({ class: 'tabs_list_item' });
      tabsNavAnchor.setAttributes(tab.attributes);

      tabsListItem.appendChild(tabsNavAnchor);
      tabsList.appendChild(tabsListItem);
    });

    tabsNavbar.appendChild(tabsList);
    return tabsNavbar;
  },
};

export default function buildTabsNavbar() {
  return tabsNavbarBuilder.render();
}
