# AGENTS.md

面向 AI 代理的项目工作约定。修改本项目前请先阅读本文。

## 项目概览

- 技术栈：VitePress 2.0（alpha）+ Vue 3，纯静态文档/博客站点。
- 内容：`index.md`（首页）+ `docs/`（文档页）。
- UI：VitePress 默认主题（`DefaultTheme`）+ `@yunyoujun/ak-ui`（明日方舟风格 UI 组件库）。
- 语言：站内内容与交流统一使用中文（zh-CN）。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run docs:dev` | 启动开发服务器（默认端口 5173） |
| `npm run docs:build` | 构建到 `.vitepress/dist` |
| `npm run docs:preview` | 预览构建产物 |

## 项目结构

```
.vitepress/
  config.js        # 站点配置（唯一生效的配置入口）
  seo.js           # SEO/GEO 工具模块：URL 派生、页面 head 注入、robots/llms 生成
  seo-config.js    # SEO 独立配置：所有 SEO 变量集中于此，默认沿用 config.js 的值
  theme/
    index.js       # 主题入口（唯一生效的入口，extends DefaultTheme，Layout 插槽注入导航栏按钮）
    style.css      # 全局样式与 ak-ui 组件替换（保留双份规则）
    cookie-consent.js # 第三方 Cookie 同意管理器（vanilla-cookieconsent）+ Clarity 同意同步
    CookieConsentButton.vue # 导航栏右上角手动弹出 Cookie 偏好设置的按钮（theme/index.js 的 Layout 插槽引入）
index.md           # 首页（hero + features）
docs/              # 文档页
.env               # 站点配置唯一来源：VITE_SITE_*（站点基础）+ VITE_SEO_*（SEO 独立覆盖）
package.json
```

## 关键约定（务必遵守）

1. **主题入口只允许 `theme/index.js`**。不要新增 `index.ts`：Vite 按 `.js` → `.ts` 顺序解析，`.ts` 会被 `.js` 遮蔽而永远不生效。
2. **配置入口只允许 `config.js`**。不要新增 `config.mts`，同样会被遮蔽。
3. **ak-ui 样式"保留双份"规则**：当需要用 ak-ui 类名替换原有样式名时，复制一份 `ak-*` 规则改名为目标名（如 `.ak-button` → `.button`），**不要直接修改原 `.ak-*` 规则**，保证两套类名同时可用。所有替换集中在 `theme/style.css` 的"ak-ui 组件替换"区块。
4. **覆盖 VitePress 内置 scoped 样式必须加 `!important`**（如 `.VPButton`、`.VPFeature`、`.VPHero .name`）。
5. **不要修改 `node_modules`**。对 ak-ui 的定制一律通过 `style.css` 覆盖实现（CI 重装依赖后 node_modules 会还原）。
6. 首页 Hero 标题宽度覆盖位于 `style.css` 中 `.VPHero .name` 的 `max-width` 规则。
7. 提交信息遵循 Conventional Commits（见 `.trae/rules/git-commit-message.md`）：`<type>(<scope>): <subject>`，type 小写英文、subject 中文，一次提交一个核心改动。
8. 构建产物与缓存已被 `.gitignore` 忽略，不要提交。忽略范围覆盖多目录构建场景：根目录（`.vitepress/dist`、`.vitepress/cache`、`.vitepress/.temp`）与子目录（`./blogs/.vitepress/`、`./docs/.vitepress/` 的 `dist`/`cache`）。
9. 网络资源（如 ak-ui CDN CSS、Google 字体 Noto Sans/Serif SC）通过 `config.js` 的 `head` 配置注入。
10. 每次完成任务后检查是否需要更新 `AGENTS.md`。
11. **全站主题变量映射集中在 `style.css` 顶部**：`--ak-*` 调色板/字体变量 → `--vp-c-*`（明/暗双主题）、`--vp-button-*`、`--vp-home-hero-*`、`--vp-custom-block-*`。新增全站风格化时优先改变量映射，避免硬编码颜色；文档风格化（导航/侧边栏/代码块/表格/引用/滚动条）位于 style.css 的"组件细节"区块。
12. **SEO/GEO 无硬链接**：站点与 SEO 变量全部来自 `.env`——`VITE_SITE_*`（URL/站名/描述/语言/主题色）在 `config.js` 读取，`VITE_SEO_*`（SEO 站名/描述/备选名/作者/OG/Twitter/robots）在 `seo-config.js` 读取，未设置时回退到站点基础变量或代码默认值，代码内不硬编码域名与站名；描述类变量允许换行（双引号 + `\n`，或双引号内真实换行），代码侧统一经 `expandNewlines` 归为真实换行；`sitemap.xml`、`robots.txt`、`llms.txt` 由 VitePress 内置 `sitemap` 配置与 `config.js` 的 `buildEnd` 钩子在构建时自动生成，页面级 canonical/OG/JSON-LD 由 `transformHead` 钩子注入（实现集中在 `.vitepress/seo.js`）。新增 SEO 逻辑一律在 `seo.js` 中实现，不要在页面里写死绝对地址。需要跳过 SEO 的页面在 `seo.js` 的 `SEO_EXCLUDE_PAGES` 中配置：`pages`（精确页）、`dirs`（目录前缀，整目录排除）、`patterns`（正则）。