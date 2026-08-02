// 第三方 Cookie 同意管理器：vanilla-cookieconsent（MIT，零依赖）
// 集成 Microsoft Clarity Consent API V2：用户同意状态变化时实时同步给 Clarity
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

// Clarity 使用的 Cookie（用户撤销分析同意时自动清除）
const CLARITY_COOKIES = [{ name: '_clck' }, { name: '_clsk' }, { name: '_cltk' }];

// 将用户偏好同步到 Clarity Consent API V2
function syncClarityConsent() {
  if (typeof window === 'undefined') return;
  const { acceptedCategories } = CookieConsent.getUserPreferences();
  const hasAnalytics = acceptedCategories.includes('analytics');
  window.clarity?.('consentv2', {
    ad_Storage: 'denied', // 本站暂无广告投放
    analytics_Storage: hasAnalytics ? 'granted' : 'denied',
  });
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
          title: '访问分析',
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
    // 首次同意、每次页面加载、偏好变更时均同步给 Clarity
    onFirstConsent: syncClarityConsent,
    onConsent: syncClarityConsent,
    onChange: syncClarityConsent,
  });
}
