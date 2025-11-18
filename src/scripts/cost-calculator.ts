type CalculatorParams = {
  projectName: string
  quantity: number
  length: number
  width: number
  thickness: number
  materialType: string
  materialGrade: string
  toleranceLevel: string
  surfaceFinish: string
  complexity: string
  deliveryTime: string
  iso9001: boolean
  as9100: boolean
  quality_certifications: boolean
}

type CostBreakdown = {
  transparentThirdParty: string
  engineeringSetup: string
  professionalService: string
  businessOperation: string
  _internal: {
    material: string
    machining: string
    surface: string
    certification: string
    direct: string
  }
}

type CostResult = {
  materialCost: string
  machiningCost: string
  surfaceFinishCost: string
  certificationCost: string
  directCost: string
  businessFactor: number
  unitCost: string
  totalCost: string
  quantityDiscount: string
  weight: string
  volume: string
  breakdown: CostBreakdown
}

class CostCalculatorIsland {
  private materialPrices: Record<string, Record<string, number>>
  private complexityFactors: Record<string, number>
  private toleranceFactors: Record<string, number>
  private deliveryFactors: Record<string, number>
  private surfaceFinishCosts: Record<string, number>
  private debounceTimer: ReturnType<typeof setTimeout> | null = null

  constructor() {
    this.materialPrices = {
      aluminum: { '6061-t6': 18, '7075-t6': 35, '2024-t3': 22 },
      steel: { '304': 14, '316l': 18, '17-4ph': 35 },
      titanium: { 'ti-6al-4v': 120, 'grade-2': 100, 'grade-5': 140 },
      brass: { c360: 25, c464: 30 },
      plastic: { peek: 80, pom: 15, pa6: 10 },
    }

    this.complexityFactors = {
      simple: 1.0,
      medium: 1.2,
      complex: 1.5,
      'very-complex': 1.8,
    }

    this.toleranceFactors = {
      standard: 1.0,
      high: 1.15,
      ultra: 1.35,
      extreme: 1.6,
    }

    this.deliveryFactors = {
      standard: 1.0,
      fast: 1.2,
      express: 1.5,
      immediate: 2.0,
    }

    this.surfaceFinishCosts = {
      none: 0,
      anodizing: 6,
      'powder-coating': 8,
      plating: 12,
      polishing: 4,
    }

    this.initializeEventListeners()
  }

  private initializeEventListeners() {
    const calculateBtn = document.getElementById('calculate-cost')
    const form = document.getElementById('cost-calculator-form')
    if (!calculateBtn || !form) return

    calculateBtn.addEventListener('click', () => this.calculateCost())

    const inputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select')
    inputs.forEach((input) => {
      input.addEventListener('change', () => this.debounceCalculate())
    })

    const materialType = document.getElementById('material-type') as HTMLSelectElement | null
    if (materialType) {
      materialType.addEventListener('change', (event) => {
        const value = (event.target as HTMLSelectElement).value
        this.updateMaterialGrades(value)
      })
      this.updateMaterialGrades(materialType.value)
    }
  }

  private updateMaterialGrades(materialType: string) {
    const gradeSelect = document.getElementById('material-grade') as HTMLSelectElement | null
    if (!gradeSelect) return
    gradeSelect.innerHTML = ''

    const grades = Object.keys(this.materialPrices[materialType] || {})
    grades.forEach((grade) => {
      const option = document.createElement('option')
      option.value = grade
      option.textContent = grade.toUpperCase()
      gradeSelect.appendChild(option)
    })
  }

  private debounceCalculate() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
    this.debounceTimer = setTimeout(() => this.calculateCost(), 500)
  }

  private calculateCost() {
    try {
      const params = this.getFormParameters()
      const costs = this.computeCosts(params)
      this.displayResults(costs, params)
      this.hideError()
    } catch (error) {
      console.error('计算出错:', error)
      this.showError('计算过程中出现错误，请检查输入参数')
    }
  }

  private getFormParameters(): CalculatorParams {
    const getValue = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value
    const getChecked = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.checked ?? false

    return {
      projectName: getValue('project-name') || '未命名项目',
      quantity: parseInt(getValue('quantity') || '1', 10) || 1,
      length: parseFloat(getValue('length') || '100') || 100,
      width: parseFloat(getValue('width') || '50') || 50,
      thickness: parseFloat(getValue('thickness') || '10') || 10,
      materialType: getValue('material-type') || 'aluminum',
      materialGrade: getValue('material-grade') || '6061-t6',
      toleranceLevel: getValue('tolerance-level') || 'standard',
      surfaceFinish: getValue('surface-finish') || 'none',
      complexity: getValue('complexity') || 'simple',
      deliveryTime: getValue('delivery-time') || 'standard',
      iso9001: getChecked('iso9001'),
      as9100: getChecked('as9100'),
      quality_certifications: getChecked('quality_certifications'),
    }
  }

  private computeCosts(params: CalculatorParams): CostResult {
    const volume = (params.length * params.width * params.thickness) / 1_000_000_000
    const materialDensity = this.getMaterialDensity(params.materialType)
    const weight = volume * materialDensity

    const materialPricePerKg = this.materialPrices[params.materialType]?.[params.materialGrade] ?? 20
    const materialWasteFactor = 3.1
    const materialCost = weight * materialPricePerKg * materialWasteFactor

    const baseMachiningCost = this.calculateMachiningCost(params, volume)
    const complexityFactor = this.complexityFactors[params.complexity] ?? 1.0
    const toleranceFactor = this.toleranceFactors[params.toleranceLevel] ?? 1.0
    const deliveryFactor = this.deliveryFactors[params.deliveryTime] ?? 1.0
    const machiningCost = baseMachiningCost * complexityFactor * toleranceFactor * deliveryFactor

    const surfaceArea = this.calculateSurfaceArea(params)
    const surfaceFinishCost = ((this.surfaceFinishCosts[params.surfaceFinish] ?? 0) * surfaceArea) / 10000

    let certificationCost = 0
    if (params.iso9001) certificationCost += 50
    if (params.as9100) certificationCost += 100
    if (params.quality_certifications) certificationCost += 150

    const directCost = materialCost + machiningCost + surfaceFinishCost + certificationCost
    const businessOperationFactor = 4.18
    const unitCost = directCost * businessOperationFactor

    const quantityDiscount = this.calculateQuantityDiscount(params.quantity)
    const discountedUnitCost = unitCost * (1 - quantityDiscount)
    const totalCost = discountedUnitCost * params.quantity

    return {
      materialCost: materialCost.toFixed(2),
      machiningCost: machiningCost.toFixed(2),
      surfaceFinishCost: surfaceFinishCost.toFixed(2),
      certificationCost: certificationCost.toFixed(2),
      directCost: directCost.toFixed(2),
      businessFactor: businessOperationFactor,
      unitCost: discountedUnitCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
      quantityDiscount: (quantityDiscount * 100).toFixed(1),
      weight: weight.toFixed(3),
      volume: volume.toFixed(6),
      breakdown: {
        transparentThirdParty: (materialCost + surfaceFinishCost * 0.3).toFixed(2),
        engineeringSetup: (machiningCost * 0.4).toFixed(2),
        professionalService: (machiningCost * 0.6 + surfaceFinishCost * 0.7 + certificationCost).toFixed(2),
        businessOperation: (directCost * (businessOperationFactor - 1)).toFixed(2),
        _internal: {
          material: materialCost.toFixed(2),
          machining: machiningCost.toFixed(2),
          surface: surfaceFinishCost.toFixed(2),
          certification: certificationCost.toFixed(2),
          direct: directCost.toFixed(2),
        },
      },
    }
  }

  private getMaterialDensity(materialType: string) {
    const densities: Record<string, number> = {
      aluminum: 2700,
      steel: 7850,
      titanium: 4500,
      brass: 8500,
      plastic: 1200,
    }
    return densities[materialType] ?? 2700
  }

  private calculateMachiningCost(params: CalculatorParams, volume: number) {
    const complexityRates = {
      simple: 45,
      medium: 55,
      complex: 65,
      'very-complex': 75,
    }
    const rateKey = (params.complexity as keyof typeof complexityRates) || 'medium'
    const baseRate = complexityRates[rateKey] ?? 55
    const volumeFactor = Math.max(0.8, Math.pow(volume * 1000, 0.4) * 3.8)
    return baseRate * volumeFactor
  }

  private calculateSurfaceArea(params: CalculatorParams) {
    const { length, width, thickness } = params
    return 2 * (length * width + length * thickness + width * thickness)
  }

  private calculateQuantityDiscount(quantity: number) {
    if (quantity >= 1000) return 0.15
    if (quantity >= 500) return 0.12
    if (quantity >= 100) return 0.08
    if (quantity >= 50) return 0.05
    return 0
  }

  private displayResults(costs: CostResult, params: CalculatorParams) {
    const resultsDiv = document.getElementById('calculation-results')
    if (!resultsDiv) return
    const discountPercentage = Number(costs.quantityDiscount)

    resultsDiv.innerHTML = `
      <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
          💰 智能成本分析结果
        </h3>
        ${this.renderResults(costs, params, discountPercentage)}
      </div>`

    resultsDiv.classList.remove('hidden')
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  private renderResults(costs: CostResult, params: CalculatorParams, discountPercentage: number) {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        ${this.renderSummary(costs, params, discountPercentage)}
        ${this.renderBreakdown(costs)}
      </div>
      ${this.renderValueSummary()}
      <div class="mt-6 text-center">
        <div class="mb-4 text-sm text-gray-600">
          ⚡ 8小时专家审核详细报价 | 🔒 零隐藏费用保证 | ✅ ±5%精度承诺
        </div>
        <button onclick="window.location.href='/zh/create-quote'"
          class="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
          🚀 上传CAD获取专业报价
        </button>
      </div>`
  }

  private renderSummary(costs: CostResult, params: CalculatorParams, discountPercentage: number) {
    return `
      <div class="bg-white rounded-xl p-6 shadow-lg">
        <h4 class="text-lg font-bold text-gray-800 mb-4">💎 成本概览</h4>
        <div class="space-y-3">
          ${[
            ['项目名称', params.projectName],
            ['数量', `${params.quantity} 件`],
            ['单件成本', `¥${costs.unitCost}`],
            ['总成本', `¥${costs.totalCost}`],
          ]
            .map(
              ([label, value], index) => `
            <div class="flex justify-between items-center py-2 ${index === 3 ? 'border-b border-gray-200 border-b-2' : 'border-b border-gray-100'}">
              <span class="text-gray-600">${label}</span>
              <span class="font-semibold text-gray-800">${value}</span>
            </div>`
            )
            .join('')}
        </div>
        ${
          discountPercentage > 0
            ? `<div class="bg-green-50 p-3 rounded-lg mt-4">
                <div class="text-green-700 text-sm">🎉 批量优惠：${discountPercentage}% 折扣已应用</div>
               </div>`
            : ''
        }
      </div>`
  }

  private renderBreakdown(costs: CostResult) {
    const segments: Array<[string, string, string]> = [
      ['blue', '材料与基础处理', costs.breakdown.transparentThirdParty],
      ['orange', '工程设计与编程', costs.breakdown.engineeringSetup],
      ['green', '制造与品控服务', costs.breakdown.professionalService],
      ['purple', '运营管理费用', costs.breakdown.businessOperation],
    ]

    return `
      <div class="bg-white rounded-xl p-6 shadow-lg">
        <h4 class="text-lg font-bold text-gray-800 mb-4">📋 专业制造服务包</h4>
        <div class="space-y-3">
          ${segments
            .map(
              ([color, label, value]) => `
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600 flex items-center">
                <span class="w-2 h-2 bg-${color}-500 rounded-full mr-2"></span>${label}
              </span>
              <span class="font-semibold text-${color}-600">¥${value}</span>
            </div>`
            )
            .join('')}
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-400">
          技术参数：${costs.weight} kg | ${costs.volume} m³
        </div>
      </div>`
  }

  private renderValueSummary() {
    return `
      <div class="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h4 class="text-lg font-bold text-gray-800 mb-3 text-center">💎 专业制造服务价值</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="space-y-2">
            <div class="flex items-start">
              <span class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
              <span class="text-gray-600"><strong>透明第三方成本</strong>：实时材料价格 + 标准表面处理，可验证无水分</span>
            </div>
            <div class="flex items-start">
              <span class="w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2"></span>
              <span class="text-gray-600"><strong>工程设计服务</strong>：CAD分析 + CNC编程 + 工艺优化</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-start">
              <span class="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></span>
              <span class="text-gray-600"><strong>Manufacturing & Quality Control</strong>：Project-customized precision machining + Full quality monitoring</span>
            </div>
            <div class="flex items-start">
              <span class="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2"></span>
              <span class="text-gray-600"><strong>运营保障</strong>：设备维护 + 专家团队 + 交付承诺</span>
            </div>
          </div>
        </div>
      </div>`
  }

  private showError(message: string) {
    const errorDiv = document.getElementById('error-message')
    const errorText = document.getElementById('error-text')
    if (errorDiv && errorText) {
      errorText.textContent = message
      errorDiv.classList.remove('hidden')
    }
  }

  private hideError() {
    const errorDiv = document.getElementById('error-message')
    if (errorDiv) {
      errorDiv.classList.add('hidden')
    }
  }
}

export default function initCostCalculatorWidget() {
  if (typeof window === 'undefined') return

  const bootstrap = () => {
    if (document.getElementById('cost-calculator-form')) {
      new CostCalculatorIsland()
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true })
  } else {
    bootstrap()
  }
}
