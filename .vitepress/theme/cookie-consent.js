// 第三方 Cookie 同意管理器：vanilla-cookieconsent（MIT，零依赖）
// 集成 Microsoft Clarity Consent API V2：用户同意状态变化时实时同步给 Clarity
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

// Clarity 使用的 Cookie（用户撤销分析同意时自动清除）
const CLARITY_COOKIES = [{ name: '_clck' }, { name: '_clsk' }, { name: '_cltk' }];

// 同会话内"已刷新确认生效"的标记 key
const REFRESH_MARKER = 'cc-refreshed-for-clarity';

// 读取回调参数或当前偏好中的已接受类别（回调 cookie 参数优先，避免时序问题）
function getAcceptedCategories(cookie) {
  if (cookie?.categories?.length) return cookie.categories;
  return CookieConsent.getUserPreferences().acceptedCategories;
}

// 将用户偏好同步到 Clarity Consent API V2
function syncClarityConsent(cookie) {
  if (typeof window === 'undefined') return;
  const hasAnalytics = getAcceptedCategories(cookie).includes('analytics');
  window.clarity?.('consentv2', {
    ad_Storage: 'denied', // 本站暂无广告投放
    analytics_Storage: hasAnalytics ? 'granted' : 'denied',
  });
}

// Clarity 已在 denied 状态下加载，授予权限后需刷新才会以 granted 重新收集；
// 同理，撤销权限后也需刷新才能彻底停止收集（autoClear.reloadPage 依赖存在匹配 Cookie，
// 不保证触发）。故只要 analytics 接受状态发生变化就刷新一次：
// sessionStorage 记录上次状态以区分「首次拒绝」（本就未收集，不刷新）与真正的状态变更。
function reloadForClarity(cookie) {
  if (typeof window === 'undefined') return;
  const hasAnalytics = getAcceptedCategories(cookie).includes('analytics');
  const currentState = hasAnalytics ? 'granted' : 'denied';
  try {
    const lastState = sessionStorage.getItem(REFRESH_MARKER);
    if (lastState === currentState) return;
    // 首次拒绝：config.js 默认 consentv2 为 denied，Clarity 从未运行，仅记录状态无需刷新
    if (lastState === null && currentState === 'denied') {
      sessionStorage.setItem(REFRESH_MARKER, currentState);
      return;
    }
    sessionStorage.setItem(REFRESH_MARKER, currentState);
  } catch {
    /* 隐私模式下 sessionStorage 不可用：无法区分首次拒绝与撤销，状态变化一律刷新（可接受） */
  }
  // 稍作延迟，确保 consentv2 已推入 Clarity 队列后再刷新
  setTimeout(() => window.location.reload(), 300);
}

const translations = {
  zh: {
    consentModal: {
      title: '我们重视你的隐私',
      description:
        '本站使用 Microsoft Clarity 统计访问数据以改进内容体验，不收集可识别个人身份的信息。',
      acceptAllBtn: '全部允许',
      acceptNecessaryBtn: '仅必需',
      showPreferencesBtn: '自定义',
    },
    preferencesModal: {
      title: 'Cookie 偏好设置',
      acceptAllBtn: '全部允许',
      acceptNecessaryBtn: '仅必需',
      savePreferencesBtn: '保存偏好',
      closeIconLabel: '关闭',
      sections: [
        {
          title: '必需 Cookie',
          description: '保证站点基本功能正常运行，无法关闭。',
          linkedCategory: 'necessary',
        },
        {
          title: 'Microsoft Clarity 分析',
          description:
            '通过 Microsoft Clarity 收集页面访问情况，仅用于改进站点内容。',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  en: {
    consentModal: {
      title: 'We value your privacy',
      description:
        'This site uses Microsoft Clarity to analyze visits and improve content. No personally identifiable information is collected.',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject all',
      showPreferencesBtn: 'Customize',
    },
    preferencesModal: {
      title: 'Cookie Preferences',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject all',
      savePreferencesBtn: 'Save',
      closeIconLabel: 'Close',
      sections: [
        {
          title: 'Necessary cookies',
          description: 'Required for basic site functionality. Cannot be disabled.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analytics',
          description:
            'Microsoft Clarity collects visit data to improve content.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
};

// 在客户端初始化同意横幅（SSR 阶段直接跳过）
export function setupCookieConsent() {
  if (typeof window === 'undefined') return;

  CookieConsent.run({
    guiOptions: {
      consentModal: { layout: 'box', position: 'bottom left', equalWeightButtons: true },
      preferencesModal: { layout: 'box', equalWeightButtons: true },
    },
    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {
        autoClear: {
          cookies: CLARITY_COOKIES,
          reloadPage: true,
        },
      },
    },
    language: {
      default: 'zh',
      translations,
    },
    // 首次同意、偏好变更时同步给 Clarity，并刷新一次让 Clarity 以 granted 重新加载生效
    onFirstConsent: ({ cookie }) => {
      syncClarityConsent(cookie);
      reloadForClarity(cookie);
    },
    onConsent: ({ cookie }) => {
      syncClarityConsent(cookie);
      reloadForClarity(cookie);
    },
    // 状态变化（授予或撤销）时同步给 Clarity，并刷新一次确保立即生效
    onChange: ({ cookie }) => {
      syncClarityConsent(cookie);
      reloadForClarity(cookie);
    },
  }).then(() => {
    // 页面加载时恢复已保存的偏好：config.js 注入的默认 consentv2 为 denied，
    // 已同意过 analytics 的用户刷新后需在此重新授予，保证 Clarity 持续收集。
    syncClarityConsent();
  });
}
