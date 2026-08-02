import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region docs/index.md
var __pageData = JSON.parse("{\"title\":\"这是文档站首页\",\"description\":\"\",\"frontmatter\":{\"layout\":\"home\"},\"headers\":[],\"relativePath\":\"docs/index.md\",\"filePath\":\"docs/index.md\"}");
var _sfc_main = { name: "docs/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="这是文档站首页" tabindex="-1">这是文档站首页 <a class="header-anchor" href="#这是文档站首页" aria-label="Permalink to “这是文档站首页”">​</a></h1></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("docs/index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var docs_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, docs_default as default };
