class b{constructor(){this.materialPrices={aluminum:{"6061-t6":18,"7075-t6":35,"2024-t3":22},steel:{304:14,"316l":18,"17-4ph":35},titanium:{"ti-6al-4v":120,"grade-2":100,"grade-5":140},brass:{c360:25,c464:30},plastic:{peek:80,pom:15,pa6:10}},this.complexityFactors={simple:1,medium:1.2,complex:1.5,"very-complex":1.8},this.toleranceFactors={standard:1,high:1.15,ultra:1.35,extreme:1.6},this.deliveryFactors={standard:1,fast:1.2,express:1.5,immediate:2},this.surfaceFinishCosts={none:0,anodizing:6,"powder-coating":8,plating:12,polishing:4},this.initializeEventListeners()}initializeEventListeners(){const e=document.getElementById("calculate-cost"),t=document.getElementById("cost-calculator-form");if(!e||!t)return;e.addEventListener("click",()=>this.calculateCost()),t.querySelectorAll("input, select").forEach(i=>{i.addEventListener("change",()=>this.debounceCalculate())});const a=document.getElementById("material-type");a&&(a.addEventListener("change",i=>{this.updateMaterialGrades(i.target.value)}),this.updateMaterialGrades(a.value))}updateMaterialGrades(e){const t=document.getElementById("material-grade");if(!t)return;t.innerHTML="",Object.keys(this.materialPrices[e]||{}).forEach(a=>{const i=document.createElement("option");i.value=a,i.textContent=a.toUpperCase(),t.appendChild(i)})}debounceCalculate(){clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>this.calculateCost(),500)}calculateCost(){try{const e=this.getFormParameters(),t=this.computeCosts(e);this.displayResults(t,e),this.hideError()}catch(e){console.error("计算出错:",e),this.showError("计算过程中出现错误，请检查输入参数")}}getFormParameters(){return{projectName:document.getElementById("project-name")?.value||"未命名项目",quantity:parseInt(document.getElementById("quantity")?.value)||1,length:parseFloat(document.getElementById("length")?.value)||100,width:parseFloat(document.getElementById("width")?.value)||50,thickness:parseFloat(document.getElementById("thickness")?.value)||10,materialType:document.getElementById("material-type")?.value||"aluminum",materialGrade:document.getElementById("material-grade")?.value||"6061-t6",toleranceLevel:document.getElementById("tolerance-level")?.value||"standard",surfaceFinish:document.getElementById("surface-finish")?.value||"none",complexity:document.getElementById("complexity")?.value||"simple",deliveryTime:document.getElementById("delivery-time")?.value||"standard",iso9001:document.getElementById("iso9001")?.checked||!1,as9100:document.getElementById("as9100")?.checked||!1,quality_certifications:document.getElementById("quality_certifications")?.checked||!1}}computeCosts(e){const t=e.length*e.width*e.thickness/1e9,s=this.getMaterialDensity(e.materialType),a=t*s,i=this.materialPrices[e.materialType][e.materialGrade]||20,o=a*i*3.1,p=this.calculateMachiningCost(e,t),g=this.complexityFactors[e.complexity]||1,y=this.toleranceFactors[e.toleranceLevel]||1,h=this.deliveryFactors[e.deliveryTime]||1,r=p*g*y*h,x=this.calculateSurfaceArea(e),l=(this.surfaceFinishCosts[e.surfaceFinish]||0)*x/1e4;let n=0;e.iso9001&&(n+=50),e.as9100&&(n+=100),e.quality_certifications&&(n+=150);const c=o+r+l+n,d=4.18,v=c*d,u=this.calculateQuantityDiscount(e.quantity),m=v*(1-u),f=m*e.quantity;return{materialCost:o.toFixed(2),machiningCost:r.toFixed(2),surfaceFinishCost:l.toFixed(2),certificationCost:n.toFixed(2),directCost:c.toFixed(2),businessFactor:d,unitCost:m.toFixed(2),totalCost:f.toFixed(2),quantityDiscount:(u*100).toFixed(1),weight:a.toFixed(3),volume:t.toFixed(6),breakdown:{transparentThirdParty:(o+l*.3).toFixed(2),engineeringSetup:(r*.4).toFixed(2),professionalService:(r*.6+l*.7+n).toFixed(2),businessOperation:(c*(d-1)).toFixed(2),_internal:{material:o.toFixed(2),machining:r.toFixed(2),surface:l.toFixed(2),certification:n.toFixed(2),direct:c.toFixed(2)}}}}getMaterialDensity(e){return{aluminum:2700,steel:7850,titanium:4500,brass:8500,plastic:1200}[e]||2700}calculateMachiningCost(e,t){const a={simple:45,medium:55,complex:65,"very-complex":75}[e.complexity]||55,i=Math.max(.8,Math.pow(t*1e3,.4)*3.8);return a*i}calculateSurfaceArea(e){const{length:t,width:s,thickness:a}=e;return 2*(t*s+t*a+s*a)}calculateQuantityDiscount(e){return e>=1e3?.15:e>=500?.12:e>=100?.08:e>=50?.05:0}displayResults(e,t){const s=document.getElementById("calculation-results");s&&(s.innerHTML=`
        <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
            💰 智能成本分析结果
          </h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- 成本概览 -->
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <h4 class="text-lg font-bold text-gray-800 mb-4">💎 成本概览</h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                  <span class="text-gray-600">项目名称</span>
                  <span class="font-semibold text-gray-800">${t.projectName}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                  <span class="text-gray-600">数量</span>
                  <span class="font-semibold text-gray-800">${t.quantity} 件</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                  <span class="text-gray-600">单件成本</span>
                  <span class="font-bold text-green-600 text-lg">¥${e.unitCost}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-gray-200 border-b-2">
                  <span class="text-gray-800 font-semibold">总成本</span>
                  <span class="font-bold text-purple-600 text-2xl">¥${e.totalCost}</span>
                </div>
                ${e.quantityDiscount>0?`
                <div class="bg-green-50 p-3 rounded-lg">
                  <div class="text-green-700 text-sm">
                    🎉 批量优惠：${e.quantityDiscount}% 折扣已应用
                  </div>
                </div>
                `:""}
              </div>
            </div>

            <!-- 黄金定价模板分解 -->
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <h4 class="text-lg font-bold text-gray-800 mb-4">📋 专业制造服务包</h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-600 flex items-center">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    材料与基础处理
                  </span>
                  <span class="font-semibold text-blue-600">¥${e.breakdown.transparentThirdParty}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-600 flex items-center">
                    <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    工程设计与编程
                  </span>
                  <span class="font-semibold text-orange-600">¥${e.breakdown.engineeringSetup}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-600 flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    制造与品控服务
                  </span>
                  <span class="font-semibold text-green-600">¥${e.breakdown.professionalService}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-600 flex items-center">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    运营管理费用
                  </span>
                  <span class="font-semibold text-purple-600">¥${e.breakdown.businessOperation}</span>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="text-xs text-gray-400">
                  技术参数：${e.weight} kg | ${e.volume} m³
                </div>
              </div>
            </div>
          </div>
          
          <!-- 黄金定价模板：价值解释 -->
          <div class="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h4 class="text-lg font-bold text-gray-800 mb-3 text-center">💎 专业制造服务价值</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div class="space-y-2">
                <div class="flex items-start">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span class="text-gray-600"><strong>透明第三方成本</strong>：实时材料价格 + 标准表面处理，可验证无水分</span>
                </div>
                <div class="flex items-start">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span class="text-gray-600"><strong>工程设计服务</strong>：CAD分析 + CNC编程 + 工艺优化</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-start">
                  <span class="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span class="text-gray-600"><strong>Manufacturing & Quality Control</strong>：Project-customized precision machining + Full quality monitoring</span>
                </div>
                <div class="flex items-start">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span class="text-gray-600"><strong>运营保障</strong>：设备维护 + 专家团队 + 交付承诺</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-6 text-center">
            <div class="mb-4 text-sm text-gray-600">
              ⚡ 8小时专家审核详细报价 | 🔒 零隐藏费用保证 | ✅ ±5%精度承诺
            </div>
            <button 
              onclick="window.location.href='/zh/create-quote'"
              class="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🚀 上传CAD获取专业报价
            </button>
          </div>
        </div>
      `,s.classList.remove("hidden"),s.scrollIntoView({behavior:"smooth",block:"start"}))}showError(e){const t=document.getElementById("error-message"),s=document.getElementById("error-text");t&&s&&(s.textContent=e,t.classList.remove("hidden"))}hideError(){const e=document.getElementById("error-message");e&&e.classList.add("hidden")}}document.addEventListener("DOMContentLoaded",()=>{new b});
