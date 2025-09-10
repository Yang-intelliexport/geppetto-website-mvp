import { d as createAstro, c as createComponent, m as maybeRenderHead, b as renderScript, e as addAttribute, a as renderTemplate, ag as unescapeHTML, r as renderComponent, ah as Fragment, ai as defineScriptVars, aj as renderHead, ak as renderSlot } from './astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
/* empty css                          */
import 'clsx';

const languages = {
  en: "English",
  zh: "中文"
};
const defaultLanguage = "en";
function getLanguageFromUrl(url) {
  const pathname = url.pathname;
  const langCode = pathname.split("/")[1];
  if (langCode && langCode in languages) {
    return langCode;
  }
  return defaultLanguage;
}
function getLocalizedPath(path, lang) {
  if (lang === defaultLanguage) {
    return path === "/" ? "/en" : `/en${path}`;
  }
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}
function removeLanguagePrefix(path) {
  const segments = path.split("/");
  if (segments[1] && segments[1] in languages) {
    return "/" + segments.slice(2).join("/") || "/";
  }
  return path;
}
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "Why Geppetto",
    "nav.contact": "Contact",
    "nav.quote": "Get Quote",
    // Common
    "common.getQuote": "Get Quote",
    "common.contactUs": "Contact Us",
    "common.learnMore": "Learn More",
    "common.phone": "Phone",
    "common.email": "Email",
    "common.precision": "Precision",
    "common.delivery": "Delivery",
    "common.costSaving": "Cost Saving",
    "common.noMOQ": "No MOQ",
    // Home page
    "home.title": "CNC Quote | 智能弹性 Precision Manufacturing | Geppetto",
    "home.description": "Get instant CNC quotes with AI analysis in seconds, expert validation in 4-8 hours. Custom precision, 72H production + shipping, no MOQ limits. Global precision manufacturing leader.",
    "home.hero.title": "Get Instant CNC Quotes",
    "home.hero.subtitle": "🚀 Smart Flexible Factory Revolution",
    "home.hero.description": "AI analysis in seconds, expert validation in 4-8 hours with precise quotes.\nCustom precision • 72H production + shipping • No MOQ limits • 50-70% cost savings",
    // Advantages
    "advantages.smartQuote.title": "Instant CNC Quote Promise",
    "advantages.smartQuote.description": "AI analysis in seconds, expert technical validation within 4-8 hours with precise quotes",
    "advantages.fastDelivery.title": "72H Production + Shipping",
    "advantages.fastDelivery.description": "AI-optimized production scheduling and intelligent process planning for industry-leading delivery speed",
    "advantages.noMOQ.title": "No MOQ - Single Part Manufacturing",
    "advantages.noMOQ.description": "AI-driven smart manufacturing makes small-batch production economically viable",
    "advantages.costEfficiency.title": "Maximum Cost Efficiency",
    "advantages.costEfficiency.description": "AI+expert model dramatically reduces labor costs, direct supply chain eliminates middlemen",
    // Contact
    "contact.title": "Contact Us | Geppetto Transparent Manufacturing | Get Quote",
    "contact.hero.title": "Contact Geppetto Expert Team",
    "contact.hero.subtitle": "工作时间 Support • AI-Assisted Expert Quotes • Professional Engineering Services",
    "contact.phone.number": "+86 13511091304",
    "contact.phone.hours": "Business Hours: 工作时间 Global Support",
    "contact.email.address": "hello@geppetto.studio",
    "contact.email.response": "Response within 4 hours",
    // Trust indicators
    "trust.title": "Trusted by Industry Leaders",
    "trust.certifications": "Industry certifications and quality standards",
    "trust.customers": "Satisfied Customers",
    "trust.onTimeDelivery": "On-Time Delivery",
    "trust.support": "Engineering Support",
    "trust.setupFees": "Setup Fees"
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.services": "服务",
    "nav.about": "为什么选择我们",
    "nav.contact": "联系我们",
    "nav.quote": "获取报价",
    // Common
    "common.getQuote": "获取报价",
    "common.contactUs": "联系我们",
    "common.learnMore": "了解更多",
    "common.phone": "电话",
    "common.email": "邮箱",
    "common.precision": "精度",
    "common.delivery": "交付",
    "common.costSaving": "成本节省",
    "common.noMOQ": "无起订量",
    // Home page
    "home.title": "Geppetto - AI驱动的精密制造革命",
    "home.description": "体验Geppetto专家审核报价承诺：AI秒级分析，专家团队4-8工作小时内完成技术复核与精确报价。按需定制精度，72小时生产+运输，无MOQ限制。",
    "home.hero.title": "体验 Geppetto专家审核报价承诺",
    "home.hero.subtitle": "🚀 AI驱动制造革命",
    "home.hero.description": "AI秒级分析，专家团队4-8工作小时内完成技术复核与精确报价。\n按需定制精度 • 72小时生产+运输 • 无MOQ限制 • 成本节省50-70%",
    // Advantages
    "advantages.smartQuote.title": "Geppetto专家审核报价承诺",
    "advantages.smartQuote.description": "AI秒级分析，专家团队4-8工作小时内完成技术复核与精确报价",
    "advantages.fastDelivery.title": "72小时生产+运输",
    "advantages.fastDelivery.description": "AI优化生产调度，智能工艺规划，实现行业领先的交付速度",
    "advantages.noMOQ.title": "单件起做 无MOQ限制",
    "advantages.noMOQ.description": "AI驱动的智能制造模式，让小批量生产也具备经济性",
    "advantages.costEfficiency.title": "极致性价比",
    "advantages.costEfficiency.description": "AI+专家模式大幅降低人力成本，直供模式减少中间环节",
    // Contact
    "contact.title": "联系我们 | Geppetto - AI智能制造",
    "contact.hero.title": "联系Geppetto专业团队",
    "contact.hero.subtitle": "工作时间在线支持 • AI辅助专家报价 • 专业工程师服务",
    "contact.phone.number": "+86 13511091304",
    "contact.phone.hours": "工作时间: 10:00-19:00 (UTC+8)",
    "contact.email.address": "business@geppetto.studio",
    "contact.email.response": "工作时间回复 (10:00-19:00)",
    // Trust indicators
    "trust.title": "行业领先认证",
    "trust.certifications": "行业认证和质量标准确保制造符合最高要求",
    "trust.customers": "满意客户",
    "trust.onTimeDelivery": "准时交付",
    "trust.support": "技术支持",
    "trust.setupFees": "设置费用"
  }
};
function t(key, lang) {
  const value = translations[lang]?.[key];
  if (!value) {
    console.warn(`Translation missing for key: ${key}, lang: ${lang}`);
    return key;
  }
  return value;
}

const $$Astro$4 = createAstro("https://geppetto.studio");
const $$LanguageSwitcher = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LanguageSwitcher;
  const currentLang = getLanguageFromUrl(Astro2.url);
  const currentPath = removeLanguagePrefix(Astro2.url.pathname);
  return renderTemplate`${maybeRenderHead()}<div class="language-switcher relative inline-block" data-astro-cid-be57yzu3> <button id="language-button" class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200" aria-expanded="false" aria-haspopup="true" data-astro-cid-be57yzu3> <span class="text-2xl" data-astro-cid-be57yzu3> ${currentLang === "zh" ? "\u{1F1E8}\u{1F1F3}" : "\u{1F30D}"} </span> <span class="font-medium text-gray-700" data-astro-cid-be57yzu3> ${languages[currentLang]} </span> <svg class="w-4 h-4 text-gray-500 transition-transform duration-200" id="language-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-be57yzu3> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-be57yzu3></path> </svg> </button> <div id="language-dropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 hidden" data-astro-cid-be57yzu3> ${Object.entries(languages).map(([langCode, langName]) => {
    const lang = langCode;
    const href = getLocalizedPath(currentPath, lang);
    const isActive = lang === currentLang;
    return renderTemplate`<a${addAttribute(href, "href")}${addAttribute(`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 ${isActive ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-700"}`, "class")} data-astro-cid-be57yzu3> <span class="text-xl" data-astro-cid-be57yzu3> ${lang === "zh" ? "\u{1F1E8}\u{1F1F3}" : "\u{1F30D}"} </span> <span data-astro-cid-be57yzu3>${langName}</span> ${lang === "zh" && renderTemplate`<span class="text-xs text-gray-500" data-astro-cid-be57yzu3>中国市场</span>`} ${lang === "en" && renderTemplate`<span class="text-xs text-gray-500" data-astro-cid-be57yzu3>Global Market</span>`} ${isActive && renderTemplate`<svg class="w-4 h-4 text-purple-600 ml-auto" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-be57yzu3> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-astro-cid-be57yzu3></path> </svg>`} </a>`;
  })} <!-- Additional Info --> <div class="border-t border-gray-200 mt-2 pt-2 px-4 py-2" data-astro-cid-be57yzu3> <div class="text-xs text-gray-500 space-y-1" data-astro-cid-be57yzu3> <div class="flex items-center space-x-2" data-astro-cid-be57yzu3> <span data-astro-cid-be57yzu3>🇺🇸</span> <span data-astro-cid-be57yzu3>Global Markets</span> </div> <div class="flex items-center space-x-2" data-astro-cid-be57yzu3> <span data-astro-cid-be57yzu3>🇨🇳</span> <span data-astro-cid-be57yzu3>中国大陆市场</span> </div> </div> </div> </div> </div> ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/ui/LanguageSwitcher.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/ui/LanguageSwitcher.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$3 = createAstro("https://geppetto.studio");
const $$StructuredData = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$StructuredData;
  const { type, data } = Astro2.props;
  function generateStructuredData(type2, data2) {
    const baseUrl = "https://geppetto.studio";
    switch (type2) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "\u5947\u5851\u79D1\u6280(\u6DF1\u5733)\u6709\u9650\u516C\u53F8",
          "alternateName": "Geppetto",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "description": "AI\u9A71\u52A8\u7684\u7CBE\u5BC6\u5236\u9020\u670D\u52A1\u5546\uFF0C\u63D0\u4F9BCNC\u52A0\u5DE5\u3001AI\u68C0\u6D4B+\u4E13\u5BB6\u62A5\u4EF7\u3001project-specific\u7CBE\u5EA6\u5236\u9020\u300172\u5C0F\u65F6\u751F\u4EA7+\u7269\u6D41\u670D\u52A1",
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CN",
            "addressRegion": "\u5E7F\u4E1C\u7701",
            "addressLocality": "\u6DF1\u5733\u5E02"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+86 13511091304",
            "contactType": "customer service",
            "email": "hello@geppetto.studio",
            "availableLanguage": ["zh-CN", "en"]
          },
          "sameAs": [
            "https://www.linkedin.com/company/geppetto-ai",
            "https://weibo.com/geppetto"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "\u5236\u9020\u670D\u52A1",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "CNC\u7CBE\u5BC6\u52A0\u5DE5",
                  "description": "project-specific\u7CBE\u5EA6CNC\u52A0\u5DE5\u670D\u52A1"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI\u68C0\u6D4B+\u4E13\u5BB6\u62A5\u4EF7",
                  "description": "30\u79D2AI\u5206\u6790CAD\u6587\u4EF6\u81EA\u52A8\u62A5\u4EF7"
                }
              }
            ]
          },
          ...data2
        };
      case "service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data2.name || "CNC\u7CBE\u5BC6\u52A0\u5DE5\u670D\u52A1",
          "provider": {
            "@type": "Organization",
            "name": "Geppetto",
            "url": baseUrl
          },
          "description": data2.description || "AI\u9A71\u52A8\u7684CNC\u7CBE\u5BC6\u52A0\u5DE5\u670D\u52A1\uFF0Cproject-specific\u7CBE\u5EA6\uFF0C72\u5C0F\u65F6\u751F\u4EA7+\u7269\u6D41",
          "serviceType": "\u5236\u9020\u670D\u52A1",
          "areaServed": {
            "@type": "Country",
            "name": "\u4E2D\u56FD"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "\u52A0\u5DE5\u670D\u52A1\u76EE\u5F55",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "CNC\u94E3\u524A\u52A0\u5DE5",
                "description": "\u9AD8\u7CBE\u5EA6CNC\u94E3\u524A\u670D\u52A1"
              },
              {
                "@type": "Offer",
                "name": "\u4E94\u8F74\u8054\u52A8\u52A0\u5DE5",
                "description": "\u590D\u6742\u66F2\u9762\u4E94\u8F74\u52A0\u5DE5"
              }
            ]
          },
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "\u5236\u9020\u4F01\u4E1A"
          },
          ...data2
        };
      case "article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data2.title,
          "description": data2.description,
          "author": {
            "@type": "Organization",
            "name": "Geppetto\u6280\u672F\u56E2\u961F"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Geppetto",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "datePublished": data2.publishDate || (/* @__PURE__ */ new Date()).toISOString(),
          "dateModified": data2.modifiedDate || (/* @__PURE__ */ new Date()).toISOString(),
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data2.url || baseUrl
          },
          "image": data2.image || `${baseUrl}/og-default.jpg`,
          ...data2
        };
      case "faq":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "name": data2.title || "\u5E38\u89C1\u95EE\u9898",
          "mainEntity": data2.faqs?.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          })) || [],
          ...data2
        };
      case "product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data2.name,
          "description": data2.description,
          "brand": {
            "@type": "Brand",
            "name": "Geppetto"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "\u5947\u5851\u79D1\u6280(\u6DF1\u5733)\u6709\u9650\u516C\u53F8"
          },
          "category": data2.category || "\u5236\u9020\u670D\u52A1",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "CNY",
            "seller": {
              "@type": "Organization",
              "name": "Geppetto"
            }
          },
          ...data2
        };
      case "breadcrumb":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data2.items?.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          })) || [],
          ...data2
        };
      default:
        return data2;
    }
  }
  const structuredData = generateStructuredData(type, data);
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(structuredData)));
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/seo/StructuredData.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$GoogleAnalytics = createComponent(($$result, $$props, $$slots) => {
  const measurementId = "<YOUR_GA_MEASUREMENT_ID>";
  return renderTemplate(_b || (_b = __template(["", "<!-- 确保自定义跟踪函数始终可用 --><script>\n  // 定义自定义跟踪函数（如果还不存在）\n  window.trackQuoteRequest = window.trackQuoteRequest || function(quoteData) {\n    if (window.gtag && window.gaInitialized) {\n      gtag('event', 'generate_lead', {\n        currency: quoteData.currency || 'USD',\n        value: quoteData.estimatedValue || 0\n      });\n    }\n  };\n  \n  window.trackFileUpload = window.trackFileUpload || function(fileData) {\n    if (window.gtag && window.gaInitialized) {\n      gtag('event', 'file_upload', {\n        file_extension: fileData.fileType,\n        file_name: fileData.fileName\n      });\n    }\n  };\n  \n  window.trackContactForm = window.trackContactForm || function(formType) {\n    if (window.gtag && window.gaInitialized) {\n      gtag('event', 'form_submit', {\n        form_type: formType || 'contact'\n      });\n    }\n  };\n</script>"])), renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["<script async", "></script><script>(function(){", "\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      window.gtag = gtag;\n      \n      // Initialize GA with consent-aware configuration\n      window.initializeGA = function(consentSettings) {\n        gtag('js', new Date());\n        \n        // Set consent based on user preferences or defaults\n        const consent = consentSettings || {\n          'ad_storage': 'denied',\n          'ad_user_data': 'denied', \n          'ad_personalization': 'denied',\n          'analytics_storage': 'denied'\n        };\n        \n        gtag('consent', 'default', consent);\n        \n        // Configure GA4 with privacy settings\n        gtag('config', measurementId, {\n          anonymize_ip: true,\n          allow_google_signals: false,\n          allow_ad_personalization_signals: false,\n          debug_mode: false,\n          send_page_view: true\n        });\n        \n        // Mark GA as initialized\n        window.gaInitialized = true;\n      };\n      \n      // Check for existing consent and initialize accordingly\n      window.checkConsentAndInitialize = function() {\n        try {\n          const storedConsent = localStorage.getItem('geppetto_cookie_consent');\n          if (storedConsent) {\n            const consent = JSON.parse(storedConsent);\n            const consentSettings = {\n              'analytics_storage': consent.analytics ? 'granted' : 'denied',\n              'ad_storage': consent.marketing ? 'granted' : 'denied',\n              'ad_user_data': consent.marketing ? 'granted' : 'denied',\n              'ad_personalization': consent.marketing ? 'granted' : 'denied'\n            };\n            window.initializeGA(consentSettings);\n          } else {\n            // No consent yet, initialize with denied defaults\n            window.initializeGA();\n          }\n        } catch (e) {\n          // Fallback to denied defaults\n          window.initializeGA();\n        }\n      };\n      \n      // Initialize immediately with current consent state\n      window.checkConsentAndInitialize();\n      \n      // View Transitions support - Track page changes\n      document.addEventListener('astro:page-load', () => {\n        if (window.gaInitialized && window.gtag) {\n          gtag('js', new Date());\n          gtag('config', measurementId);\n        }\n      });\n      \n      // Listen for consent changes and update GA accordingly\n      window.addEventListener('cookieConsentChanged', (event) => {\n        const consent = event.detail;\n        const consentSettings = {\n          'analytics_storage': consent.analytics ? 'granted' : 'denied',\n          'ad_storage': consent.marketing ? 'granted' : 'denied',\n          'ad_user_data': consent.marketing ? 'granted' : 'denied',\n          'ad_personalization': consent.marketing ? 'granted' : 'denied'\n        };\n        \n        if (window.gtag) {\n          gtag('consent', 'update', consentSettings);\n        }\n      });\n      \n      // Custom tracking functions with consent check\n      window.trackQuoteRequest = function(quoteData) {\n        if (window.gtag && window.gaInitialized) {\n          gtag('event', 'generate_lead', {\n            currency: quoteData.currency || 'USD',\n            value: quoteData.estimatedValue || 0\n          });\n        }\n      };\n      \n      window.trackFileUpload = function(fileData) {\n        if (window.gtag && window.gaInitialized) {\n          gtag('event', 'file_upload', {\n            file_extension: fileData.fileType,\n            file_name: fileData.fileName\n          });\n        }\n      };\n      \n      window.trackContactForm = function(formType) {\n        if (window.gtag && window.gaInitialized) {\n          gtag('event', 'form_submit', {\n            form_type: formType || 'contact'\n          });\n        }\n      };\n    })();</script>"])), addAttribute(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`, "src"), defineScriptVars({ measurementId })) })}`);
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/analytics/GoogleAnalytics.astro", void 0);

const $$Astro$2 = createAstro("https://geppetto.studio");
const $$CookieConsent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CookieConsent;
  const currentLang = getLanguageFromUrl(Astro2.url);
  return renderTemplate`${renderTemplate`${maybeRenderHead()}<div id="cookie-consent-banner" class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 transform translate-y-full transition-transform duration-300 ease-in-out" style="display: none;"><div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"><div class="flex-1"><p class="text-sm">${currentLang === "zh" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`
我们使用cookie来改善您的浏览体验并分析网站流量。继续使用我们的网站即表示您同意我们的
<a href="/privacy" class="text-purple-400 hover:text-purple-300 underline">隐私政策</a>。
` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`
We use cookies to improve your browsing experience and analyze website traffic. By continuing to use our website, you agree to our
<a href="/privacy" class="text-purple-400 hover:text-purple-300 underline">Privacy Policy</a>.
` })}`}</p></div><div class="flex gap-3"><button id="cookie-accept" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">${currentLang === "zh" ? "接受所有" : "Accept All"}</button><button id="cookie-settings" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">${currentLang === "zh" ? "设置" : "Settings"}</button><button id="cookie-decline" class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">${currentLang === "zh" ? "拒绝" : "Decline"}</button></div></div></div>

  <!-- Cookie Settings Modal -->
  <div id="cookie-settings-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" style="display: none;"><div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"><div class="p-6"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold text-gray-900">${currentLang === "zh" ? "Cookie设置" : "Cookie Settings"}</h2><button id="cookie-modal-close" class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="space-y-6"><!-- Essential Cookies --><div class="border-b border-gray-200 pb-4"><div class="flex justify-between items-center mb-2"><h3 class="font-semibold text-gray-900">${currentLang === "zh" ? "必要Cookie" : "Essential Cookies"}</h3><div class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">${currentLang === "zh" ? "总是开启" : "Always On"}</div></div><p class="text-sm text-gray-600">${currentLang === "zh" ? "这些cookie对网站功能至关重要，无法禁用。它们通常是响应您的操作而设置的。" : "These cookies are essential for the website to function and cannot be disabled. They are usually set in response to your actions."}</p></div><!-- Analytics Cookies --><div class="border-b border-gray-200 pb-4"><div class="flex justify-between items-center mb-2"><h3 class="font-semibold text-gray-900">${currentLang === "zh" ? "分析Cookie" : "Analytics Cookies"}</h3><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox" id="analytics-toggle" class="sr-only peer" checked><div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div></label></div><p class="text-sm text-gray-600">${currentLang === "zh" ? "这些cookie帮助我们了解访客如何使用网站，以便我们改善用户体验。" : "These cookies help us understand how visitors use our website so we can improve the user experience."}</p></div><!-- Marketing Cookies --><div class="pb-4"><div class="flex justify-between items-center mb-2"><h3 class="font-semibold text-gray-900">${currentLang === "zh" ? "营销Cookie" : "Marketing Cookies"}</h3><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox" id="marketing-toggle" class="sr-only peer"><div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div></label></div><p class="text-sm text-gray-600">${currentLang === "zh" ? "这些cookie用于提供更相关的广告和营销内容。" : "These cookies are used to provide more relevant advertisements and marketing content."}</p></div></div><div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200"><button id="cookie-save-settings" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">${currentLang === "zh" ? "保存设置" : "Save Settings"}</button></div></div></div></div>

  ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/analytics/CookieConsent.astro?astro&type=script&index=0&lang.ts")}`}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/analytics/CookieConsent.astro", void 0);

const $$GlobalModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- 
  全局模态框组件 - 基于原生HTML Dialog
  使用Nanostores进行状态管理，支持跨框架使用
-->${maybeRenderHead()}<dialog id="global-modal" class="modal-dialog" data-astro-cid-uohfmno4> <div class="modal-backdrop" data-astro-cid-uohfmno4> <div class="modal-content bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl" data-astro-cid-uohfmno4> <!-- 图标区域 --> <div class="modal-icon-container text-center mb-4" data-astro-cid-uohfmno4> <div id="modal-icon" class="w-16 h-16 rounded-full flex items-center justify-center mx-auto" data-astro-cid-uohfmno4> <!-- 图标将由JavaScript动态插入 --> </div> </div> <!-- 标题 --> <h3 id="modal-title" class="text-lg font-bold text-gray-800 mb-2 text-center" data-astro-cid-uohfmno4></h3> <!-- 消息内容 --> <p id="modal-message" class="text-gray-600 mb-6 text-center leading-relaxed" data-astro-cid-uohfmno4></p> <!-- 按钮区域 --> <form method="dialog" class="modal-actions" data-astro-cid-uohfmno4> <div id="modal-buttons" class="flex justify-center space-x-4" data-astro-cid-uohfmno4> <!-- 按钮将由JavaScript动态插入 --> </div> </form> </div> </div> </dialog>  ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/modals/GlobalModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/modals/GlobalModal.astro", void 0);

const $$GlobalToast = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- 
  全局Toast通知组件
  支持多个toast同时显示，自动消失
-->${maybeRenderHead()}<div id="toast-container" class="toast-container fixed top-4 right-4 z-50 space-y-3" data-astro-cid-ljo4s4gf> <!-- Toast元素将动态插入到这里 --> </div>  ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/modals/GlobalToast.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/modals/GlobalToast.astro", void 0);

const $$Astro$1 = createAstro("https://geppetto.studio");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro = createAstro("https://geppetto.studio");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const currentLang = getLanguageFromUrl(Astro2.url);
  const {
    title,
    description,
    keywords = [],
    ogImage = "/images/og-default.jpg",
    structuredData
  } = Astro2.props;
  const defaultTitle = currentLang === "zh" ? "Geppetto - AI\u9A71\u52A8\u7684\u7CBE\u5BC6\u5236\u9020\u9769\u547D" : "CNC Quote | \u667A\u80FD\u5F39\u6027 Precision Manufacturing | Geppetto";
  const defaultDescription = currentLang === "zh" ? "AI\u8F85\u52A9\u4E13\u5BB6\u62A5\u4EF7\uFF0C72\u5C0F\u65F6\u751F\u4EA7+\u8FD0\u8F93\uFF0C\u6309\u9700\u5B9A\u5236\u7CBE\u5EA6\uFF0C\u65E0MOQ\u9650\u5236\u3002\u4F53\u9A8CGeppetto\u4E13\u5BB6\u62A5\u4EF7\u627F\u8BFA\uFF0C\u9769\u547D\u6027\u7684\u5236\u9020\u670D\u52A1\u3002" : "Get instant CNC quotes with AI analysis in seconds, expert validation in 4-8 hours. Custom precision, 72H production + shipping, no MOQ limits.";
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  return renderTemplate`<html${addAttribute(currentLang === "zh" ? "zh-CN" : "en-US", "lang")}> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- SEO Meta Tags --><title>${finalTitle}</title><meta name="description"${addAttribute(finalDescription, "content")}><meta name="keywords"${addAttribute(keywords.join(", "), "content")}><!-- Language alternates --><link rel="alternate" hreflang="en"${addAttribute(`${Astro2.site}en${Astro2.url.pathname.replace(/^\/(en|zh)/, "") || "/"}`, "href")}><link rel="alternate" hreflang="zh"${addAttribute(`${Astro2.site}zh${Astro2.url.pathname.replace(/^\/(en|zh)/, "") || "/"}`, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(`${Astro2.site}en${Astro2.url.pathname.replace(/^\/(en|zh)/, "") || "/"}`, "href")}><!-- Open Graph --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:type" content="website"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}><!-- Styles import --><!-- Preload critical fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><!-- Structured Data -->${structuredData && renderTemplate`${renderComponent($$result, "StructuredData", $$StructuredData, { "type": structuredData.type, "data": structuredData.data })}`}<!-- Default Organization Structured Data -->${!structuredData && renderTemplate`${renderComponent($$result, "StructuredData", $$StructuredData, { "type": "organization", "data": {} })}`}<!-- Google Analytics -->${renderComponent($$result, "GoogleAnalytics", $$GoogleAnalytics, {})}<!-- View Transitions for smooth page transitions -->${renderComponent($$result, "ViewTransitions", $$ClientRouter, {})}${renderHead()}</head> <body class="font-inter bg-white text-gray-900 antialiased"> <!-- Header --> <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"> <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center h-16"> <!-- Logo --> <div class="flex items-center"> <a${addAttribute(`/${currentLang}`, "href")} class="flex items-center space-x-2"> <img src="/images/geppetto-logo.png" alt="Geppetto Logo" class="w-8 h-8 object-contain" loading="eager"> <span class="text-xl font-bold text-[#111827]">Geppetto</span> </a> </div> <!-- Desktop Navigation --> <div class="hidden md:flex items-center space-x-6"> <a${addAttribute(`/${currentLang}/services`, "href")} class="text-[#111827] hover:text-[#7F00FF] transition-colors">${t("nav.services", currentLang)}</a> <a${addAttribute(`/${currentLang}/why-geppetto`, "href")} class="text-[#111827] hover:text-[#7F00FF] transition-colors">${t("nav.about", currentLang)}</a> <a${addAttribute(`/${currentLang}/track-order`, "href")} class="text-[#111827] hover:text-[#7F00FF] transition-colors">${currentLang === "zh" ? "\u8BA2\u5355\u8FFD\u8E2A" : "Track Order"}</a> <a${addAttribute(`/${currentLang}/contact`, "href")} class="text-[#111827] hover:text-[#7F00FF] transition-colors">${t("nav.contact", currentLang)}</a> <a${addAttribute(`/${currentLang}/resources`, "href")} class="text-[#111827] hover:text-[#7F00FF] transition-colors">${currentLang === "zh" ? "\u8D44\u6E90" : "Resources"}</a> ${renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, {})} <a${addAttribute(`/${currentLang}/create-quote`, "href")} class="bg-[#7F00FF] text-white px-6 py-3 rounded-lg hover:bg-[#6B00CC] transition-colors font-semibold"> ${t("nav.quote", currentLang)} </a> </div> <!-- Mobile menu button --> <div class="md:hidden flex items-center space-x-2"> ${renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, {})} <button type="button" class="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors" id="mobile-menu-button" aria-label="Toggle mobile menu"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> <!-- Mobile Navigation --> <div class="md:hidden hidden" id="mobile-menu"> <div class="px-2 pt-2 pb-6 space-y-1 bg-white border-t border-gray-100 shadow-lg"> <a${addAttribute(`/${currentLang}/services`, "href")} class="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"> ${t("nav.services", currentLang)} </a> <a${addAttribute(`/${currentLang}/why-geppetto`, "href")} class="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"> ${t("nav.about", currentLang)} </a> <a${addAttribute(`/${currentLang}/track-order`, "href")} class="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"> ${currentLang === "zh" ? "\u8BA2\u5355\u8FFD\u8E2A" : "Track Order"} </a> <a${addAttribute(`/${currentLang}/contact`, "href")} class="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"> ${t("nav.contact", currentLang)} </a> <a${addAttribute(`/${currentLang}/resources`, "href")} class="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"> ${currentLang === "zh" ? "\u8D44\u6E90" : "Resources"} </a> <div class="px-2 pt-4"> <a${addAttribute(`/${currentLang}/create-quote`, "href")} class="block bg-gradient-to-r from-[#7F00FF] to-[#00BFFF] text-white px-6 py-3 rounded-xl text-center font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"> ${t("nav.quote", currentLang)} </a> </div> </div> </div> </nav> </header> <!-- Main Content --> <main> ${renderSlot($$result, $$slots["default"])} </main> <!-- Footer --> <footer class="bg-gray-900 text-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8"> <!-- Company Info --> <div class="col-span-1 md:col-span-2"> <div class="flex items-center space-x-2 mb-4"> <img src="/images/geppetto-logo.png" alt="Geppetto Logo" class="w-8 h-8 object-contain"> <span class="text-xl font-bold">Geppetto</span> </div> <p class="text-gray-300 mb-4 max-w-md"> ${currentLang === "zh" ? "\u5947\u5851\u79D1\u6280 - AI\u9A71\u52A8\u7684\u7CBE\u5BC6\u5236\u9020\u670D\u52A1\u5546\u3002\u63D0\u4F9B\u4E13\u5BB6\u5BA1\u6838\u62A5\u4EF7\u300172\u5C0F\u65F6\u751F\u4EA7+\u8FD0\u8F93\u3001\u6309\u9700\u5B9A\u5236\u7CBE\u5EA6\u7684\u9769\u547D\u6027\u5236\u9020\u4F53\u9A8C\u3002" : "Geppetto Tech - AI-powered precision manufacturing service provider. Delivering intelligent quotes, 72H production + shipping, and revolutionary manufacturing experience with custom precision."} </p> <div class="flex space-x-4"> <a href="tel:+8613511091304" class="text-[#7F00FF] hover:text-[#00BFFF]">+86 13511091304</a> <a href="mailto:hello@geppetto.studio" class="text-[#7F00FF] hover:text-[#00BFFF]">hello@geppetto.studio</a> </div> </div> <!-- Quick Links --> <div> <h3 class="text-lg font-semibold mb-4">${currentLang === "zh" ? "\u5FEB\u901F\u94FE\u63A5" : "Quick Links"}</h3> <ul class="space-y-2"> <li><a${addAttribute(`/${currentLang}/why-geppetto`, "href")} class="text-gray-300 hover:text-white">${currentLang === "zh" ? "\u4E3A\u4F55\u9009\u62E9Geppetto" : "Why Geppetto"}</a></li> <li><a${addAttribute(`/${currentLang}/services`, "href")} class="text-gray-300 hover:text-white">${currentLang === "zh" ? "\u670D\u52A1\u80FD\u529B" : "Services"}</a></li> <li><a${addAttribute(`/${currentLang}/track-order`, "href")} class="text-gray-300 hover:text-white">${currentLang === "zh" ? "\u8BA2\u5355\u8FFD\u8E2A" : "Track Order"}</a></li> <li><a href="/no-moq" class="text-gray-300 hover:text-white">${currentLang === "zh" ? "\u65E0MOQ\u5236\u9020" : "No MOQ Manufacturing"}</a></li> <li><a${addAttribute(`/${currentLang}/create-quote`, "href")} class="text-gray-300 hover:text-white">${currentLang === "zh" ? "\u83B7\u53D6\u62A5\u4EF7" : "Get Quote"}</a></li> </ul> </div> <!-- Resources --> <div> <h3 class="text-lg font-semibold mb-4">${currentLang === "zh" ? "\u66F4\u591A\u4FE1\u606F" : "More Information"}</h3> <ul class="space-y-2"> <li><a${addAttribute(`/${currentLang}/case-studies`, "href")} class="text-gray-300 hover:text-white">${currentLang === "zh" ? "\u5BA2\u6237\u6848\u4F8B" : "Case Studies"}</a></li> <li><a${addAttribute(`/${currentLang}/about`, "href")} class="text-gray-300 hover:text-white">${currentLang === "zh" ? "\u5173\u4E8E\u6211\u4EEC" : "About Us"}</a></li> <li><a${addAttribute(`/${currentLang}/faq`, "href")} class="text-gray-300 hover:text-white">${currentLang === "zh" ? "\u5E38\u89C1\u95EE\u9898" : "FAQ"}</a></li> <li><a${addAttribute(`/${currentLang}/contact`, "href")} class="text-gray-300 hover:text-white">${currentLang === "zh" ? "\u8054\u7CFB\u6211\u4EEC" : "Contact Us"}</a></li> </ul> </div> </div> <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"> <p> ${currentLang === "zh" ? "&copy; 2024 \u5947\u5851\u79D1\u6280(\u6DF1\u5733)\u6709\u9650\u516C\u53F8. \u4FDD\u7559\u6240\u6709\u6743\u5229." : "&copy; 2024 Geppetto Technologies Ltd. All rights reserved."} |
<a href="/privacy" class="hover:text-white">${currentLang === "zh" ? "\u9690\u79C1\u653F\u7B56" : "Privacy Policy"}</a> |
<a href="/terms" class="hover:text-white">${currentLang === "zh" ? "\u670D\u52A1\u6761\u6B3E" : "Terms of Service"}</a> </p> </div> </div> </footer> <!-- Cookie Consent Banner --> ${renderComponent($$result, "CookieConsent", $$CookieConsent, {})} <!-- 全局模态框和Toast --> ${renderComponent($$result, "GlobalModal", $$GlobalModal, {})} ${renderComponent($$result, "GlobalToast", $$GlobalToast, {})} <!-- Enhanced Mobile Menu Script --> ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, getLanguageFromUrl as g };
