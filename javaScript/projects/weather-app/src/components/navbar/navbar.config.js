import Illustration from '../../assets/illustrations/undraw_weather_app.svg';
import IconMenu from '../../assets/icons/menu.svg';
import IconGithub from '../../assets/icons/github_mark/github-mark-white.svg';

export default {
  navLeft: [
    {
      element: 'a',
      attributes: {
        href: '#',
        class: 'nav_item nav_logo',
      },
      children: [
        {
          element: 'img',
          attributes: {
            src: Illustration,
            onload: 'SVGInject(this)',
          },
        },
        {
          element: 'h1',
          attributes: {
            textContent: 'Weather App',
          },
        },
      ],
    },
  ],
  navRight: [
    //   {
    //     element: 'div',
    //     attributes: {
    //       class: 'unit_systems_buttons',
    //     },
    //     children: [
    //       {
    //         element: 'button',
    //         attributes: {
    //           id: 'imperial',
    //           class: 'unit_systems_button selected',
    //           type: 'button',
    //           value: 'imperial',
    //           // textContent: '°F',
    //         },
    //       },
    //       {
    //         element: 'button',
    //         attributes: {
    //           id: 'metric',
    //           class: 'unit_systems_button',
    //           type: 'button',
    //           value: 'metric',
    //           // textContent: '°C',
    //         },
    //       },
    //     ],
    //   },
    {
      element: 'button',
      attributes: {
        id: 'unit_systems_button',
        type: 'button',
        value: true,
      },
      children: [
        {
          element: 'span',
          attributes: {
            class: 'imperial',
            textContent: '°F',
          },
        },
        {
          element: 'span',
          attributes: {
            class: 'metric',
            textContent: '°C',
          },
        },
      ],
    },
    {
      element: 'a',
      attributes: {
        href: '#',
        class: 'nav_item',
        textContent: 'Placeholder',
      },
    },
    {
      element: 'a',
      attributes: {
        href: '#',
        class: 'nav_item',
        textContent: 'Placeholder',
      },
    },
    {
      element: 'a',
      attributes: {
        href: 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/weather-app',
        target: '_blank',
        class: 'nav_item',
      },
      children: [
        {
          element: 'img',
          attributes: {
            src: IconGithub,
            onload: 'SVGInject(this)',
          },
        },
      ],
    },
  ],
  menuButton: {
    element: 'button',
    attributes: {
      class: 'nav_btn',
    },
    child: {
      element: 'img',
      attributes: {
        src: IconMenu,
        onload: 'SVGInject(this)',
      },
    },
  },
};
