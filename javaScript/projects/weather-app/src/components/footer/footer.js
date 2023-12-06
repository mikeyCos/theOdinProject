import createElement from '../../helpers/createElement';
import '../../styles/footer.css';

const footerBuilder = {
  cacheDOM(footerElement) {},
  bindEvents() {},
  render() {
    const footerElement = createElement('footer');
    const footerAnchorWrapper = createElement('div');
    const footerAnchor = createElement('a');
    footerAnchorWrapper.textContent = 'Powered by ';
    footerElement.id = 'footer';

    footerAnchor.setAttributes({
      href: 'https://www.weatherapi.com/',
      target: '_blank',
      textContent: 'Weather API',
    });

    footerAnchorWrapper.appendChild(footerAnchor);
    footerElement.appendChild(footerAnchorWrapper);
    return footerElement;
  },
};

export default function buildfooter() {
  return footerBuilder.render();
}
