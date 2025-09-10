/* empty css                                    */
import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
export { renderers } from '../../renderers.mjs';

const $$QuoteView = createComponent(($$result, $$props, $$slots) => {
  const mockQuoteData = {
    quoteId: "Q1730875234567",
    timestamp: "2024-11-06T10:30:00Z",
    validUntil: "2024-11-13T10:30:00Z",
    files: [
      {
        name: "bracket_assembly.step",
        size: 2048576,
        dimensions: {
          length: 150,
          width: 80,
          height: 25
        },
        volume: 300,
        complexity: "Medium",
        material: "6061 Aluminum",
        quantity: 5
      }
    ],
    pricing: {
      // Price breakdown
      priceBreakdown: {
        engineeringSetup: 65,
        // One-time Engineering & Setup Fee
        materialCost: 285,
        // Material Cost (6061 Aluminum)
        manufacturingService: 960,
        // Manufacturing & Quality Service
        shipping: 8,
        // International Shipping
        unitProductionCost: 1245
        // Per-Unit Production Cost (Material + Manufacturing)
      },
      total: 1318,
      savings: 882},
    manufacturing: {
      shippingOptions: [
        { method: "Express Shipping", time: "1-2 days", cost: 25 },
        { method: "Standard Shipping", time: "3-5 days", cost: 15 },
        { method: "Economy Shipping", time: "5-7 days", cost: 8 }
      ],
      precision: "Custom precision",
      processes: ["CNC Milling", "Anodizing", "Quality Inspection"]},
    guarantees: {
      priceAccuracy: "\xB13%",
      productionCompensation: "10% refund for production delays",
      qualityAssurance: "100% remake if unqualified"
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Quote Details ${mockQuoteData.quoteId} | Transparent Manufacturing Quote | Geppetto`, "description": `View detailed CNC manufacturing quote with complete cost breakdown and delivery commitments. Quote ID: ${mockQuoteData.quoteId}`, "keywords": ["quote details", "manufacturing quote", "CNC quote view", "transparent pricing", "cost breakdown"], "ogImage": "/images/og-quote-view.jpg" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gray-50 py-8"> <div class="container mx-auto px-6"> <div class="max-w-6xl mx-auto"> <!-- Quote Header --> <div class="bg-white rounded-lg shadow-sm p-6 mb-6"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"> <div> <h1 class="text-3xl font-bold text-[#111827] mb-2">
Transparent Manufacturing Quote
</h1> <p class="text-lg text-gray-600">
Quote ID: <span class="font-mono text-[#7F00FF]">${mockQuoteData.quoteId}</span> </p> </div> <div class="mt-4 md:mt-0"> <div class="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
Expert Review Complete
</div> </div> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600"> <div> <span class="font-medium">Generated:</span> ${new Date(mockQuoteData.timestamp).toLocaleString("en-US")} </div> <div> <span class="font-medium">Valid Until:</span> ${new Date(mockQuoteData.validUntil).toLocaleString("en-US")} </div> <div> <span class="font-medium">Quote Status:</span> <span class="text-[#7F00FF] font-semibold">AI Assessment → Expert Review Complete</span> </div> </div> </div> <!-- Core Metrics --> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"> <!-- Total Price --> <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#7F00FF]"> <div class="text-center"> <div class="text-3xl font-bold text-[#111827] mb-2">
$${mockQuoteData.pricing.total.toLocaleString()} </div> <div class="text-gray-600 text-sm">Total Quote</div> <div class="text-green-600 text-sm mt-2">
Save $${mockQuoteData.pricing.savings.toLocaleString()} vs market
</div> </div> </div> <!-- Production Time --> <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500"> <div class="text-center"> <div class="text-3xl font-bold text-blue-600 mb-2">
72 hours
</div> <div class="text-gray-600 text-sm">Production Completion</div> <div class="text-blue-600 text-sm mt-2">
10% refund for production delays
</div> </div> </div> <!-- Precision Guarantee --> <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500"> <div class="text-center"> <div class="text-lg font-bold text-green-600 mb-2"> ${mockQuoteData.manufacturing.precision} </div> <div class="text-gray-600 text-sm">Manufacturing Precision</div> <div class="text-green-600 text-sm mt-2">
100% remake if unqualified
</div> </div> </div> </div> <!-- Shipping Options --> <div class="bg-white rounded-lg shadow-sm p-6 mb-6"> <h2 class="text-xl font-bold text-[#111827] mb-4">Shipping & Delivery Options</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> ${mockQuoteData.manufacturing.shippingOptions.map((option, index) => renderTemplate`<div class="border border-gray-200 rounded-lg p-4 hover:border-[#7F00FF] cursor-pointer transition-colors"> <div class="flex items-center justify-between mb-2"> <h3 class="font-semibold text-[#111827]">${option.method}</h3> <span class="text-[#7F00FF] font-bold">$${option.cost}</span> </div> <div class="text-sm text-gray-600">
Estimated ${option.time} delivery
</div> <div class="text-xs text-gray-500 mt-2"> ${index === 0 ? "Recommended" : index === 1 ? "Most Popular" : "Budget Option"} </div> </div>`)} </div> <div class="mt-4 p-3 bg-blue-50 rounded-lg"> <div class="text-sm text-blue-800"> <strong>Note:</strong> We guarantee 72-hour production completion and shipping.
              Shipping time is handled by courier services. 10% automatic refund for production delays.
</div> </div> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"> <!-- File Information --> <div class="bg-white rounded-lg shadow-sm p-6"> <h2 class="text-xl font-bold text-[#111827] mb-4">File Information</h2> ${mockQuoteData.files.map((file) => renderTemplate`<div class="border border-gray-200 rounded-lg p-4 mb-4"> <div class="flex items-center justify-between mb-3"> <div class="font-semibold text-[#111827]">${file.name}</div> <div class="text-sm text-gray-500"> ${(file.size / 1024 / 1024).toFixed(1)} MB
</div> </div> <div class="grid grid-cols-2 gap-4 text-sm"> <div> <div class="text-gray-600">Dimensions (mm)</div> <div class="font-medium"> ${file.dimensions.length} × ${file.dimensions.width} × ${file.dimensions.height} </div> </div> <div> <div class="text-gray-600">Volume</div> <div class="font-medium">${file.volume} cm³</div> </div> <div> <div class="text-gray-600">Material</div> <div class="font-medium">${file.material}</div> </div> <div> <div class="text-gray-600">Quantity</div> <div class="font-medium">${file.quantity} pieces</div> </div> </div> </div>`)} </div> <!-- Price Breakdown --> <div class="bg-white rounded-lg shadow-sm p-6"> <h2 class="text-xl font-bold text-[#111827] mb-2">Price Breakdown</h2> <p class="text-sm text-gray-600 mb-6">Transparent cost breakdown - every charge clearly explained</p> <div class="space-y-4"> <!-- One-time Engineering & Setup Fee --> <div class="border border-gray-200 rounded-lg p-4 bg-gray-50"> <div class="flex justify-between items-center"> <div> <h3 class="font-bold text-gray-900">One-time Engineering & Setup Fee</h3> <p class="text-xs text-gray-600 mt-1">CAM programming, machine setup, first article inspection</p> </div> <div class="text-lg font-bold text-[#7F00FF]">$${mockQuoteData.pricing.priceBreakdown.engineeringSetup}</div> </div> </div> <!-- International Shipping --> <div class="border border-gray-200 rounded-lg p-4 bg-gray-50"> <div class="flex justify-between items-center"> <div> <h3 class="font-bold text-gray-900">International Shipping</h3> <p class="text-xs text-gray-600 mt-1">Transparent third-party logistics cost</p> </div> <div class="text-lg font-bold text-[#7F00FF]">$${mockQuoteData.pricing.priceBreakdown.shipping}</div> </div> </div> <!-- Per-Unit Production Cost --> <div class="border-2 border-purple-200 rounded-lg p-4 bg-purple-50"> <div class="flex justify-between items-center mb-3"> <div> <h3 class="font-bold text-purple-900">Per-Unit Production Cost</h3> <p class="text-xs text-purple-700 mt-1">Material Cost + Manufacturing & Quality Service</p> </div> <div class="text-xl font-bold text-purple-700">$${mockQuoteData.pricing.priceBreakdown.unitProductionCost}</div> </div> <!-- Per-Unit Production Cost Details --> <div class="ml-4 space-y-2 border-l-2 border-purple-300 pl-4"> <div class="flex justify-between items-center"> <div> <span class="text-sm font-medium text-purple-800">Material Cost</span> <p class="text-xs text-purple-600 mt-1">6061 Aluminum (Most Common)</p> </div> <span class="text-sm font-semibold text-purple-700">$${mockQuoteData.pricing.priceBreakdown.materialCost}</span> </div> <div class="flex justify-between items-center"> <div> <span class="text-sm font-medium text-purple-800">Manufacturing & Quality Service</span> <p class="text-xs text-purple-600 mt-1">CNC machining, surface treatment, quality inspection, packaging</p> </div> <span class="text-sm font-semibold text-purple-700">$${mockQuoteData.pricing.priceBreakdown.manufacturingService}</span> </div> </div> </div> <!-- Quote Total --> <div class="flex justify-between items-center py-6 bg-gradient-to-r from-[#7F00FF] to-purple-700 rounded-lg px-6 mt-6 text-white"> <div> <div class="text-xl font-bold">Quote Total</div> <div class="text-sm text-purple-100">Transparent pricing + Professional service</div> </div> <div class="text-3xl font-bold">$${mockQuoteData.pricing.total}</div> </div> <!-- Value Proposition --> <div class="bg-gray-50 rounded-lg p-4 mt-4"> <h4 class="font-bold text-gray-800 mb-2">Why choose our transparent pricing?</h4> <div class="text-sm text-gray-700 space-y-1"> <p>• <strong>Transparent costs</strong>: Every charge clearly explained, no hidden fees</p> <p>• <strong>Professional guarantee</strong>: 8-hour AI-assisted expert review vs industry 2-7 day standard</p> <p>• <strong>Quality commitment</strong>: Project-specific precision standards, 100% remake guarantee</p> <p>• <strong>Fair pricing</strong>: One-time fees reasonably allocated, better rates for long-term partnerships</p> </div> </div> </div> </div> </div> <!-- Manufacturing Details --> <div class="bg-white rounded-lg shadow-sm p-6 mt-6"> <h2 class="text-xl font-bold text-[#111827] mb-4">Manufacturing Process Details</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <h3 class="font-semibold text-[#111827] mb-3">Processing Steps</h3> <div class="space-y-2"> ${mockQuoteData.manufacturing.processes.map((process, index) => renderTemplate`<div class="flex items-center"> <div class="w-6 h-6 bg-[#7F00FF] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3"> ${index + 1} </div> <span class="text-gray-700">${process}</span> </div>`)} </div> </div> <div> <h3 class="font-semibold text-[#111827] mb-3">Quality Assurance</h3> <div class="space-y-2"> <div class="flex items-center"> <span class="text-green-500 mr-2">•</span> <span class="text-gray-700">First article inspection</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">•</span> <span class="text-gray-700">In-process quality monitoring</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">•</span> <span class="text-gray-700">Final inspection before shipping</span> </div> <div class="flex items-center"> <span class="text-green-500 mr-2">•</span> <span class="text-gray-700">7-day after-sales support</span> </div> </div> </div> </div> </div> <!-- Core Promises --> <div class="bg-gradient-to-r from-[#7F00FF] to-purple-700 rounded-lg shadow-sm p-6 mt-6 text-white"> <h2 class="text-xl font-bold mb-4">Geppetto Core Promises</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="text-center"> <div class="text-2xl font-bold mb-2">${mockQuoteData.guarantees.priceAccuracy}</div> <div class="text-purple-100">Price accuracy guarantee</div> </div> <div class="text-center"> <div class="text-lg font-bold mb-2">${mockQuoteData.guarantees.productionCompensation}</div> <div class="text-purple-100">Production time commitment</div> </div> <div class="text-center"> <div class="text-lg font-bold mb-2">${mockQuoteData.guarantees.qualityAssurance}</div> <div class="text-purple-100">Quality assurance promise</div> </div> </div> </div> <!-- Action Buttons --> <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8"> <button id="confirm-order-btn" class="bg-[#7F00FF] text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-purple-700 transition-colors duration-200">
Confirm Order
</button> <button id="download-quote-btn" class="border-2 border-[#7F00FF] text-[#7F00FF] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#7F00FF] hover:text-white transition-colors duration-200">
Download Quote
</button> <button id="contact-expert-btn" class="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
Contact Expert
</button> </div> <!-- Validity Reminder --> <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6 text-center"> <div class="text-orange-800"> <span class="font-medium">Quote Validity:</span>
This quote is valid until ${new Date(mockQuoteData.validUntil).toLocaleString("en-US")}.
            Please confirm your order within the validity period to secure current pricing.
</div> </div> </div> </div> </main> ` })} ${renderScript($$result, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/quote-view.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/quote-view.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/quote-view.astro";
const $$url = "/en/quote-view";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$QuoteView,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
