import React, { useState, useRef } from 'react';
import { createClient } from '../lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface QuoteFormProps {
  user: User;
  language?: 'zh' | 'en';
}

export default function QuoteForm({ user, language = 'zh' }: QuoteFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [files, setFiles] = useState<File[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState('aluminum_6061');
  const formRef = useRef<HTMLFormElement>(null);

  const supabase = createClient();

  const text = {
    zh: {
      title: '提交报价请求',
      contactSection: '联系信息',
      emailLabel: '邮箱地址',
      emailPlaceholder: 'your@email.com',
      contactNameLabel: '联系人姓名',
      contactNamePlaceholder: '请输入您的姓名',
      companyNameLabel: '公司名称',
      companyNamePlaceholder: '请输入公司名称 (可选)',
      phoneLabel: '电话号码',
      phonePlaceholder: '+86 138 0000 0000 (可选)',
      productSection: '产品规格',
      materialLabel: '材料',
      quantityLabel: '数量',
      quantityPlaceholder: '请输入数量',
      fileSection: '模型文件',
      fileLabel: 'CAD文件上传',
      fileHelp: '支持格式: STEP, STL, IGES, DWG, DXF 等',
      notesLabel: '特殊要求 / 备注',
      notesPlaceholder: '请描述表面处理、公差要求、交期等特殊要求...',
      submitButton: '提交报价请求',
      submitting: '正在提交...',
      fileRequired: '请上传至少一个CAD文件',
      emailRequired: '请输入邮箱地址',
      contactNameRequired: '请输入联系人姓名',
      successMessage: '您的报价请求已成功提交！我们将在24小时内回复。',
      materials: {
        // 铝合金系列
        'aluminum_6061': '铝合金 6061-T6 (通用结构件)',
        'aluminum_7075': '铝合金 7075-T6 (高强度航空)',
        'aluminum_2024': '铝合金 2024-T3 (航空结构)',
        'aluminum_5052': '铝合金 5052-H32 (耐腐蚀)',
        'aluminum_6063': '铝合金 6063-T6 (挤压型材)',
        
        // 不锈钢系列
        'stainless_304': '不锈钢 304 (通用耐腐蚀)',
        'stainless_316': '不锈钢 316 (海洋级耐腐蚀)',
        'stainless_316L': '不锈钢 316L (低碳耐腐蚀)',
        'stainless_17_4PH': '不锈钢 17-4PH (析出硬化)',
        
        // 碳钢系列
        'steel_1018': '碳钢 1018 (低碳钢)',
        'steel_1045': '碳钢 1045 (中碳钢)',
        'steel_4140': '合金钢 4140 (高强度)',
        'steel_a36': '结构钢 A36 (焊接结构)',
        
        // 工具钢系列
        'tool_steel_d2': '工具钢 D2 (高碳高铬)',
        'tool_steel_a2': '工具钢 A2 (空气硬化)',
        'tool_steel_o1': '工具钢 O1 (油淬)',
        
        // 钛合金系列
        'titanium_gr2': '钛合金 Grade 2 (商业纯钛)',
        'titanium_6al4v': '钛合金 Ti-6Al-4V (航空级)',
        
        // 黄铜铜合金系列
        'brass_360': '黄铜 360 (易切削)',
        'brass_c110': '紫铜 C110 (导电)',
        'bronze_932': '青铜 932 (轴承合金)',
        
        // 工程塑料系列
        'plastic_abs': '工程塑料 ABS',
        'plastic_pom': '工程塑料 POM (聚甲醛)',
        'plastic_nylon6': '工程塑料 PA6 (尼龙6)',
        'plastic_peek': '工程塑料 PEEK (高性能)',
        'plastic_pei': '工程塑料 PEI (琥珀色)',
        
        other: '其他材料 (请在下方详细说明)'
      },
      customMaterialLabel: '请输入材料名称',
      customMaterialPlaceholder: '例如：碳纤维、陶瓷等',
      materialGroups: {
        aluminum: '铝合金系列',
        stainless: '不锈钢系列',
        carbon_steel: '碳钢系列',
        tool_steel: '工具钢系列',
        titanium: '钛合金系列',
        copper_alloy: '铜合金系列',
        engineering_plastic: '工程塑料',
        other: '其他'
      }
    },
    en: {
      title: 'Submit Quote Request',
      contactSection: 'Contact Information',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your@email.com',
      contactNameLabel: 'Contact Name',
      contactNamePlaceholder: 'Enter your name',
      companyNameLabel: 'Company Name',
      companyNamePlaceholder: 'Enter company name (optional)',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+1 (555) 123-4567 (optional)',
      productSection: 'Product Specifications',
      materialLabel: 'Material',
      quantityLabel: 'Quantity',
      quantityPlaceholder: 'Enter quantity',
      fileSection: 'Model File',
      fileLabel: 'CAD File Upload',
      fileHelp: 'Supported formats: STEP, STL, IGES, DWG, DXF, etc.',
      notesLabel: 'Special Requirements / Notes',
      notesPlaceholder: 'Please describe surface finish, tolerances, delivery requirements, etc...',
      submitButton: 'Submit Quote Request',
      submitting: 'Submitting...',
      fileRequired: 'Please upload at least one CAD file',
      emailRequired: 'Please enter email address',
      contactNameRequired: 'Please enter contact name',
      successMessage: 'Your quote request has been submitted successfully! We will respond within 24 hours.',
      materials: {
        // Aluminum Series
        'aluminum_6061': 'Aluminum 6061-T6 (General Structural)',
        'aluminum_7075': 'Aluminum 7075-T6 (High Strength Aviation)',
        'aluminum_2024': 'Aluminum 2024-T3 (Aircraft Structure)',
        'aluminum_5052': 'Aluminum 5052-H32 (Corrosion Resistant)',
        'aluminum_6063': 'Aluminum 6063-T6 (Extrusion)',
        
        // Stainless Steel Series
        'stainless_304': 'Stainless Steel 304 (General Corrosion Resistant)',
        'stainless_316': 'Stainless Steel 316 (Marine Grade)',
        'stainless_316L': 'Stainless Steel 316L (Low Carbon)',
        'stainless_17_4PH': 'Stainless Steel 17-4PH (Precipitation Hardening)',
        
        // Carbon Steel Series
        'steel_1018': 'Carbon Steel 1018 (Low Carbon)',
        'steel_1045': 'Carbon Steel 1045 (Medium Carbon)',
        'steel_4140': 'Alloy Steel 4140 (High Strength)',
        'steel_a36': 'Structural Steel A36 (Weldable)',
        
        // Tool Steel Series
        'tool_steel_d2': 'Tool Steel D2 (High Carbon Chromium)',
        'tool_steel_a2': 'Tool Steel A2 (Air Hardening)',
        'tool_steel_o1': 'Tool Steel O1 (Oil Hardening)',
        
        // Titanium Series
        'titanium_gr2': 'Titanium Grade 2 (Commercial Pure)',
        'titanium_6al4v': 'Titanium Ti-6Al-4V (Aviation Grade)',
        
        // Brass & Copper Series
        'brass_360': 'Brass 360 (Free Machining)',
        'brass_c110': 'Copper C110 (Electrical)',
        'bronze_932': 'Bronze 932 (Bearing Alloy)',
        
        // Engineering Plastics
        'plastic_abs': 'Engineering Plastic ABS',
        'plastic_pom': 'Engineering Plastic POM (Acetal)',
        'plastic_nylon6': 'Engineering Plastic PA6 (Nylon 6)',
        'plastic_peek': 'Engineering Plastic PEEK (High Performance)',
        'plastic_pei': 'Engineering Plastic PEI (Amber)',
        
        other: 'Other Material (please specify below)'
      },
      customMaterialLabel: 'Please enter material name',
      customMaterialPlaceholder: 'e.g. Carbon Fiber, Ceramic, etc.',
      materialGroups: {
        aluminum: 'Aluminum Series',
        stainless: 'Stainless Steel Series',
        carbon_steel: 'Carbon Steel Series',
        tool_steel: 'Tool Steel Series',
        titanium: 'Titanium Series',
        copper_alloy: 'Copper Alloy Series',
        engineering_plastic: 'Engineering Plastics',
        other: 'Other'
      }
    }
  };

  const t = text[language];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleMaterialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaterial(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !formRef.current) {
      setMessage(language === 'zh' ? "错误：表单或用户会话尚未准备好。" : "Error: Form or user session is not ready.");
      setMessageType('error');
      return;
    }
    if (files.length === 0) {
      setMessage(t.fileRequired);
      setMessageType('error');
      return;
    }
    
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      // --- 第 1 步: 从表单一次性收集所有数据 ---
      const formData = new FormData(formRef.current);
      const contactName = formData.get('contact_name')?.toString();
      const companyName = formData.get('company_name')?.toString();
      const phoneNumber = formData.get('phone_number')?.toString();
      const materialSelect = formData.get('material')?.toString() || '';
      const customMaterial = formData.get('custom_material')?.toString() || '';
      const material = materialSelect === 'other' ? customMaterial : materialSelect;
      const quantity = Number(formData.get('quantity'));
      const notes = formData.get('notes')?.toString() || '';

      // --- 第 2 步: 更新 'profiles' 表中的个人联系信息 ---
      setMessage(language === 'zh' ? '正在更新联系人档案...' : 'Updating contact profile...');
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          contact_name: contactName,
          phone_number: phoneNumber,
          company_name: companyName
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // --- 第 3 步: 上传文件 ---
      setMessage(language === 'zh' ? '正在上传文件...' : 'Uploading files...');
      const file = files[0];
      const fileExtension = file.name.split('.').pop() || '';
      const safeFileName = `${Date.now()}_${crypto.randomUUID()}.${fileExtension}`;
      const filePath = `public/${user.id}/${safeFileName}`;
      
      const { error: uploadError } = await supabase
        .storage
        .from('cad-files')
        .upload(filePath, file);

      if (uploadError) throw new Error(language === 'zh' ? `文件上传失败: ${uploadError.message}` : `File upload failed: ${uploadError.message}`);

      // --- 第 4 步: 将报价单专属信息插入 'quotes' 表 ---
      setMessage(language === 'zh' ? '正在提交报价请求...' : 'Submitting quote request...');
      const { data: quoteData, error: insertError } = await supabase
        .from('quotes')
        .insert({
          user_id: user.id,
          material: material,
          quantity: quantity,
          customer_notes: notes,
          cad_file_path: filePath,
          status: 'new'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setMessage(language === 'zh' 
        ? `${t.successMessage} 报价ID: #${quoteData.id}`
        : `${t.successMessage} Quote ID: #${quoteData.id}`);
      setMessageType('success');
      
      // 延迟重置表单，让用户看到成功消息
      setTimeout(() => {
        formRef.current?.reset();
        setFiles([]);
        setSelectedMaterial('aluminum_6061');
      }, 3000);

    } catch (e: any) {
      setMessage(language === 'zh' ? `提交失败: ${e.message}` : `Submission failed: ${e.message}`);
      setMessageType('error');
      console.error('Submit failed:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 relative overflow-hidden">
      {/* AI Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gradient"></div>
      <h3 className="text-2xl font-semibold mb-8">
        <span className="text-brand-gradient">{t.title}</span>
      </h3>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        {/* 联系信息 */}
        <div className="border-b border-gray-100 pb-8 mb-8">
          <h4 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>{t.contactSection}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 联系人姓名 - 必填 */}
            <div>
              <label htmlFor="contactName" className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {t.contactNameLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactName"
                name="contact_name"
                placeholder={t.contactNamePlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              />
            </div>

            {/* 公司名称 - 可选 */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {t.companyNameLabel}
              </label>
              <input
                type="text"
                id="companyName"
                name="company_name"
                placeholder={t.companyNamePlaceholder}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              />
            </div>

            {/* 电话号码 - 可选 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {t.phoneLabel}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone_number"
                placeholder={t.phonePlaceholder}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* 产品规格 */}
        <div className="border-b border-gray-100 pb-8 mb-8">
          <h4 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>{t.productSection}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 材料选择 - 必填 */}
            <div>
              <label htmlFor="material" className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {t.materialLabel} <span className="text-red-500">*</span>
              </label>
              <select
                id="material"
                name="material"
                value={selectedMaterial}
                onChange={handleMaterialChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              >
                <optgroup label={t.materialGroups.aluminum}>
                  <option value="aluminum_6061">{t.materials.aluminum_6061}</option>
                  <option value="aluminum_7075">{t.materials.aluminum_7075}</option>
                  <option value="aluminum_2024">{t.materials.aluminum_2024}</option>
                  <option value="aluminum_5052">{t.materials.aluminum_5052}</option>
                  <option value="aluminum_6063">{t.materials.aluminum_6063}</option>
                </optgroup>
                
                <optgroup label={t.materialGroups.stainless}>
                  <option value="stainless_304">{t.materials.stainless_304}</option>
                  <option value="stainless_316">{t.materials.stainless_316}</option>
                  <option value="stainless_316L">{t.materials.stainless_316L}</option>
                  <option value="stainless_17_4PH">{t.materials.stainless_17_4PH}</option>
                </optgroup>
                
                <optgroup label={t.materialGroups.carbon_steel}>
                  <option value="steel_1018">{t.materials.steel_1018}</option>
                  <option value="steel_1045">{t.materials.steel_1045}</option>
                  <option value="steel_4140">{t.materials.steel_4140}</option>
                  <option value="steel_a36">{t.materials.steel_a36}</option>
                </optgroup>
                
                <optgroup label={t.materialGroups.tool_steel}>
                  <option value="tool_steel_d2">{t.materials.tool_steel_d2}</option>
                  <option value="tool_steel_a2">{t.materials.tool_steel_a2}</option>
                  <option value="tool_steel_o1">{t.materials.tool_steel_o1}</option>
                </optgroup>
                
                <optgroup label={t.materialGroups.titanium}>
                  <option value="titanium_gr2">{t.materials.titanium_gr2}</option>
                  <option value="titanium_6al4v">{t.materials.titanium_6al4v}</option>
                </optgroup>
                
                <optgroup label={t.materialGroups.copper_alloy}>
                  <option value="brass_360">{t.materials.brass_360}</option>
                  <option value="brass_c110">{t.materials.brass_c110}</option>
                  <option value="bronze_932">{t.materials.bronze_932}</option>
                </optgroup>
                
                <optgroup label={t.materialGroups.engineering_plastic}>
                  <option value="plastic_abs">{t.materials.plastic_abs}</option>
                  <option value="plastic_pom">{t.materials.plastic_pom}</option>
                  <option value="plastic_nylon6">{t.materials.plastic_nylon6}</option>
                  <option value="plastic_peek">{t.materials.plastic_peek}</option>
                  <option value="plastic_pei">{t.materials.plastic_pei}</option>
                </optgroup>
                
                <optgroup label={t.materialGroups.other}>
                  <option value="other">{t.materials.other}</option>
                </optgroup>
              </select>
            </div>

            {/* 自定义材料输入框 - 仅当选择"其他"时显示 */}
            {selectedMaterial === 'other' && (
              <div>
                <label htmlFor="customMaterial" className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                  {t.customMaterialLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customMaterial"
                  name="custom_material"
                  placeholder={t.customMaterialPlaceholder}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
                />
              </div>
            )}

            {/* 数量 - 必填 */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {t.quantityLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                placeholder={t.quantityPlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* 模型文件 */}
        <div className="border-b border-gray-100 pb-8 mb-8">
          <h4 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>{t.fileSection}</h4>
          
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {t.fileLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="cadFiles"
              multiple
              accept=".step,.stp,.stl,.iges,.igs,.dwg,.dxf,.obj,.ply,.3mf"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white file:transition-all file:duration-200 hover:file:shadow-md"
              style={{ 
                '--file-bg': 'var(--color-brand-purple)',
                '--file-hover-bg': '#6A00D6'
              } as any}
              onMouseEnter={(e) => {
                const fileButton = e.currentTarget.querySelector('input[type="file"]::-webkit-file-upload-button') as HTMLElement;
                if (fileButton) fileButton.style.backgroundColor = '#6A00D6';
              }}
              onMouseLeave={(e) => {
                const fileButton = e.currentTarget.querySelector('input[type="file"]::-webkit-file-upload-button') as HTMLElement;
                if (fileButton) fileButton.style.backgroundColor = 'var(--color-brand-purple)';
              }}
            />
            <p className="text-xs text-gray-500 mt-1">{t.fileHelp}</p>
            {files.length > 0 && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800 font-medium mb-1">
                  {language === 'zh' ? `已选择 ${files.length} 个文件:` : `${files.length} file(s) selected:`}
                </p>
                <ul className="text-xs text-green-700 space-y-1">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span>📄</span>
                      <span>{file.name}</span>
                      <span className="text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 特殊要求 */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            {t.notesLabel}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder={t.notesPlaceholder}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300 resize-none"
          />
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 text-white font-semibold rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] text-lg"
          style={{ backgroundColor: 'var(--color-brand-purple)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6A00D6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-brand-purple)'}
        >
          {loading ? t.submitting : t.submitButton}
        </button>

        {/* 消息显示 */}
        {message && (
          <div className={`p-4 rounded-md text-sm ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}