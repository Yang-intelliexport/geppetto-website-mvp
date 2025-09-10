/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as renderScript } from '../../chunks/astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_3sUPClHz.mjs';
export { renderers } from '../../renderers.mjs';

const $$Calculator = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Manufacturing Cost Calculator | Instant Estimates | Geppetto", "description": "Get instant manufacturing cost estimates with our AI-powered calculator. Upload CAD files and receive preliminary quotes in seconds.", "keywords": ["cost calculator", "manufacturing estimate", "cnc quote calculator", "instant pricing", "cad file quote"] }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h1 class="text-4xl md:text-6xl font-bold mb-6">
Manufacturing Cost Calculator
</h1> <p class="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
Get instant cost estimates for your manufacturing projects with our AI-powered calculator
</p> </div> </section>  <section class="py-16 bg-white"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="bg-gray-50 rounded-lg p-8"> <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
Quick Cost Estimate
</h2> <!-- Calculator Form --> <form class="space-y-6"> <!-- Material Selection --> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Material Type
</label> <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"> <option value="">Select Material</option> <option value="aluminum">Aluminum 6061</option> <option value="steel">Steel 4140</option> <option value="stainless">Stainless Steel 316</option> <option value="titanium">Titanium Ti-6Al-4V</option> <option value="brass">Brass C360</option> <option value="plastic">Engineering Plastics</option> </select> </div> <!-- Dimensions --> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Length (mm)
</label> <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="100"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Width (mm)
</label> <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="50"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Height (mm)
</label> <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="25"> </div> </div> <!-- Quantity --> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Quantity
</label> <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="1"> </div> <!-- Tolerance --> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Tolerance Requirements
</label> <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"> <option value="standard">Standard (Project-based)</option> <option value="tight">Tight (Requirements-based)</option> <option value="precision">High Precision (Custom needs)</option> <option value="ultra">Ultra Precision (Special requirements)</option> </select> </div> <!-- Surface Finish --> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Surface Finish
</label> <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"> <option value="standard">Standard (Ra 3.2μm)</option> <option value="smooth">Smooth (Ra 1.6μm)</option> <option value="polished">Polished (Ra 0.8μm)</option> <option value="mirror">Mirror Finish (Ra 0.2μm)</option> </select> </div> <!-- Calculate Button --> <button type="button" class="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-purple-700 transition-colors">
Calculate Estimate
</button> </form> <!-- Results Section --> <div id="calculator-results" class="mt-8 p-6 bg-white rounded-lg border-2 border-dashed border-gray-300 hidden"> <h3 class="text-xl font-bold text-gray-900 mb-4">Cost Estimate</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <div class="text-3xl font-bold text-purple-600 mb-2">$XX.XX</div> <div class="text-gray-600">Per Unit</div> <div class="text-sm text-gray-500 mt-2">
*Estimated cost based on standard parameters
</div> </div> <div class="space-y-2 text-sm"> <div class="flex justify-between"> <span>Material Cost:</span> <span>$XX.XX</span> </div> <div class="flex justify-between"> <span>Machining Time:</span> <span>$XX.XX</span> </div> <div class="flex justify-between"> <span>Setup Cost:</span> <span>$XX.XX</span> </div> <div class="flex justify-between border-t pt-2 font-medium"> <span>Total:</span> <span>$XX.XX</span> </div> </div> </div> <div class="mt-6 pt-6 border-t"> <p class="text-sm text-gray-600 mb-4">
For a detailed quote with your actual CAD file, use our AI Quote system:
</p> <a href="/en/create-quote" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
Get AI Quote with CAD File
</a> </div> </div> </div> </div> </section>  <section class="py-16 bg-gray-50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl font-bold text-gray-900 mb-4">
Why Use Our Calculator?
</h2> <p class="text-xl text-gray-600 max-w-3xl mx-auto">
Get preliminary estimates instantly, then upgrade to precise AI quotes
</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <!-- Instant Results --> <div class="text-center"> <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
⚡
</div> <h3 class="text-xl font-bold text-gray-900 mb-3">Instant Results</h3> <p class="text-gray-600">
Get preliminary cost estimates in seconds, no waiting required.
</p> </div> <!-- AI Powered --> <div class="text-center"> <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
🤖
</div> <h3 class="text-xl font-bold text-gray-900 mb-3">AI Powered</h3> <p class="text-gray-600">
Based on real manufacturing data and machine learning algorithms.
</p> </div> <!-- No Commitment --> <div class="text-center"> <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
✓
</div> <h3 class="text-xl font-bold text-gray-900 mb-3">No Commitment</h3> <p class="text-gray-600">
Free to use, no registration required, no obligation to purchase.
</p> </div> </div> </div> </section>  <section class="py-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h2 class="text-3xl md:text-4xl font-bold mb-6">
Ready for a Precise Quote?
</h2> <p class="text-xl mb-8 max-w-3xl mx-auto opacity-90">
Upload your CAD file for an accurate AI-powered quote with detailed analysis
</p> <a href="/en/create-quote" class="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
Get AI Quote Now
</a> </div> </section> ${renderScript($$result2, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/calculator.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/calculator.astro", void 0);

const $$file = "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/pages/en/calculator.astro";
const $$url = "/en/calculator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calculator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
