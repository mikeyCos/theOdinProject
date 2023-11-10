export default [
  {
    element: 'h1',
    attributes: {
      id: 'hero',
      textContent: 'weather app',
    },
  },
  {
    element: 'form',
    attributes: {
      id: 'form',
    },
    inputs: [
      {
        element: 'input',
        attributes: {
          id: 'location',
          class: 'form_input',
          name: 'location',
          type: 'search',
          placeholder: 'Enter city or postal code',
        },
      },
    ],
  },
];
