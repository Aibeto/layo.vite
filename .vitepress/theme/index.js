import DefaultTheme from 'vitepress/theme';
import { VPBArchives, VPBHome, VPBTags } from '@chunge16/vitepress-blogs-theme';
import '@yunyoujun/ak-ui/dist/ak-ui.css';
import './style.css';
import { setupCookieConsent } from './cookie-consent.js';
import Layout from './Layout.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    setupCookieConsent();
    // VPB 布局组件：供 blogs 页面（<VPBHome />、<VPBArchives />、<VPBTags />）使用
    app.component('VPBHome', VPBHome);
    app.component('VPBArchives', VPBArchives);
    app.component('VPBTags', VPBTags);
  },
  // 组合布局：博客文章/作者页插槽 + 导航栏 Cookie 按钮（见 Layout.vue）
  Layout,
};
