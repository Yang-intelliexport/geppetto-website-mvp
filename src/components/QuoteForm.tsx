import React, { useState, useRef } from 'react';
import { createClient } from '../lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { quoteFormTexts } from '../utils/i18n-components';

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
  const t = quoteFormTexts[language];

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
      setMessage(t.sessionNotReady);
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
      // 构建FormData发送到API端点
      const formData = new FormData(formRef.current);
      
      // 字段名映射 (表单字段名 -> API字段名)
      const contactName = formData.get('contact_name')?.toString();
      const companyName = formData.get('company_name')?.toString();
      const phoneNumber = formData.get('phone_number')?.toString();
      
      // 添加文件到FormData
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
      
      // 添加API需要的字段
      formData.append('email', user?.email ?? '');
      formData.append('language', language);
      if (contactName) formData.append('name', contactName);
      if (companyName) formData.append('company', companyName);
      if (phoneNumber) formData.append('phone', phoneNumber);

      console.debug('🚀 [QuoteForm] Submitting to API:', {
        fileCount: files.length,
        material: formData.get('material'),
        email: user.email,
        timestamp: new Date().toISOString()
      });

      // 调用API端点
      const response = await fetch('/api/functions/create-quote', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Submit failed');
      }

      setMessage(language === 'zh' 
        ? `${t.successMessage} 报价ID: #${result.data.id}`
        : `${t.successMessage} Quote ID: #${result.data.id}`);
      setMessageType('success');
      
      console.debug('✅ [QuoteForm] Submission successful:', {
        quoteId: result.data.id,
        token: result.data.token
      });
      
      // 延迟重置表单，让用户看到成功消息
      setTimeout(() => {
        formRef.current?.reset();
        setFiles([]);
        setSelectedMaterial('aluminum_6061');
      }, 3000);

    } catch (e: any) {
      setMessage(`${t.submitFailedPrefix}: ${e.message}`);
      setMessageType('error');
      console.error('❌ [QuoteForm] Submit failed:', e);
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
