import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitepress';
import { processData } from '@chunge16/vitepress-blogs-theme/config';
import { enUS, zhCN } from 'date-fns/locale';

export default defineConfig({
  base: "/",
  title: "LAYOSERVE",
  description: "A VitePress Blog with Theme",
  lang: "zh-CN",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: '/' },
      { text: "示例", link: '/markdown-examples' },
      {
        text: "Blog",
        activeMatch: '/blog/',
        items: [
          {
            text: "博客首页",
            link: '/blog/',
            activeMatch: '/blog/$',
          },
          {
            text: "标签",
            link: '/blog/tags',
            activeMatch: '/blog/tags',
          },
          {
            text: "归档",
            link: '/blog/archives',
            activeMatch: '/blog/archives',
          },
          // {
            // text: 'RSS Feed',
            // link: '/blog/feed.rss',
          // },
        ],
      },
    ],

    sidebar: [
      {
        text: "示例",
        items: [
          { text: "Markdown 示例", link: '/markdown-examples' },
          { text: "运行时 API 示例", link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    blog: {
      title: "LAYOSERVE",
      description: "A VitePress Blog with Theme",
      defaultAuthor: "LAYOSERVE",
      categoryIcons: {
          article: 'i-[carbon--notebook]',
          tutorial: 'i-[carbon--book]',
          document: 'i-[carbon--document]',
      },
      tagIcons: {
        github: 'i-[carbon--logo-github]',
        vue: 'i-[logos--vue]',
        javascript: 'i-[logos--javascript]',
        'web development': 'i-[carbon--development]',
        html: 'i-[logos--html-5]',
        git: 'i-[logos--git-icon]',
        vite: 'i-[logos--vitejs]',
        locked: 'i-[carbon--locked]',
        react: 'i-[logos--react]',
        blog: 'i-[carbon--blog]',
        comment: 'i-[carbon--add-comment]',
      },
      dateConfig: {
        format: "yyyy/MM/dd",
        locale: zhCN
      }
    },
    
    search: {
      provider: 'local',
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@chunge16/vitepress-blogs-theme'],
    },
    ssr: {
      noExternal: ['@chunge16/vitepress-blogs-theme']
    },
  },

  async transformPageData(pageData, ctx) {
    await processData(pageData, ctx);
  },
});
