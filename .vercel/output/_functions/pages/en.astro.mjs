/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute, aq as renderTransition } from '../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_3sUPClHz.mjs';
import { $ as $$HeroSection, a as $$CompactCostCalculator, b as $$AdvantagesGrid, c as $$TestimonialSection } from '../chunks/CompactCostCalculator_B_OqQ0V8.mjs';
import { $ as $$TrustIndicators } from '../chunks/TrustIndicators_DTL2n4nR.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const data = {
    seo: {
      title: "Flexible Smart Factory | Transparent Manufacturing Expert | 72-Hour Express Delivery | No MOQ CNC | Geppetto",
      description: "Flexible smart factory matches your innovation rhythm: intelligent analysis + expert validation, \xB10.1mm standard precision, 72-hour production cycle, zero minimum order. Transparent manufacturing solutions for startups.",
      keywords: ["flexible smart factory", "transparent manufacturing", "intelligent manufacturing", "digital manufacturing", "smart manufacturing", "robotics manufacturing", "electronics manufacturing", "custom CNC machining", "rapid prototyping", "micro machining", "intelligent factory", "CNC automation", "manufacturing innovation", "flexible factory", "digital twin manufacturing"]
    },
    hero: {
      title: "Flexible Smart Factory, Match Your Innovation Rhythm",
      subtitle: "Transparent Manufacturing Expert, End Pricing Confusion",
      description: "Intelligent Analysis + Expert Validation \u2022 Transparent Pricing System \u2022 72-Hour Express Delivery\n\xB10.1mm Standard Precision \u2022 Zero Minimum Order \u2022 No Hidden Fees Guarantee",
      cta: {
        primary: {
          text: "Get Instant Quote",
          href: "/en/create-quote"
        },
        secondary: {
          text: "See How We're Different",
          href: "/en/why-geppetto"
        }
      }
    },
    advantages: [
      {
        id: "transparent-pricing",
        title: "Intelligent Verification System",
        description: "End pricing confusion forever. Intelligent analysis + Expert technical validation = Comprehensive manufacturing service package with transparent value structure.",
        icon: "\u{1F48E}",
        stats: "Intelligent verification \u2022 Zero pricing surprises",
        color: "purple"
      },
      {
        id: "small-batch-specialist",
        title: "Flexible Manufacturing Response",
        description: "Perfect for startups who need 1-50 pieces. Our flexible smart factory matches your innovation rhythm and eliminates traditional MOQ barriers.",
        icon: "\u{1F680}",
        stats: "1 piece minimum \u2022 Flexible response",
        color: "blue"
      },
      {
        id: "rapid-turnaround",
        title: "72-Hour Production Complete",
        description: "When investors want to see your prototype next week, we deliver. Production completes in 72 hours, then shipping begins.",
        icon: "\u26A1",
        stats: "72H production + shipping \u2022 Production guaranteed",
        color: "green"
      },
      {
        id: "precision-quality",
        title: "Custom Precision Requirements",
        description: "Meet your specific precision needs across all industries. Our flexible quality systems adapt to your project requirements.",
        icon: "\u{1F3AF}",
        stats: "Custom precision standards \u2022 Quality assured",
        color: "orange"
      }
    ],
    testimonials: [
      {
        name: "Sarah Chen, CTO",
        company: "Robotics Startup",
        content: "Geppetto's transparent pricing system solved our manufacturing confusion. AI-assisted expert analysis + professional validation gave us clear costs upfront. The quality and speed helped accelerate our product development.",
        stats: {
          precision: "Expert verified",
          cost_saving: "$200K saved",
          delivery_time: "72H guaranteed",
          quality_rate: "Series A success"
        }
      }
    ],
    features: [
      {
        title: "Transparent Cost Analysis",
        description: "Professional manufacturing service with transparent value breakdown",
        icon: "\u2713"
      },
      {
        title: "127+ Startup Success Stories",
        description: "From prototype to Series A - we fuel innovation",
        icon: "\u2713"
      },
      {
        title: "Expert + AI Dual Review",
        description: "Expert analysis with AI assistance + 8-hour professional validation",
        icon: "\u2713"
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": data.seo.title, "description": data.seo.description, "keywords": data.seo.keywords }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div${addAttribute(renderTransition($$result2, "mcyz3ayk", "slide", "hero-section"), "data-astro-transition-scope")}> ${renderComponent($$result2, "HeroSection", $$HeroSection, { "hero": data.hero, "features": data.features, "language": "en" })} </div>  <section class="py-16 bg-white"${addAttribute(renderTransition($$result2, "265w4mex", "fade", "calculator-section"), "data-astro-transition-scope")}> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
Cost Estimation Reference
</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">
Enter basic parameters for rough cost range. For reference only, precise quotes require expert CAD analysis and professional review.
</p> </div> <div class="max-w-2xl mx-auto"> ${renderComponent($$result2, "CompactCostCalculator", $$CompactCostCalculator, { "language": "en", "className": "shadow-xl" })} </div> <div class="mt-8 text-center text-sm text-gray-500">
Note: Rough estimate only, actual quotes require expert CAD analysis and professional review | Expert detailed quotes within 8 hours | Zero hidden fees guarantee
</div> </div> </section>  <div${addAttribute(renderTransition($$result2, "jclgeunc", "fade", "advantages-section"), "data-astro-transition-scope")}> ${renderComponent($$result2, "AdvantagesGrid", $$AdvantagesGrid, { "advantages": data.advantages, "language": "en" })} </div>  <div${addAttribute(renderTransition($$result2, "2h2czxja", "slide", "testimonials-section"), "data-astro-transition-scope")}> ${renderComponent($$result2, "TestimonialSection", $$TestimonialSection, { "testimonials": data.testimonials, "language": "en" })} </div>  <div${addAttribute(renderTransition($$result2, "kekju54e", "fade", "trust-indicators"), "data-astro-transition-scope")}> ${renderComponent($$result2, "TrustIndicators", $$TrustIndicators, {})} </div>  <section class="py-16 bg-gradient-to-br from-blue-50 to-purple-50"${addAttribute(renderTransition($$result2, "eulllqdj", "slide", "advantages-comparison"), "data-astro-transition-scope")}> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
💡 Why Startups Choose Us Over Competitors
</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">
We solve the core problems that kill startup hardware projects
</p> </div> <div class="grid md:grid-cols-3 gap-8 mb-12"> <div class="bg-white rounded-xl p-6 shadow-lg text-center"> <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">💸</div> <h3 class="text-xl font-bold text-gray-900 mb-3">Pricing Confusion Nightmare</h3> <p class="text-gray-600 mb-4">"SolidWorks estimates $180, but suppliers quote $3,500. Which one is real? How do I budget for my next round?"</p> <div class="text-sm text-red-600 font-medium">❌ Hidden costs kill startups</div> </div> <div class="bg-white rounded-xl p-6 shadow-lg text-center"> <div class="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📦</div> <h3 class="text-xl font-bold text-gray-900 mb-3">MOQ Barriers</h3> <p class="text-gray-600 mb-4">"We need 5 pieces for testing, but every supplier wants 100+ minimum order. That's $50K we don't have."</p> <div class="text-sm text-yellow-600 font-medium">❌ MOQ barriers block innovation</div> </div> <div class="bg-white rounded-xl p-6 shadow-lg text-center"> <div class="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⏰</div> <h3 class="text-xl font-bold text-gray-900 mb-3">Timing Disasters</h3> <p class="text-gray-600 mb-4">"Investor demo is next week, but our supplier says 3 weeks minimum. There goes our Series A."</p> <div class="text-sm text-orange-600 font-medium">❌ Slow delivery kills opportunities</div> </div> </div> <!-- Competitive Advantage over Traditional Suppliers --> <div class="bg-white rounded-2xl p-8 shadow-xl"> <div class="text-center mb-8"> <h3 class="text-2xl font-bold text-gray-900 mb-4">Geppetto vs Traditional Suppliers</h3> <p class="text-gray-600">See why transparent manufacturing wins every time</p> </div> <div class="overflow-x-auto"> <table class="w-full"> <thead> <tr class="border-b-2 border-gray-200"> <th class="text-left py-4 px-4 font-semibold text-gray-900">Problem</th> <th class="text-center py-4 px-4 font-semibold text-green-600">Geppetto Solution</th> <th class="text-center py-4 px-4 font-semibold text-gray-500">Traditional Suppliers</th> </tr> </thead> <tbody class="divide-y divide-gray-200"> <tr> <td class="py-4 px-4 font-medium">Pricing Confusion</td> <td class="text-center py-4 px-4 text-green-600 font-bold">Professional Service Package</td> <td class="text-center py-4 px-4 text-gray-500">Black box pricing</td> </tr> <tr class="bg-gray-50"> <td class="py-4 px-4 font-medium">Small Batch Costs</td> <td class="text-center py-4 px-4 text-green-600 font-bold">Single piece pricing</td> <td class="text-center py-4 px-4 text-gray-500">100+ MOQ or 5x price</td> </tr> <tr> <td class="py-4 px-4 font-medium">Delivery Speed</td> <td class="text-center py-4 px-4 text-green-600 font-bold">72H production + shipping</td> <td class="text-center py-4 px-4 text-gray-500">2-3 weeks "maybe"</td> </tr> <tr class="bg-gray-50"> <td class="py-4 px-4 font-medium">Trust & Reliability</td> <td class="text-center py-4 px-4 text-green-600 font-bold">Traceable Process + Expert Assessment</td> <td class="text-center py-4 px-4 text-gray-500">No guarantees</td> </tr> </tbody> </table> </div> <div class="mt-6 text-center"> <p class="text-sm text-gray-500">Why pay more for uncertainty when you can get transparency?</p> </div> </div> </div> </section>  <section class="py-16 bg-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
🚀 Ready to End Your Manufacturing Nightmares?
</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">
Join 127+ startups who chose transparent manufacturing over pricing confusion
</p> </div> <div class="grid md:grid-cols-3 gap-8"> <!-- Startup-Friendly Manufacturing --> <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-blue-200"> <div class="text-center"> <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"> <span class="text-3xl text-white">🚀</span> </div> <h3 class="text-2xl font-bold text-gray-900 mb-4">Startup-Friendly Manufacturing</h3> <p class="text-gray-600 mb-6">
Perfect for startups and innovators who need single-piece production, 
              rapid iterations, and zero inventory risk.
</p> </div> <div class="space-y-3 mb-6"> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Single piece minimum</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">72-hour production cycles</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Free DFM consultation</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Scale-up support</span> </div> </div> <div class="text-center"> <a href="/en/startup-manufacturing" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
Learn More →
</a> </div> </div> <!-- Transparent Manufacturing --> <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-green-200"> <div class="text-center"> <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"> <span class="text-3xl text-white">💎</span> </div> <h3 class="text-2xl font-bold text-gray-900 mb-4">Transparent Manufacturing</h3> <p class="text-gray-600 mb-6">
End pricing confusion with detailed cost breakdowns, real-time tracking, 
              and zero hidden fees guarantee.
</p> </div> <div class="space-y-3 mb-6"> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Detailed cost breakdown</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Digital twin pricing</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Real-time dashboard</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Price lock guarantee</span> </div> </div> <div class="text-center"> <a href="/en/transparent-pricing" class="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200">
Learn More →
</a> </div> </div> <!-- Small Batch Manufacturing --> <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-purple-200"> <div class="text-center"> <div class="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"> <span class="text-3xl text-white">⚡</span> </div> <h3 class="text-2xl font-bold text-gray-900 mb-4">Small Batch Excellence</h3> <p class="text-gray-600 mb-6">
Break traditional economy of scale limitations with intelligent scheduling 
              and consistent quality from 1 to 1000+ pieces.
</p> </div> <div class="space-y-3 mb-6"> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Smart cost distribution</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Volume flexibility</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Consistent quality scaling</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">✓</span> <span class="text-sm text-gray-700">Rapid reconfiguration</span> </div> </div> <div class="text-center"> <a href="/en/small-batch-manufacturing" class="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200">
Learn More →
</a> </div> </div> </div> </div> </section>  <section class="py-20 bg-gradient-to-r from-[#7F00FF] to-[#00BFFF]"> <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"> <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
Stop Guessing. Start Building.
</h2> <p class="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
Upload your CAD file and get a transparent, detailed cost breakdown in 8 hours. See exactly where every dollar goes.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/en/create-quote" class="inline-flex items-center justify-center px-8 py-4 bg-white text-[#7F00FF] font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg text-lg">
💎 Get Professional Service Quote Now
</a> </div> <div class="mt-8 text-purple-100 text-sm">
✓ No Hidden Fees • ✓ Detailed Cost Breakdown • ✓ 72h Delivery Guarantee
</div> </div> </section> ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/index.astro", "self");

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/index.astro";
const $$url = "/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
