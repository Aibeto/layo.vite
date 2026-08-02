import DefaultTheme from 'vitepress/theme';
import '@yunyoujun/ak-ui/dist/ak-ui.css';
import './style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
};
