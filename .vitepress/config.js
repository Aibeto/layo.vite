import { defineConfig } from 'vitepress';

export default defineConfig({
  base: "/",
  title: "LAYOSERVE",
  description: "A VitePress Blog with Theme",
  lang: "zh-CN",
  cleanUrls: true,
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/YunYouJun/ak-ui@gh-pages/css/ak-ui.min.css'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@100..900&family=Noto+Serif+SC:wght@100..900&display=swap'
      }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: "首页", link: '/' },
    ],

    sidebar: [
      {
        // text: "示例",
        // items: [
        // { text: "Markdown 示例", link: '/markdown-examples' },
        // { text: "运行时 API 示例", link: '/api-examples' }
        // ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RAINCRAT/layo.vite' }
    ],

    search: {
      provider: 'local',
    },
  },
});
