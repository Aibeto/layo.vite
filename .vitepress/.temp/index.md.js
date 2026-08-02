import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
//#region index.md
var __pageData = JSON.parse("{\"title\":\"\",\"description\":\"\",\"frontmatter\":{\"layout\":\"home\",\"hero\":{\"name\":\"RAINCRAT:LAYOSERVE\",\"text\":\"雨绘巷：泠域存储\",\"tagline\":\"何意味？\",\"actions\":[{\"theme\":\"brand\",\"text\":\"查看blogs\",\"link\":\"/blog/\"},{\"theme\":\"brand\",\"text\":\"查看文档\",\"link\":\"/docs/\"},{\"theme\":\"alt\",\"text\":\"Markdown 示例\",\"link\":\"/markdown-examples\"},{\"theme\":\"alt\",\"text\":\"运行时 API 示例\",\"link\":\"/api-examples\"}]},\"features\":[{\"title\":\"网站正在建设中\",\"details\":\"本网站仍在建设，暂未投入生产环境使用。\",\"link\":\"/\"},{\"title\":\"ICP备案\",\"details\":\"萌ICP备 20260812 号<br />\\n点击前往萌国ICP备案查询\\n\",\"link\":\"https://icp.gov.moe/?keyword=20260812\"}]},\"headers\":[],\"relativePath\":\"index.md\",\"filePath\":\"index.md\"}");
var _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var layo_vite_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, layo_vite_default as default };
