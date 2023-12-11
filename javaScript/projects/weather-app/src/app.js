import './app.css';
import '@iconfu/svg-inject';
import createElement from './helpers/createElement';
import headerBuilder from './components/header/header';
import mainBuilder from './components/main/main';
import footerBuilder from './components/footer/footer';
import './containers/api_controller';

(() => {
  const build = {
    header: headerBuilder,
    main: mainBuilder,
    footer: footerBuilder,
  };

  const app = {
    init() {
      this.render();
    },
    render() {
      const appWrapper = createElement('div');
      const appContent = createElement('div');
      appWrapper.id = 'weather_app';
      appContent.id = 'content';

      appWrapper.appendChild(build.header());
      appContent.appendChild(build.main());
      appWrapper.appendChild(appContent);
      appWrapper.appendChild(build.footer());

      document.body.appendChild(appWrapper);
    },
  };

  app.init();
})();
