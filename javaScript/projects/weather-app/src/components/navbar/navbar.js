import '../../styles/header.css';
import navbar from './navbar.config';
import createElement from '../../helpers/createElement';
import pubSub from '../../containers/pubSub';

export default {
  cacheDOM(navElement) {
    this.navbar = navElement;
    this.navRight = navElement.querySelector('.nav_right');
    this.navLinks = navElement.querySelectorAll('.nav_item');
    this.navBtn = navElement.querySelector('.nav_btn');
    // this.unitSystemsBtns = navElement.querySelectorAll('.unit_systems_button');
    this.unitSystemsBtn = navElement.querySelector('#unit_systems_button');
  },
  bindEvents() {
    this.toggleNav = this.toggleNav.bind(this);
    // this.setUnitSystem = this.setUnitSystem.bind(this);
    this.navBtn.addEventListener('click', this.toggleNav);
    // this.unitSystemsBtns.forEach((btn) => btn.addEventListener('click', this.setUnitSystem));
    this.toggleUnitSystem = this.toggleUnitSystem.bind(this);
    this.unitSystemsBtn.addEventListener('click', this.toggleUnitSystem);
  },
  render() {
    const navElement = createElement('nav');
    const navContainer = createElement('div');
    navElement.id = 'navbar';
    navContainer.classList.add('container');

    Object.keys(navbar).forEach((key) => {
      if (Array.isArray(navbar[key])) {
        const section = createElement('ul');
        section.classList.add(key.toLowerCase().includes('left') ? 'nav_left' : 'nav_right');
        navbar[key].forEach((item) => {
          const li = createElement('li');
          const element = createElement(item.element);
          element.setAttributes(item.attributes);

          if (item.children) {
            item.children.forEach((child) => {
              const childNode = createElement(child.element);
              childNode.setAttributes(child.attributes);
              element.appendChild(childNode);
            });
          }

          li.appendChild(element);
          section.appendChild(li);
        });
        navContainer.appendChild(section);
      } else {
        const btn = createElement(navbar[key].element);
        const img = createElement(navbar[key].child.element);
        btn.setAttributes(navbar[key].attributes);
        img.setAttributes(navbar[key].child.attributes);
        btn.appendChild(img);
        navContainer.appendChild(btn);
      }
    });

    navElement.appendChild(navContainer);
    this.cacheDOM(navElement);
    this.bindEvents();

    return navElement;
  },
  toggleNav() {
    if (this.navRight.classList.contains('visible')) {
      this.navRight.classList.remove('visible');
    } else {
      this.navRight.classList.add('visible');
    }
  },
  // setUnitSystem(e) {
  //   const element = e.currentTarget;
  //   [...this.unitSystemsBtns]
  //     .find((btn) => btn.classList.contains('selected'))
  //     .classList.remove('selected');
  //   element.classList.add('selected');
  //   pubSub.publish('setUnitSystem', element.value);
  // },
  toggleUnitSystem(e) {
    const element = e.currentTarget;
    console.log(element);
    console.log(typeof element.value);
    let newValue = true;
    let unitSystem = 'imperial';
    if (element.value === 'true') {
      newValue = false;
      unitSystem = 'metric';
    }
    element.value = newValue;
    pubSub.publish('setUnitSystem', unitSystem);
    // pubSub.publish('setUnitSystem', element.value);
  },
};
