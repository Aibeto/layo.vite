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
  theme/
    index.js       # 主题入口（唯一生效的入口，extends DefaultTheme）
    style.css      # 全局样式与 ak-ui 组件替换（保留双份规则）
index.md           # 首页（hero + features）
docs/              # 文档页
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
8. 构建产物与缓存（`.vitepress/dist`、`.vitepress/cache`、`.vitepress/.temp`）已被 `.gitignore` 忽略，不要提交。
9. 网络资源（如 ak-ui CDN CSS、Google 字体 Noto Sans/Serif SC）通过 `config.js` 的 `head` 配置注入。
10. 每次完成任务后检查是否需要更新 `AGENTS.md`。
11. **全站主题变量映射集中在 `style.css` 顶部**：`--ak-*` 调色板/字体变量 → `--vp-c-*`（明/暗双主题）、`--vp-button-*`、`--vp-home-hero-*`、`--vp-custom-block-*`。新增全站风格化时优先改变量映射，避免硬编码颜色；文档风格化（导航/侧边栏/代码块/表格/引用/滚动条）位于 style.css 的"组件细节"区块。