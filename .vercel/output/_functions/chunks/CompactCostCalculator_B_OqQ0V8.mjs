import { d as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate, r as renderComponent, ah as Fragment, ag as unescapeHTML, e as addAttribute, ai as defineScriptVars } from './astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro$3 = createAstro("https://geppetto.studio");
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { hero, features, language = "zh" } = Astro2.props;
  const text = {
    zh: {
      quoteProcess: "AI\u68C0\u6D4B+\u4E13\u5BB6\u62A5\u4EF7\u6D41\u7A0B",
      steps: [
        {
          title: "AI\u667A\u80FD\u5206\u6790",
          status: "\u5DF2\u5B8C\u6210 - 2\u5206\u949F"
        },
        {
          title: "\u4E13\u5BB6\u6280\u672F\u590D\u6838",
          status: "\u8FDB\u884C\u4E2D - 4-8\u5C0F\u65F6\u5185\u5B8C\u6210"
        },
        {
          title: "\u7CBE\u786E\u62A5\u4EF7\u53D1\u9001",
          status: "\u90AE\u4EF6\u901A\u77E5"
        }
      ],
      precision: "\u7CBE\u5EA6\u4FDD\u8BC1",
      delivery: "72h\u5236\u9020"
    },
    en: {
      quoteProcess: "AI Smart Quote Process",
      steps: [
        {
          title: "AI Smart Analysis",
          status: "Completed - 2 minutes"
        },
        {
          title: "Expert Technical Review",
          status: "In Progress - 4-8 hours"
        },
        {
          title: "Precise Quote Delivery",
          status: "Email notification"
        }
      ],
      precision: "Precision Guarantee",
      delivery: "72h Manufacturing"
    }
  };
  const currentText = text[language];
  return renderTemplate`${maybeRenderHead()}<section class="relative bg-gradient-to-br from-[#7F00FF]/5 via-[#00BFFF]/5 to-white overflow-hidden"> <div class="absolute inset-0 bg-gradient-to-r from-[#7F00FF]/10 to-[#00BFFF]/10"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"> <div class="grid lg:grid-cols-2 gap-12 items-center"> <!-- Left Content --> <div class="space-y-8"> <div class="space-y-4"> ${hero.subtitle && renderTemplate`<div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#7F00FF]/10 to-[#00BFFF]/10 text-[#7F00FF] rounded-full text-sm font-semibold border border-[#7F00FF]/20"> ${hero.subtitle} </div>`} <h1 class="text-4xl lg:text-6xl font-bold text-[#111827] leading-tight"> ${hero.title.includes("Geppetto") ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${hero.title.split("Geppetto")[0]}<span class="bg-gradient-to-r from-[#7F00FF] to-[#00BFFF] bg-clip-text text-transparent">
Geppetto${hero.title.split("Geppetto")[1] || ""} </span> ` })}` : hero.title.includes("AI") ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="bg-gradient-to-r from-[#7F00FF] to-[#00BFFF] bg-clip-text text-transparent">智能弹性</span> ${hero.title.replace("\u667A\u80FD\u5F39\u6027", "")}` })}` : hero.title} </h1> ${hero.description && renderTemplate`<p class="text-xl text-gray-600 leading-relaxed">${unescapeHTML(hero.description.replace(/\n/g, "<br/>"))}</p>`} </div> <!-- CTA Buttons --> ${hero.cta && renderTemplate`<div class="flex flex-col sm:flex-row gap-4"> <a${addAttribute(hero.cta.primary.href, "href")} class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#7F00FF] to-[#00BFFF] text-white font-semibold rounded-lg hover:from-[#6B00CC] hover:to-[#0080CC] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"> ${hero.cta.primary.text} </a> ${hero.cta.secondary && renderTemplate`<a${addAttribute(hero.cta.secondary.href, "href")} class="inline-flex items-center justify-center px-8 py-4 border-2 border-[#7F00FF]/20 text-[#7F00FF] font-semibold rounded-lg hover:bg-[#7F00FF]/5 transition-colors duration-200"> ${hero.cta.secondary.text} </a>`} </div>`} <!-- Trust Indicators --> ${features && renderTemplate`<div class="flex flex-wrap items-center gap-6 text-sm text-gray-500"> ${features.map((feature) => renderTemplate`<div class="flex items-center space-x-2"> <span class="w-2 h-2 bg-green-500 rounded-full"></span> <span>${feature.title}</span> </div>`)} </div>`} </div> <!-- Right Content - Visual --> <div class="relative"> <!-- Hero Video --> <div class="relative rounded-2xl overflow-hidden shadow-2xl mb-6"> <video class="w-full h-64 lg:h-80 object-cover" autoplay muted loop playsinline poster="/images/manufacturing/cnc-operator.jpg"> <source src="/videos/hero-manufacturing.mp4" type="video/mp4"> <!-- Fallback image if video fails to load --> <img src="/images/manufacturing/cnc-operator.jpg" alt="AI驱动精密制造" class="w-full h-64 lg:h-80 object-cover"> </video> <!-- Video overlay --> <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> </div> <div class="bg-white rounded-2xl shadow-2xl p-6"> <div class="space-y-6"> <!-- Process Steps --> <div class="space-y-4"> <h3 class="text-lg font-semibold text-gray-900">${currentText.quoteProcess}</h3> <div class="space-y-3"> <div class="flex items-center space-x-3"> <div class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">✓</div> <div class="flex-1"> <div class="text-sm font-medium text-gray-900">${currentText.steps[0].title}</div> <div class="text-xs text-gray-500">${currentText.steps[0].status}</div> </div> </div> <div class="flex items-center space-x-3"> <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div> <div class="flex-1"> <div class="text-sm font-medium text-gray-900">${currentText.steps[1].title}</div> <div class="text-xs text-gray-500">${currentText.steps[1].status}</div> </div> </div> <div class="flex items-center space-x-3"> <div class="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">3</div> <div class="flex-1"> <div class="text-sm font-medium text-gray-500">${currentText.steps[2].title}</div> <div class="text-xs text-gray-500">${currentText.steps[2].status}</div> </div> </div> </div> </div> <!-- Quick Stats --> <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100"> <div class="text-center"> <div class="text-2xl font-bold text-[#7F00FF]">Custom Grade</div> <div class="text-xs text-gray-500">${currentText.precision}</div> </div> <div class="text-center"> <div class="text-2xl font-bold text-[#00BFFF]">72h</div> <div class="text-xs text-gray-500">${currentText.delivery}</div> </div> </div> </div> </div> </div> </div> </div> </section>`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/marketing/HeroSection.astro", void 0);

const $$Astro$2 = createAstro("https://geppetto.studio");
const $$AdvantagesGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AdvantagesGrid;
  const { advantages, layout = "grid", theme = "light", showDetails = false, language = "zh" } = Astro2.props;
  const text = {
    zh: {
      title: "\u56DB\u5927\u6838\u5FC3\u4F18\u52BF",
      subtitle: "\u98A0\u8986\u4F20\u7EDF\u5236\u9020\u4E1A\u7684\u6280\u672F\u521B\u65B0\uFF0C\u4E3A\u60A8\u63D0\u4F9B\u524D\u6240\u672A\u6709\u7684\u5236\u9020\u4F53\u9A8C"
    },
    en: {
      title: "Four Core Advantages",
      subtitle: "Revolutionary manufacturing technology innovation that provides unprecedented manufacturing experience"
    }
  };
  const currentText = text[language];
  const getColorClasses = (color) => {
    const colorMap = {
      purple: {
        bg: "from-purple-50 to-purple-100",
        icon: "bg-purple-600",
        text: "text-purple-600",
        detail: "bg-purple-50 text-purple-800"
      },
      blue: {
        bg: "from-blue-50 to-blue-100",
        icon: "bg-blue-500",
        text: "text-blue-600",
        detail: "bg-blue-50 text-blue-800"
      },
      green: {
        bg: "from-green-50 to-green-100",
        icon: "bg-green-500",
        text: "text-green-600",
        detail: "bg-green-50 text-green-800"
      },
      orange: {
        bg: "from-orange-50 to-orange-100",
        icon: "bg-orange-500",
        text: "text-orange-600",
        detail: "bg-orange-50 text-orange-800"
      }
    };
    return colorMap[color] || colorMap.purple;
  };
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`py-20 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`, "class")}> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-16"> <h2${addAttribute(`text-3xl lg:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`, "class")}> ${currentText.title} </h2> <p${addAttribute(`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`, "class")}> ${currentText.subtitle} </p> </div> <div${addAttribute(`grid gap-8 ${layout === "grid" ? "lg:grid-cols-4 md:grid-cols-2" : layout === "list" ? "grid-cols-1 max-w-4xl mx-auto" : "grid-cols-1"}`, "class")}> ${advantages.map((advantage) => {
    const colors = getColorClasses(advantage.color || "purple");
    return renderTemplate`<div${addAttribute(`bg-gradient-to-br ${colors.bg} rounded-2xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-2 ${layout === "list" ? "flex items-start space-x-6" : ""}`, "class")}> <div${addAttribute(`${layout === "list" ? "flex-shrink-0" : ""}`, "class")}> <div${addAttribute(`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center mb-6 ${layout === "list" ? "mb-0" : ""}`, "class")}> <span class="text-white text-2xl">${advantage.icon}</span> </div> </div> <div${addAttribute(`${layout === "list" ? "flex-1" : ""}`, "class")}> <h3${addAttribute(`text-xl font-bold text-gray-900 mb-4 ${layout === "list" ? "mb-2" : ""}`, "class")}> ${advantage.title} </h3> <p${addAttribute(`text-gray-600 mb-4 ${layout === "list" ? "mb-3" : ""}`, "class")}> ${advantage.description} </p> ${advantage.stats && renderTemplate`<div${addAttribute(`text-sm ${colors.text} font-semibold ${layout === "list" ? "mb-3" : ""}`, "class")}> ${advantage.stats} </div>`} ${showDetails && advantage.details && renderTemplate`<div${addAttribute(`${colors.detail} p-4 rounded-lg text-sm mt-4`, "class")}> <div class="prose prose-sm">${unescapeHTML(advantage.details.replace(/### /g, '<h4 class="font-semibold mb-2 text-sm">').replace(/\n/g, "<br/>"))}</div> </div>`} </div> </div>`;
  })} </div> </div> </section>`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/marketing/AdvantagesGrid.astro", void 0);

const $$Astro$1 = createAstro("https://geppetto.studio");
const $$TestimonialSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TestimonialSection;
  const {
    testimonials,
    title,
    subtitle,
    language = "zh"
  } = Astro2.props;
  const text = {
    zh: {
      defaultTitle: "\u5BA2\u6237\u6210\u529F\u6848\u4F8B",
      defaultSubtitle: "\u771F\u5B9E\u5BA2\u6237\u53CD\u9988\uFF0C\u89C1\u8BC1Geppetto\u7684\u4EF7\u503C\u521B\u9020",
      successLabel: "\u2705 \u5BA2\u6237\u6210\u529F\u6848\u4F8B",
      breakthrough: "\u7684\u7A81\u7834\u6027\u5408\u4F5C",
      actualPrecision: "\u5B9E\u9645\u7CBE\u5EA6",
      precisionNote: "\uFF08\u8981\u6C42project-specific\uFF09",
      costReduction: "\u6210\u672C\u964D\u4F4E",
      costNote: "(vs\u4F20\u7EDF\u4F9B\u5E94\u5546)",
      deliveryTime: "\u4EA4\u4ED8\u65F6\u95F4",
      deliveryNote: "(vs\u4F20\u7EDF15\u5929)",
      qualityRate: "\u8D28\u91CF\u5408\u683C\u7387",
      qualityNote: "(\u8FDE\u7EED6\u4E2A\u6708)",
      showcaseTitle: "\u7CBE\u5BC6\u5236\u9020\u6210\u679C\u5C55\u793A",
      precisionTools: "\u7CBE\u5BC6\u5200\u5177",
      machiningProcess: "\u52A0\u5DE5\u8FC7\u7A0B",
      projectDetails: "\u9879\u76EE\u8BE6\u60C5",
      productType: "\u4EA7\u54C1\u7C7B\u578B",
      material: "\u6750\u6599",
      precisionReq: "\u7CBE\u5EA6\u8981\u6C42",
      quantity: "\u6279\u91CF",
      deliveryReq: "\u4EA4\u671F\u8981\u6C42",
      customerFeedback: "\u5BA2\u6237\u53CD\u9988",
      products: {
        robotJoint: "\u673A\u5668\u4EBA\u5173\u8282\u96F6\u4EF6",
        aluminum: "6061-T6\u94DD\u5408\u91D1",
        pieces: "\u4EF6",
        withinDays: "\u5929\u5185"
      }
    },
    en: {
      defaultTitle: "Customer Success Stories",
      defaultSubtitle: "Real customer feedback showcasing Geppetto's value creation",
      successLabel: "\u2705 Customer Success Story",
      breakthrough: " Breakthrough Partnership",
      actualPrecision: "Custom Requirements",
      precisionNote: "(Required project-specific)",
      costReduction: "Cost Savings",
      costNote: "(vs Traditional Suppliers)",
      deliveryTime: "Delivery Time",
      deliveryNote: "(vs Traditional 15 days)",
      qualityRate: "Quality Rate",
      qualityNote: "(6 months consecutive)",
      showcaseTitle: "Precision Manufacturing Results",
      precisionTools: "Precision Tools",
      machiningProcess: "Machining Process",
      projectDetails: "Project Details",
      productType: "Product Type",
      material: "Material",
      precisionReq: "Precision Requirement",
      quantity: "Quantity",
      deliveryReq: "Delivery Requirement",
      customerFeedback: "Customer Feedback",
      products: {
        robotJoint: "Robotic Joint Components",
        aluminum: "6061-T6 Aluminum",
        pieces: " pieces",
        withinDays: " days"
      }
    }
  };
  const currentText = text[language];
  const finalTitle = title || currentText.defaultTitle;
  const finalSubtitle = subtitle || currentText.defaultSubtitle;
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-gradient-to-br from-gray-50 to-gray-100"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> ${(title || subtitle) && renderTemplate`<div class="text-center mb-16"> ${finalTitle && renderTemplate`<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"> ${finalTitle} </h2>`} ${finalSubtitle && renderTemplate`<p class="text-xl text-gray-600 max-w-3xl mx-auto"> ${finalSubtitle} </p>`} </div>`} <div class="space-y-12"> ${testimonials.map((testimonial, index) => renderTemplate`<div class="bg-white rounded-3xl shadow-xl overflow-hidden"> <div class="grid lg:grid-cols-2 gap-0"> <!-- Content --> <div class="p-12 lg:p-16"> <div class="mb-8"> <div class="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4"> ${currentText.successLabel} </div> <h3 class="text-3xl font-bold text-gray-900 mb-4"> ${testimonial.company}${currentText.breakthrough} </h3> <blockquote class="text-lg text-gray-600 leading-relaxed">
"${testimonial.content}"
</blockquote> <cite class="block mt-6 text-sm text-gray-500">
— ${testimonial.name}, ${testimonial.company} </cite> </div> <!-- Stats --> ${testimonial.stats && renderTemplate`<div class="grid grid-cols-2 gap-6"> ${testimonial.stats.precision && renderTemplate`<div> <div class="text-3xl font-bold text-purple-600 mb-2"> ${testimonial.stats.precision} </div> <div class="text-sm text-gray-600"> ${currentText.actualPrecision}<br> ${testimonial.stats.precision.includes(language === "zh" ? "\u8981\u6C42" : "Required") ? "" : currentText.precisionNote} </div> </div>`} ${testimonial.stats.cost_saving && renderTemplate`<div> <div class="text-3xl font-bold text-green-600 mb-2"> ${testimonial.stats.cost_saving} </div> <div class="text-sm text-gray-600"> ${currentText.costReduction}<br> ${testimonial.stats.cost_saving.includes("vs") ? "" : currentText.costNote} </div> </div>`} ${testimonial.stats.delivery_time && renderTemplate`<div> <div class="text-3xl font-bold text-blue-600 mb-2"> ${testimonial.stats.delivery_time} </div> <div class="text-sm text-gray-600"> ${currentText.deliveryTime}<br> ${testimonial.stats.delivery_time.includes("vs") ? "" : currentText.deliveryNote} </div> </div>`} ${testimonial.stats.quality_rate && renderTemplate`<div> <div class="text-3xl font-bold text-orange-600 mb-2"> ${testimonial.stats.quality_rate} </div> <div class="text-sm text-gray-600"> ${currentText.qualityRate}<br> ${testimonial.stats.quality_rate.includes(language === "zh" ? "\u8FDE\u7EED" : "consecutive") ? "" : currentText.qualityNote} </div> </div>`} </div>`} </div> <!-- Visual --> <div class="bg-gradient-to-br from-purple-600 to-blue-500 p-8 lg:p-12 text-white"> <div class="space-y-6"> <!-- Product Images --> <div class="mb-6"> <h4 class="text-xl font-bold mb-4">${currentText.showcaseTitle}</h4> <div class="grid grid-cols-2 gap-4"> <div class="relative rounded-lg overflow-hidden"> <img src="/images/manufacturing/precision-tools.jpg"${addAttribute(currentText.precisionTools, "alt")} class="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"> <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> <div class="absolute bottom-2 left-2 text-xs font-medium">${currentText.precisionTools}</div> </div> <div class="relative rounded-lg overflow-hidden"> <img src="/images/manufacturing/machining-process-1.jpg"${addAttribute(currentText.machiningProcess, "alt")} class="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"> <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> <div class="absolute bottom-2 left-2 text-xs font-medium">${currentText.machiningProcess}</div> </div> </div> </div> <div> <h4 class="text-xl font-bold mb-4">${currentText.projectDetails}</h4> <div class="space-y-3"> <div class="flex justify-between"> <span class="text-purple-100">${currentText.productType}</span> <span class="font-semibold">${currentText.products.robotJoint}</span> </div> <div class="flex justify-between"> <span class="text-purple-100">${currentText.material}</span> <span class="font-semibold">${currentText.products.aluminum}</span> </div> <div class="flex justify-between"> <span class="text-purple-100">${currentText.precisionReq}</span> <span class="font-semibold">project-specific</span> </div> <div class="flex justify-between"> <span class="text-purple-100">${currentText.quantity}</span> <span class="font-semibold">50${currentText.products.pieces}</span> </div> <div class="flex justify-between"> <span class="text-purple-100">${currentText.deliveryReq}</span> <span class="font-semibold">3${currentText.products.withinDays}</span> </div> </div> </div> <div class="border-t border-purple-400 pt-4"> <h5 class="font-semibold mb-2">${currentText.customerFeedback}</h5> <p class="text-purple-100 text-sm"> ${language === "zh" ? '"Geppetto\u4E0D\u4EC5\u5728\u4EF7\u683C\u548C\u8D28\u91CF\u4E0A\u8D85\u51FA\u9884\u671F\uFF0C\u66F4\u91CD\u8981\u7684\u662F\u8BA9\u6211\u4EEC\u7684\u4EA7\u54C1\u5F00\u53D1\u5468\u671F\u7F29\u77ED\u4E8650%\u3002\u8FD9\u79CD\u5408\u4F5C\u6A21\u5F0F\u8BA9\u6211\u4EEC\u80FD\u591F\u66F4\u5FEB\u5730\u63A8\u51FA\u65B0\u4EA7\u54C1\u3002"' : '"Beyond price and quality expectations, Geppetto shortened our product development cycle by 50%. This partnership model enables us to launch new products faster."'} </p> </div> </div> </div> </div> </div>`)} </div> </div> </section>`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/marketing/TestimonialSection.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://geppetto.studio");
const $$CompactCostCalculator = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CompactCostCalculator;
  const { className = "", language = "zh" } = Astro2.props;
  const text = {
    zh: {
      title: "\u6210\u672C\u9884\u4F30\u53C2\u8003",
      subtitle: "\u57FA\u672C\u53C2\u6570\u7C97\u7565\u4F30\u7B97",
      length: "\u957F\u5EA6(mm)",
      width: "\u5BBD\u5EA6(mm)",
      thickness: "\u539A\u5EA6(mm)",
      quantity: "\u6570\u91CF",
      material: "\u6750\u6599",
      complexity: "\u590D\u6742\u5EA6",
      calculate: "\u7ACB\u5373\u4F30\u7B97",
      calculating: "\u8BA1\u7B97\u4E2D...",
      getQuote: "\u83B7\u53D6\u4E13\u4E1A\u62A5\u4EF7",
      materials: {
        "aluminum-6061": "6061\u94DD\u5408\u91D1",
        "aluminum-7075": "7075\u94DD\u5408\u91D1",
        "steel-304": "304\u4E0D\u9508\u94A2",
        "steel-316": "316\u4E0D\u9508\u94A2"
      },
      complexities: {
        simple: "\u7B80\u5355",
        medium: "\u4E2D\u7B49",
        complex: "\u590D\u6742"
      }
    },
    en: {
      title: "Cost Estimation Reference",
      subtitle: "Basic parameters rough estimate",
      length: "Length(mm)",
      width: "Width(mm)",
      thickness: "Thickness(mm)",
      quantity: "Quantity",
      material: "Material",
      complexity: "Complexity",
      calculate: "Calculate Now",
      calculating: "Calculating...",
      getQuote: "Get Professional Quote",
      materials: {
        "aluminum-6061": "Aluminum 6061",
        "aluminum-7075": "Aluminum 7075",
        "steel-304": "Stainless 304",
        "steel-316": "Stainless 316"
      },
      complexities: {
        simple: "Simple",
        medium: "Medium",
        complex: "Complex"
      }
    }
  };
  const t = text[language];
  return renderTemplate(_a || (_a = __template(["", "<div", ' data-astro-cid-mqowdqh2> <div class="text-center mb-6" data-astro-cid-mqowdqh2> <h3 class="text-2xl font-bold text-gray-800 mb-2" data-astro-cid-mqowdqh2>', '</h3> <p class="text-gray-600 text-sm" data-astro-cid-mqowdqh2>', '</p> </div> <form id="compact-calculator-form" class="space-y-4" data-astro-cid-mqowdqh2> <!-- \u5C3A\u5BF8\u8F93\u5165 --> <div class="grid grid-cols-3 gap-3" data-astro-cid-mqowdqh2> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <input type="number" id="calc-length" placeholder="100" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-astro-cid-mqowdqh2> </div> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <input type="number" id="calc-width" placeholder="50" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-astro-cid-mqowdqh2> </div> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <input type="number" id="calc-thickness" placeholder="10" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-astro-cid-mqowdqh2> </div> </div> <!-- \u6750\u6599\u548C\u53C2\u6570 --> <div class="grid grid-cols-2 gap-3" data-astro-cid-mqowdqh2> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <select id="calc-material" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" data-astro-cid-mqowdqh2> <option value="aluminum-6061" data-astro-cid-mqowdqh2>', '</option> <option value="aluminum-7075" data-astro-cid-mqowdqh2>', '</option> <option value="steel-304" data-astro-cid-mqowdqh2>', '</option> <option value="steel-316" data-astro-cid-mqowdqh2>', '</option> </select> </div> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <select id="calc-complexity" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" data-astro-cid-mqowdqh2> <option value="simple" data-astro-cid-mqowdqh2>', '</option> <option value="medium" data-astro-cid-mqowdqh2>', '</option> <option value="complex" data-astro-cid-mqowdqh2>', '</option> </select> </div> </div> <!-- \u6570\u91CF --> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <input type="number" id="calc-quantity" value="1" min="1" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-astro-cid-mqowdqh2> </div> <!-- \u8BA1\u7B97\u6309\u94AE --> <button type="submit" id="calc-submit" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg" data-astro-cid-mqowdqh2> ', ' </button> </form> <!-- \u7ED3\u679C\u663E\u793A --> <div id="calc-results" class="hidden mt-6" data-astro-cid-mqowdqh2> <!-- \u52A8\u6001\u751F\u6210\u7ED3\u679C --> </div> </div> <script>(function(){', `
  class CompactCalculator {
    constructor() {
      // \u6750\u6599\u4EF7\u683C (\u7B80\u5316\u7248)
      this.materialPrices = {
        'aluminum-6061': 18,
        'aluminum-7075': 35,
        'steel-304': 14,
        'steel-316': 18
      };
      
      this.materialDensities = {
        'aluminum-6061': 2700,
        'aluminum-7075': 2800,
        'steel-304': 7850,
        'steel-316': 8000
      };

      this.complexityFactors = {
        simple: 1.0,
        medium: 1.2,
        complex: 1.5
      };

      this.init();
    }

    init() {
      const form = document.getElementById('compact-calculator-form');
      const submitBtn = document.getElementById('calc-submit');
      
      if (form && submitBtn) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.calculate();
        });
      }
    }

    calculate() {
      const submitBtn = document.getElementById('calc-submit');
      const resultsDiv = document.getElementById('calc-results');
      
      // \u83B7\u53D6\u53C2\u6570
      const length = parseFloat(document.getElementById('calc-length').value) || 100;
      const width = parseFloat(document.getElementById('calc-width').value) || 50;
      const thickness = parseFloat(document.getElementById('calc-thickness').value) || 10;
      const quantity = parseInt(document.getElementById('calc-quantity').value) || 1;
      const material = document.getElementById('calc-material').value;
      const complexity = document.getElementById('calc-complexity').value;

      // \u663E\u793A\u52A0\u8F7D\u72B6\u6001
      submitBtn.disabled = true;
      submitBtn.textContent = text.calculating;

      setTimeout(() => {
        try {
          const costs = this.computeCosts({
            length, width, thickness, quantity, material, complexity
          });
          
          this.displayResults(costs, resultsDiv);
          resultsDiv.classList.remove('hidden');
          
        } catch (error) {
          console.error('\u8BA1\u7B97\u9519\u8BEF:', error);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = text.calculate;
        }
      }, 800); // \u6A21\u62DF\u8BA1\u7B97\u65F6\u95F4
    }

    computeCosts(params) {
      // \u4F53\u79EF\u548C\u91CD\u91CF\u8BA1\u7B97
      const volume = (params.length * params.width * params.thickness) / 1000000000; // m\xB3
      const weight = volume * this.materialDensities[params.material];

      // \u6750\u6599\u6210\u672C (\u7B80\u5316)
      const materialPrice = this.materialPrices[params.material];
      const materialCost = weight * materialPrice * 3.1; // \u5305\u542B\u635F\u8017

      // \u52A0\u5DE5\u6210\u672C (\u7B80\u5316)
      const baseRate = 55;
      const volumeFactor = Math.max(0.8, Math.pow(volume * 1000, 0.4) * 3.8);
      const complexityFactor = this.complexityFactors[params.complexity];
      const machiningCost = baseRate * volumeFactor * complexityFactor;

      // \u8868\u9762\u5904\u7406 (\u57FA\u7840)
      const surfaceArea = 2 * (params.length * params.width + params.length * params.thickness + params.width * params.thickness);
      const surfaceFinishCost = 6 * surfaceArea / 10000;

      // \u76F4\u63A5\u6210\u672C\u548C\u5546\u4E1A\u8FD0\u8425
      const directCost = materialCost + machiningCost + surfaceFinishCost;
      const businessFactor = 4.18; // 3.8 * 1.1 (\u4E0A\u6D6E10%)
      const unitCost = directCost * businessFactor;
      const totalCost = unitCost * params.quantity;

      // \u9EC4\u91D1\u5B9A\u4EF7\u6A21\u677F\u5206\u89E3
      return {
        unitCost: unitCost.toFixed(0),
        totalCost: totalCost.toFixed(0),
        breakdown: {
          transparentThirdParty: (materialCost + surfaceFinishCost * 0.3).toFixed(0),
          engineeringSetup: (machiningCost * 0.4).toFixed(0),
          professionalService: (machiningCost * 0.6 + surfaceFinishCost * 0.7).toFixed(0),
          businessOperation: (directCost * (businessFactor - 1)).toFixed(0)
        },
        weight: weight.toFixed(3)
      };
    }

    displayResults(costs, container) {
      const quoteUrl = language === 'zh' ? '/zh/create-quote' : '/en/create-quote';
      
      container.innerHTML = \`
        <div class="bg-white rounded-xl p-5 shadow-lg">
          <h4 class="text-lg font-bold text-center text-gray-800 mb-4">\u4F30\u7B97\u7ED3\u679C</h4>
          
          <!-- \u6838\u5FC3\u4EF7\u683C -->
          <div class="text-center mb-4">
            <div class="text-3xl font-bold text-purple-600 mb-1">\xA5\${costs.totalCost}</div>
            <div class="text-sm text-gray-600">\u603B\u4F30\u7B97\u4EF7\u683C</div>
            <div class="text-xs text-gray-500">\u5355\u4EF7 \xA5\${costs.unitCost}</div>
          </div>

          <!-- \u7CBE\u7B80\u7248\u5206\u89E3 -->
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-600">\u6750\u6599\u4E0E\u5904\u7406</span>
              <span class="font-medium">\xA5\${costs.breakdown.transparentThirdParty}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">\u5DE5\u7A0B\u8BBE\u8BA1</span>
              <span class="font-medium">\xA5\${costs.breakdown.engineeringSetup}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">\u5236\u9020\u54C1\u63A7</span>
              <span class="font-medium">\xA5\${costs.breakdown.professionalService}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">\u8FD0\u8425\u4FDD\u969C</span>
              <span class="font-medium">\xA5\${costs.breakdown.businessOperation}</span>
            </div>
          </div>

          <!-- \u83B7\u53D6\u4E13\u4E1A\u62A5\u4EF7\u6309\u94AE -->
          <div class="mt-5 text-center">
            <div class="text-xs text-gray-500 mb-3">
              \u6CE8\u610F\uFF1A\u6B64\u4E3A\u7C97\u7565\u4F30\u7B97\uFF0C\u7CBE\u51C6\u62A5\u4EF7\u9700\u4E13\u5BB6\u5206\u6790CAD\u6587\u4EF6
            </div>
            <a 
              href="\${quoteUrl}"
              class="inline-block w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2.5 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 text-sm"
            >
              \${text.getQuote}
            </a>
          </div>
        </div>
      \`;
    }
  }

  // \u521D\u59CB\u5316
  document.addEventListener('DOMContentLoaded', () => {
    new CompactCalculator();
  });
})();<\/script> `], ["", "<div", ' data-astro-cid-mqowdqh2> <div class="text-center mb-6" data-astro-cid-mqowdqh2> <h3 class="text-2xl font-bold text-gray-800 mb-2" data-astro-cid-mqowdqh2>', '</h3> <p class="text-gray-600 text-sm" data-astro-cid-mqowdqh2>', '</p> </div> <form id="compact-calculator-form" class="space-y-4" data-astro-cid-mqowdqh2> <!-- \u5C3A\u5BF8\u8F93\u5165 --> <div class="grid grid-cols-3 gap-3" data-astro-cid-mqowdqh2> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <input type="number" id="calc-length" placeholder="100" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-astro-cid-mqowdqh2> </div> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <input type="number" id="calc-width" placeholder="50" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-astro-cid-mqowdqh2> </div> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <input type="number" id="calc-thickness" placeholder="10" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-astro-cid-mqowdqh2> </div> </div> <!-- \u6750\u6599\u548C\u53C2\u6570 --> <div class="grid grid-cols-2 gap-3" data-astro-cid-mqowdqh2> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <select id="calc-material" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" data-astro-cid-mqowdqh2> <option value="aluminum-6061" data-astro-cid-mqowdqh2>', '</option> <option value="aluminum-7075" data-astro-cid-mqowdqh2>', '</option> <option value="steel-304" data-astro-cid-mqowdqh2>', '</option> <option value="steel-316" data-astro-cid-mqowdqh2>', '</option> </select> </div> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <select id="calc-complexity" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" data-astro-cid-mqowdqh2> <option value="simple" data-astro-cid-mqowdqh2>', '</option> <option value="medium" data-astro-cid-mqowdqh2>', '</option> <option value="complex" data-astro-cid-mqowdqh2>', '</option> </select> </div> </div> <!-- \u6570\u91CF --> <div data-astro-cid-mqowdqh2> <label class="block text-xs font-medium text-gray-700 mb-1" data-astro-cid-mqowdqh2>', '</label> <input type="number" id="calc-quantity" value="1" min="1" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-astro-cid-mqowdqh2> </div> <!-- \u8BA1\u7B97\u6309\u94AE --> <button type="submit" id="calc-submit" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg" data-astro-cid-mqowdqh2> ', ' </button> </form> <!-- \u7ED3\u679C\u663E\u793A --> <div id="calc-results" class="hidden mt-6" data-astro-cid-mqowdqh2> <!-- \u52A8\u6001\u751F\u6210\u7ED3\u679C --> </div> </div> <script>(function(){', `
  class CompactCalculator {
    constructor() {
      // \u6750\u6599\u4EF7\u683C (\u7B80\u5316\u7248)
      this.materialPrices = {
        'aluminum-6061': 18,
        'aluminum-7075': 35,
        'steel-304': 14,
        'steel-316': 18
      };
      
      this.materialDensities = {
        'aluminum-6061': 2700,
        'aluminum-7075': 2800,
        'steel-304': 7850,
        'steel-316': 8000
      };

      this.complexityFactors = {
        simple: 1.0,
        medium: 1.2,
        complex: 1.5
      };

      this.init();
    }

    init() {
      const form = document.getElementById('compact-calculator-form');
      const submitBtn = document.getElementById('calc-submit');
      
      if (form && submitBtn) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.calculate();
        });
      }
    }

    calculate() {
      const submitBtn = document.getElementById('calc-submit');
      const resultsDiv = document.getElementById('calc-results');
      
      // \u83B7\u53D6\u53C2\u6570
      const length = parseFloat(document.getElementById('calc-length').value) || 100;
      const width = parseFloat(document.getElementById('calc-width').value) || 50;
      const thickness = parseFloat(document.getElementById('calc-thickness').value) || 10;
      const quantity = parseInt(document.getElementById('calc-quantity').value) || 1;
      const material = document.getElementById('calc-material').value;
      const complexity = document.getElementById('calc-complexity').value;

      // \u663E\u793A\u52A0\u8F7D\u72B6\u6001
      submitBtn.disabled = true;
      submitBtn.textContent = text.calculating;

      setTimeout(() => {
        try {
          const costs = this.computeCosts({
            length, width, thickness, quantity, material, complexity
          });
          
          this.displayResults(costs, resultsDiv);
          resultsDiv.classList.remove('hidden');
          
        } catch (error) {
          console.error('\u8BA1\u7B97\u9519\u8BEF:', error);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = text.calculate;
        }
      }, 800); // \u6A21\u62DF\u8BA1\u7B97\u65F6\u95F4
    }

    computeCosts(params) {
      // \u4F53\u79EF\u548C\u91CD\u91CF\u8BA1\u7B97
      const volume = (params.length * params.width * params.thickness) / 1000000000; // m\xB3
      const weight = volume * this.materialDensities[params.material];

      // \u6750\u6599\u6210\u672C (\u7B80\u5316)
      const materialPrice = this.materialPrices[params.material];
      const materialCost = weight * materialPrice * 3.1; // \u5305\u542B\u635F\u8017

      // \u52A0\u5DE5\u6210\u672C (\u7B80\u5316)
      const baseRate = 55;
      const volumeFactor = Math.max(0.8, Math.pow(volume * 1000, 0.4) * 3.8);
      const complexityFactor = this.complexityFactors[params.complexity];
      const machiningCost = baseRate * volumeFactor * complexityFactor;

      // \u8868\u9762\u5904\u7406 (\u57FA\u7840)
      const surfaceArea = 2 * (params.length * params.width + params.length * params.thickness + params.width * params.thickness);
      const surfaceFinishCost = 6 * surfaceArea / 10000;

      // \u76F4\u63A5\u6210\u672C\u548C\u5546\u4E1A\u8FD0\u8425
      const directCost = materialCost + machiningCost + surfaceFinishCost;
      const businessFactor = 4.18; // 3.8 * 1.1 (\u4E0A\u6D6E10%)
      const unitCost = directCost * businessFactor;
      const totalCost = unitCost * params.quantity;

      // \u9EC4\u91D1\u5B9A\u4EF7\u6A21\u677F\u5206\u89E3
      return {
        unitCost: unitCost.toFixed(0),
        totalCost: totalCost.toFixed(0),
        breakdown: {
          transparentThirdParty: (materialCost + surfaceFinishCost * 0.3).toFixed(0),
          engineeringSetup: (machiningCost * 0.4).toFixed(0),
          professionalService: (machiningCost * 0.6 + surfaceFinishCost * 0.7).toFixed(0),
          businessOperation: (directCost * (businessFactor - 1)).toFixed(0)
        },
        weight: weight.toFixed(3)
      };
    }

    displayResults(costs, container) {
      const quoteUrl = language === 'zh' ? '/zh/create-quote' : '/en/create-quote';
      
      container.innerHTML = \\\`
        <div class="bg-white rounded-xl p-5 shadow-lg">
          <h4 class="text-lg font-bold text-center text-gray-800 mb-4">\u4F30\u7B97\u7ED3\u679C</h4>
          
          <!-- \u6838\u5FC3\u4EF7\u683C -->
          <div class="text-center mb-4">
            <div class="text-3xl font-bold text-purple-600 mb-1">\xA5\\\${costs.totalCost}</div>
            <div class="text-sm text-gray-600">\u603B\u4F30\u7B97\u4EF7\u683C</div>
            <div class="text-xs text-gray-500">\u5355\u4EF7 \xA5\\\${costs.unitCost}</div>
          </div>

          <!-- \u7CBE\u7B80\u7248\u5206\u89E3 -->
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-600">\u6750\u6599\u4E0E\u5904\u7406</span>
              <span class="font-medium">\xA5\\\${costs.breakdown.transparentThirdParty}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">\u5DE5\u7A0B\u8BBE\u8BA1</span>
              <span class="font-medium">\xA5\\\${costs.breakdown.engineeringSetup}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">\u5236\u9020\u54C1\u63A7</span>
              <span class="font-medium">\xA5\\\${costs.breakdown.professionalService}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">\u8FD0\u8425\u4FDD\u969C</span>
              <span class="font-medium">\xA5\\\${costs.breakdown.businessOperation}</span>
            </div>
          </div>

          <!-- \u83B7\u53D6\u4E13\u4E1A\u62A5\u4EF7\u6309\u94AE -->
          <div class="mt-5 text-center">
            <div class="text-xs text-gray-500 mb-3">
              \u6CE8\u610F\uFF1A\u6B64\u4E3A\u7C97\u7565\u4F30\u7B97\uFF0C\u7CBE\u51C6\u62A5\u4EF7\u9700\u4E13\u5BB6\u5206\u6790CAD\u6587\u4EF6
            </div>
            <a 
              href="\\\${quoteUrl}"
              class="inline-block w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2.5 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 text-sm"
            >
              \\\${text.getQuote}
            </a>
          </div>
        </div>
      \\\`;
    }
  }

  // \u521D\u59CB\u5316
  document.addEventListener('DOMContentLoaded', () => {
    new CompactCalculator();
  });
})();<\/script> `])), maybeRenderHead(), addAttribute(`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 ${className}`, "class"), t.title, t.subtitle, t.length, t.width, t.thickness, t.material, t.materials["aluminum-6061"], t.materials["aluminum-7075"], t.materials["steel-304"], t.materials["steel-316"], t.complexity, t.complexities.simple, t.complexities.medium, t.complexities.complex, t.quantity, t.calculate, defineScriptVars({ language, text: t }));
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/islands/CompactCostCalculator.astro", void 0);

export { $$HeroSection as $, $$CompactCostCalculator as a, $$AdvantagesGrid as b, $$TestimonialSection as c };
