import DefaultTheme from 'vitepress/theme';
import '@yunyoujun/ak-ui/dist/ak-ui.css';
import './style.css';
import { setupCookieConsent } from './cookie-consent.js';

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    setupCookieConsent();
  }
};
