import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import '@yunyoujun/ak-ui/dist/ak-ui.css';
import './style.css';
import { setupCookieConsent } from './cookie-consent.js';
import CookieConsentButton from './CookieConsentButton.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    setupCookieConsent();
  },
  // 在导航栏右侧（主题开关旁）追加手动打开 Cookie 偏好设置的按钮
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(CookieConsentButton),
    }),
};
