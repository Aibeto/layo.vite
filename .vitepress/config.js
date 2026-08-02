import { defineConfig, loadEnv } from 'vitepress';
import { buildPageHeadTags, buildSeoArtifacts, transformSitemapItems } from './seo.js';

// 站点 URL 唯一来源：.env 的 VITE_SITE_URL（不硬编码域名）
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '');

const siteName = 'LAYOSERVE泠域存储 官方站点';
const siteDescription = 'RAINCRAT雨绘巷·LAYOSERVE泠域存储\n网站正在开发中';

export default defineConfig({
  base: "/",
  title: siteName,
  description: siteDescription,
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
    ],
    // 全站静态 SEO meta
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'author', content: 'LAYOSERVE' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'theme-color', content: '#0e86b8' }],
    [
      'script',
      {},
      // RAINCRAT 雨绘巷
      // `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "xw4lptvvar");`

      // LAYOSERVE 泠域存储
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "xw58fwyen0");`
    ]
  ],

  // 构建时自动生成 sitemap.xml（VitePress 2.0 内置）
  ...(siteUrl
    ? {
      sitemap: {
        hostname: `${siteUrl}/`,
        transformItems: transformSitemapItems,
      },
    }
    : {}),

  // 每页动态注入 canonical / OG / Twitter / JSON-LD（URL 均由 siteUrl 派生）
  transformHead(ctx) {
    const { pageData, siteData } = ctx;
    return buildPageHeadTags({
      siteUrl,
      siteName,
      siteDescription,
      siteLang: siteData.lang,
      base: siteData.base,
      cleanUrls: siteData.cleanUrls,
      pageData,
    });
  },

  // 构建完成后自动生成 robots.txt 与 llms.txt（GEO）
  async buildEnd(siteConfig) {
    await buildSeoArtifacts(siteConfig, { siteUrl, siteName, siteDescription });
  },

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
