import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region readme.md
var __pageData = JSON.parse("{\"title\":\"关于本仓库\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"readme.md\",\"filePath\":\"readme.md\"}");
var _sfc_main = { name: "readme.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="关于本仓库" tabindex="-1">关于本仓库 <a class="header-anchor" href="#关于本仓库" aria-label="Permalink to “关于本仓库”">​</a></h1><p>这是LAYOSERVE泠域存储集文档和博客为一体的站点，使用vitepress构建。</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("readme.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var readme_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, readme_default as default };
