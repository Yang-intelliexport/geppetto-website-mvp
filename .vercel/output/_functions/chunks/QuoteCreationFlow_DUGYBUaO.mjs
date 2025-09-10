import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { s as supabase } from './supabase_2zlJawaa.mjs';
import { L as LoginForm } from './LoginForm_QxAa8lkj.mjs';
import { d as createAstro, c as createComponent, a as renderTemplate, ai as defineScriptVars, e as addAttribute, m as maybeRenderHead } from './astro/server_Np7zNMWM.mjs';
import 'kleur/colors';
import 'clsx';
import './create-quote.8e485f08_l0sNRNKZ.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://geppetto.studio");
const $$FileUploadSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FileUploadSection;
  const { language = "zh", required = true } = Astro2.props;
  const text = {
    zh: {
      label: "\u4E0A\u4F20CAD\u6587\u4EF6",
      placeholder: "\u70B9\u51FB\u4E0A\u4F20CAD\u6587\u4EF6 \u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904",
      supportedFormats: "\u652F\u6301: STEP, STL, IGES, DWG, DXF, OBJ, PLY, 3MF (\u6700\u592750MB)",
      selectFiles: "\u9009\u62E9\u6587\u4EF6",
      maxFiles: "\u6700\u591A\u53EF\u9009\u62E910\u4E2A\u6587\u4EF6",
      fileSelected: "\u4E2A\u6587\u4EF6\u5DF2\u9009\u62E9",
      removeFile: "\u79FB\u9664",
      fileTooLarge: "\u6587\u4EF6\u8FC7\u5927\uFF0C\u6700\u5927\u652F\u630150MB",
      invalidFormat: "\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u683C\u5F0F"
    },
    en: {
      label: "Upload CAD Files",
      placeholder: "Click or drag files here",
      supportedFormats: "Supported: STEP, STL, IGES, DWG, DXF, OBJ, PLY, 3MF (Max 50MB)",
      selectFiles: "Select Files",
      maxFiles: "Maximum 10 files allowed",
      fileSelected: "file(s) selected",
      removeFile: "Remove",
      fileTooLarge: "File too large, max 50MB supported",
      invalidFormat: "Unsupported file format"
    }
  };
  const t = text[language];
  return renderTemplate(_a || (_a = __template(["", '<div class="file-upload-section" data-astro-cid-qqn2spwz> <label class="block text-sm font-medium text-gray-700 mb-2" data-astro-cid-qqn2spwz> ', " ", ' </label> <!-- \u9690\u85CF\u7684\u6587\u4EF6\u8F93\u5165 --> <input type="file" id="file-input" name="files" multiple accept=".step,.stp,.stl,.iges,.igs,.dwg,.dxf,.obj,.ply,.3mf" style="display: none;"', ' data-astro-cid-qqn2spwz> <!-- \u53EF\u70B9\u51FB\u7684\u4E0A\u4F20\u533A\u57DF --> <label for="file-input" id="upload-zone" class="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer" data-astro-cid-qqn2spwz> <div id="upload-content" class="space-y-2" data-astro-cid-qqn2spwz> <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" data-astro-cid-qqn2spwz> <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-qqn2spwz></path> </svg> <div class="text-gray-600" data-astro-cid-qqn2spwz> <span class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" data-astro-cid-qqn2spwz> ', " </span> ", ' </div> <p class="text-xs text-gray-500" data-astro-cid-qqn2spwz>', '</p> <p class="text-xs text-gray-400" data-astro-cid-qqn2spwz>', '</p> </div> </label> <!-- File List Display --> <div id="file-list" class="mt-4 hidden" data-astro-cid-qqn2spwz> <h4 class="text-sm font-medium text-gray-700 mb-2" data-astro-cid-qqn2spwz> <span id="file-count" data-astro-cid-qqn2spwz>0</span> ', ' </h4> <div id="file-items" class="space-y-2 max-h-40 overflow-y-auto" data-astro-cid-qqn2spwz> <!-- Files will be populated by JavaScript --> </div> </div> <!-- Upload Messages --> <div id="file-upload-message" class="mt-2 hidden" data-astro-cid-qqn2spwz> <div id="file-success" class="text-green-600 text-sm hidden" data-astro-cid-qqn2spwz></div> <div id="file-error" class="text-red-600 text-sm hidden" data-astro-cid-qqn2spwz></div> </div> </div> <script>(function(){', `
class FileUploadHandler {
  constructor() {
    this.selectedFiles = [];
    this.maxSize = 50 * 1024 * 1024; // 50MB
    this.maxFiles = 10;
    this.allowedTypes = ['.step', '.stp', '.stl', '.iges', '.igs', '.dwg', '.dxf', '.obj', '.ply', '.3mf'];
    
    this.text = {
      zh: {
        fileSelected: '\u4E2A\u6587\u4EF6\u5DF2\u9009\u62E9',
        removeFile: '\u79FB\u9664',
        fileTooLarge: '\u6587\u4EF6\u8FC7\u5927\uFF0C\u6700\u5927\u652F\u630150MB',
        invalidFormat: '\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u683C\u5F0F',
        tooManyFiles: '\u6587\u4EF6\u6570\u91CF\u8FC7\u591A\uFF0C\u6700\u591A\u652F\u630110\u4E2A\u6587\u4EF6',
        uploadSuccess: '\u6587\u4EF6\u4E0A\u4F20\u6210\u529F'
      },
      en: {
        fileSelected: 'file(s) selected',
        removeFile: 'Remove',
        fileTooLarge: 'File too large, max 50MB supported',
        invalidFormat: 'Unsupported file format',
        tooManyFiles: 'Too many files, maximum 10 files allowed',
        uploadSuccess: 'Files uploaded successfully'
      }
    };
    
    this.t = this.text[language];
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    const fileInput = document.getElementById('file-input');
    const uploadZone = document.getElementById('upload-zone');
    
    console.log('\u{1F527} \u521D\u59CB\u5316\u6587\u4EF6\u4E0A\u4F20\u7EC4\u4EF6');
    
    if (!fileInput) {
      console.error('\u274C \u627E\u4E0D\u5230file-input\u5143\u7D20');
      return;
    }

    // File selection - \u8FD9\u662F\u4E3B\u8981\u7684\u4E8B\u4EF6\u5904\u7406
    fileInput.addEventListener('change', (e) => {
      console.log('\u{1F4C1} \u6587\u4EF6\u9009\u62E9\u6539\u53D8:', e.target.files.length, '\u4E2A\u6587\u4EF6');
      this.handleFiles(e.target.files);
    });

    // Drag & Drop (\u5982\u679C\u9700\u8981\u7684\u8BDD)
    if (uploadZone) {
      uploadZone.addEventListener('dragover', (e) => this.handleDragOver(e));
      uploadZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
      uploadZone.addEventListener('drop', (e) => this.handleDrop(e));
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('upload-zone').classList.add('border-indigo-500', 'bg-indigo-50');
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('upload-zone').classList.remove('border-indigo-500', 'bg-indigo-50');
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('upload-zone').classList.remove('border-indigo-500', 'bg-indigo-50');
    this.handleFiles(e.dataTransfer.files);
  }

  handleFiles(files) {
    const fileArray = Array.from(files);
    
    if (fileArray.length > this.maxFiles) {
      this.showError(this.t.tooManyFiles);
      return;
    }
    
    if (!this.validateFiles(fileArray)) {
      return;
    }

    this.selectedFiles = fileArray;
    this.displayFileList();
    this.showSuccess(\`\${this.t.uploadSuccess}: \${fileArray.length} \${this.t.fileSelected}\`);
  }

  validateFiles(files) {
    for (const file of files) {
      // Check file size
      if (file.size > this.maxSize) {
        this.showError(\`\${file.name}: \${this.t.fileTooLarge}\`);
        return false;
      }

      // Check file format
      const fileName = file.name.toLowerCase();
      const hasValidExtension = this.allowedTypes.some(ext => fileName.endsWith(ext));
      
      if (!hasValidExtension) {
        this.showError(\`\${file.name}: \${this.t.invalidFormat}\`);
        return false;
      }
    }
    return true;
  }

  displayFileList() {
    const fileList = document.getElementById('file-list');
    const fileItems = document.getElementById('file-items');
    const fileCount = document.getElementById('file-count');
    
    if (!fileList || !fileItems || !fileCount) return;

    if (this.selectedFiles.length === 0) {
      fileList.classList.add('hidden');
      return;
    }

    fileList.classList.remove('hidden');
    fileCount.textContent = this.selectedFiles.length;

    fileItems.innerHTML = this.selectedFiles.map((file, index) => \`
      <div class="flex items-center justify-between p-2 bg-gray-50 rounded border">
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v1.5h12V5a2 2 0 00-2-2H4z"></path>
            <path d="M2 8.5V15a2 2 0 002 2h8a2 2 0 002-2V8.5H2z"></path>
          </svg>
          <span class="text-sm text-gray-700">\${file.name}</span>
          <span class="text-xs text-gray-500">(\${this.formatFileSize(file.size)})</span>
        </div>
        <button 
          type="button" 
          onclick="fileUploadHandler.removeFile(\${index})"
          class="text-red-500 hover:text-red-700 text-sm"
        >
          \${this.t.removeFile}
        </button>
      </div>
    \`).join('');
  }

  removeFile(index) {
    this.selectedFiles.splice(index, 1);
    this.displayFileList();
    
    // Update the file input
    const fileInput = document.getElementById('file-input');
    if (fileInput && this.selectedFiles.length === 0) {
      fileInput.value = '';
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  showSuccess(message) {
    this.hideMessages();
    const successEl = document.getElementById('file-success');
    if (successEl) {
      successEl.textContent = message;
      successEl.classList.remove('hidden');
      document.getElementById('file-upload-message').classList.remove('hidden');
    }
  }

  showError(message) {
    this.hideMessages();
    const errorEl = document.getElementById('file-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
      document.getElementById('file-upload-message').classList.remove('hidden');
    }
  }

  hideMessages() {
    const successEl = document.getElementById('file-success');
    const errorEl = document.getElementById('file-error');
    if (successEl) successEl.classList.add('hidden');
    if (errorEl) errorEl.classList.add('hidden');
  }

  getFiles() {
    return this.selectedFiles;
  }
}

// \u521D\u59CB\u5316\u6587\u4EF6\u4E0A\u4F20\u5904\u7406\u5668
document.addEventListener('DOMContentLoaded', function() {
  if (window.fileUploadHandler) {
    console.log('\u2705 \u6587\u4EF6\u4E0A\u4F20\u5904\u7406\u5668\u5DF2\u5B58\u5728');
    return;
  }
  
  window.fileUploadHandler = new FileUploadHandler();
  console.log('\u2705 \u6587\u4EF6\u4E0A\u4F20\u5904\u7406\u5668\u521D\u59CB\u5316\u6210\u529F');
});
})();<\/script> `], ["", '<div class="file-upload-section" data-astro-cid-qqn2spwz> <label class="block text-sm font-medium text-gray-700 mb-2" data-astro-cid-qqn2spwz> ', " ", ' </label> <!-- \u9690\u85CF\u7684\u6587\u4EF6\u8F93\u5165 --> <input type="file" id="file-input" name="files" multiple accept=".step,.stp,.stl,.iges,.igs,.dwg,.dxf,.obj,.ply,.3mf" style="display: none;"', ' data-astro-cid-qqn2spwz> <!-- \u53EF\u70B9\u51FB\u7684\u4E0A\u4F20\u533A\u57DF --> <label for="file-input" id="upload-zone" class="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer" data-astro-cid-qqn2spwz> <div id="upload-content" class="space-y-2" data-astro-cid-qqn2spwz> <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" data-astro-cid-qqn2spwz> <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-qqn2spwz></path> </svg> <div class="text-gray-600" data-astro-cid-qqn2spwz> <span class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" data-astro-cid-qqn2spwz> ', " </span> ", ' </div> <p class="text-xs text-gray-500" data-astro-cid-qqn2spwz>', '</p> <p class="text-xs text-gray-400" data-astro-cid-qqn2spwz>', '</p> </div> </label> <!-- File List Display --> <div id="file-list" class="mt-4 hidden" data-astro-cid-qqn2spwz> <h4 class="text-sm font-medium text-gray-700 mb-2" data-astro-cid-qqn2spwz> <span id="file-count" data-astro-cid-qqn2spwz>0</span> ', ' </h4> <div id="file-items" class="space-y-2 max-h-40 overflow-y-auto" data-astro-cid-qqn2spwz> <!-- Files will be populated by JavaScript --> </div> </div> <!-- Upload Messages --> <div id="file-upload-message" class="mt-2 hidden" data-astro-cid-qqn2spwz> <div id="file-success" class="text-green-600 text-sm hidden" data-astro-cid-qqn2spwz></div> <div id="file-error" class="text-red-600 text-sm hidden" data-astro-cid-qqn2spwz></div> </div> </div> <script>(function(){', `
class FileUploadHandler {
  constructor() {
    this.selectedFiles = [];
    this.maxSize = 50 * 1024 * 1024; // 50MB
    this.maxFiles = 10;
    this.allowedTypes = ['.step', '.stp', '.stl', '.iges', '.igs', '.dwg', '.dxf', '.obj', '.ply', '.3mf'];
    
    this.text = {
      zh: {
        fileSelected: '\u4E2A\u6587\u4EF6\u5DF2\u9009\u62E9',
        removeFile: '\u79FB\u9664',
        fileTooLarge: '\u6587\u4EF6\u8FC7\u5927\uFF0C\u6700\u5927\u652F\u630150MB',
        invalidFormat: '\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u683C\u5F0F',
        tooManyFiles: '\u6587\u4EF6\u6570\u91CF\u8FC7\u591A\uFF0C\u6700\u591A\u652F\u630110\u4E2A\u6587\u4EF6',
        uploadSuccess: '\u6587\u4EF6\u4E0A\u4F20\u6210\u529F'
      },
      en: {
        fileSelected: 'file(s) selected',
        removeFile: 'Remove',
        fileTooLarge: 'File too large, max 50MB supported',
        invalidFormat: 'Unsupported file format',
        tooManyFiles: 'Too many files, maximum 10 files allowed',
        uploadSuccess: 'Files uploaded successfully'
      }
    };
    
    this.t = this.text[language];
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    const fileInput = document.getElementById('file-input');
    const uploadZone = document.getElementById('upload-zone');
    
    console.log('\u{1F527} \u521D\u59CB\u5316\u6587\u4EF6\u4E0A\u4F20\u7EC4\u4EF6');
    
    if (!fileInput) {
      console.error('\u274C \u627E\u4E0D\u5230file-input\u5143\u7D20');
      return;
    }

    // File selection - \u8FD9\u662F\u4E3B\u8981\u7684\u4E8B\u4EF6\u5904\u7406
    fileInput.addEventListener('change', (e) => {
      console.log('\u{1F4C1} \u6587\u4EF6\u9009\u62E9\u6539\u53D8:', e.target.files.length, '\u4E2A\u6587\u4EF6');
      this.handleFiles(e.target.files);
    });

    // Drag & Drop (\u5982\u679C\u9700\u8981\u7684\u8BDD)
    if (uploadZone) {
      uploadZone.addEventListener('dragover', (e) => this.handleDragOver(e));
      uploadZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
      uploadZone.addEventListener('drop', (e) => this.handleDrop(e));
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('upload-zone').classList.add('border-indigo-500', 'bg-indigo-50');
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('upload-zone').classList.remove('border-indigo-500', 'bg-indigo-50');
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('upload-zone').classList.remove('border-indigo-500', 'bg-indigo-50');
    this.handleFiles(e.dataTransfer.files);
  }

  handleFiles(files) {
    const fileArray = Array.from(files);
    
    if (fileArray.length > this.maxFiles) {
      this.showError(this.t.tooManyFiles);
      return;
    }
    
    if (!this.validateFiles(fileArray)) {
      return;
    }

    this.selectedFiles = fileArray;
    this.displayFileList();
    this.showSuccess(\\\`\\\${this.t.uploadSuccess}: \\\${fileArray.length} \\\${this.t.fileSelected}\\\`);
  }

  validateFiles(files) {
    for (const file of files) {
      // Check file size
      if (file.size > this.maxSize) {
        this.showError(\\\`\\\${file.name}: \\\${this.t.fileTooLarge}\\\`);
        return false;
      }

      // Check file format
      const fileName = file.name.toLowerCase();
      const hasValidExtension = this.allowedTypes.some(ext => fileName.endsWith(ext));
      
      if (!hasValidExtension) {
        this.showError(\\\`\\\${file.name}: \\\${this.t.invalidFormat}\\\`);
        return false;
      }
    }
    return true;
  }

  displayFileList() {
    const fileList = document.getElementById('file-list');
    const fileItems = document.getElementById('file-items');
    const fileCount = document.getElementById('file-count');
    
    if (!fileList || !fileItems || !fileCount) return;

    if (this.selectedFiles.length === 0) {
      fileList.classList.add('hidden');
      return;
    }

    fileList.classList.remove('hidden');
    fileCount.textContent = this.selectedFiles.length;

    fileItems.innerHTML = this.selectedFiles.map((file, index) => \\\`
      <div class="flex items-center justify-between p-2 bg-gray-50 rounded border">
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v1.5h12V5a2 2 0 00-2-2H4z"></path>
            <path d="M2 8.5V15a2 2 0 002 2h8a2 2 0 002-2V8.5H2z"></path>
          </svg>
          <span class="text-sm text-gray-700">\\\${file.name}</span>
          <span class="text-xs text-gray-500">(\\\${this.formatFileSize(file.size)})</span>
        </div>
        <button 
          type="button" 
          onclick="fileUploadHandler.removeFile(\\\${index})"
          class="text-red-500 hover:text-red-700 text-sm"
        >
          \\\${this.t.removeFile}
        </button>
      </div>
    \\\`).join('');
  }

  removeFile(index) {
    this.selectedFiles.splice(index, 1);
    this.displayFileList();
    
    // Update the file input
    const fileInput = document.getElementById('file-input');
    if (fileInput && this.selectedFiles.length === 0) {
      fileInput.value = '';
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  showSuccess(message) {
    this.hideMessages();
    const successEl = document.getElementById('file-success');
    if (successEl) {
      successEl.textContent = message;
      successEl.classList.remove('hidden');
      document.getElementById('file-upload-message').classList.remove('hidden');
    }
  }

  showError(message) {
    this.hideMessages();
    const errorEl = document.getElementById('file-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
      document.getElementById('file-upload-message').classList.remove('hidden');
    }
  }

  hideMessages() {
    const successEl = document.getElementById('file-success');
    const errorEl = document.getElementById('file-error');
    if (successEl) successEl.classList.add('hidden');
    if (errorEl) errorEl.classList.add('hidden');
  }

  getFiles() {
    return this.selectedFiles;
  }
}

// \u521D\u59CB\u5316\u6587\u4EF6\u4E0A\u4F20\u5904\u7406\u5668
document.addEventListener('DOMContentLoaded', function() {
  if (window.fileUploadHandler) {
    console.log('\u2705 \u6587\u4EF6\u4E0A\u4F20\u5904\u7406\u5668\u5DF2\u5B58\u5728');
    return;
  }
  
  window.fileUploadHandler = new FileUploadHandler();
  console.log('\u2705 \u6587\u4EF6\u4E0A\u4F20\u5904\u7406\u5668\u521D\u59CB\u5316\u6210\u529F');
});
})();<\/script> `])), maybeRenderHead(), t.label, required && renderTemplate`<span class="text-red-500 ml-1" data-astro-cid-qqn2spwz>*</span>`, addAttribute(required, "required"), t.selectFiles, language === "zh" ? "\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904" : "or drag files here", t.supportedFormats, t.maxFiles, t.fileSelected, defineScriptVars({ language }));
}, "/Users/intelliexport/Desktop/project/think/web/geppetto-website-mvp/src/components/quote/sections/FileUploadSection.astro", void 0);

function QuoteForm({ user, language = "zh" }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("aluminum_6061");
  const formRef = useRef(null);
  const text = {
    zh: {
      title: "提交报价请求",
      contactSection: "联系信息",
      emailLabel: "邮箱地址",
      emailPlaceholder: "your@email.com",
      contactNameLabel: "联系人姓名",
      contactNamePlaceholder: "请输入您的姓名",
      companyNameLabel: "公司名称",
      companyNamePlaceholder: "请输入公司名称 (可选)",
      phoneLabel: "电话号码",
      phonePlaceholder: "+86 138 0000 0000 (可选)",
      productSection: "产品规格",
      materialLabel: "材料",
      quantityLabel: "数量",
      quantityPlaceholder: "请输入数量",
      fileSection: "模型文件",
      fileLabel: "CAD文件上传",
      fileHelp: "支持格式: STEP, STL, IGES, DWG, DXF 等",
      notesLabel: "特殊要求 / 备注",
      notesPlaceholder: "请描述表面处理、公差要求、交期等特殊要求...",
      submitButton: "提交报价请求",
      submitting: "正在提交...",
      fileRequired: "请上传至少一个CAD文件",
      emailRequired: "请输入邮箱地址",
      contactNameRequired: "请输入联系人姓名",
      successMessage: "您的报价请求已成功提交！我们将在24小时内回复。",
      materials: {
        // 铝合金系列
        "aluminum_6061": "铝合金 6061-T6 (通用结构件)",
        "aluminum_7075": "铝合金 7075-T6 (高强度航空)",
        "aluminum_2024": "铝合金 2024-T3 (航空结构)",
        "aluminum_5052": "铝合金 5052-H32 (耐腐蚀)",
        "aluminum_6063": "铝合金 6063-T6 (挤压型材)",
        // 不锈钢系列
        "stainless_304": "不锈钢 304 (通用耐腐蚀)",
        "stainless_316": "不锈钢 316 (海洋级耐腐蚀)",
        "stainless_316L": "不锈钢 316L (低碳耐腐蚀)",
        "stainless_17_4PH": "不锈钢 17-4PH (析出硬化)",
        // 碳钢系列
        "steel_1018": "碳钢 1018 (低碳钢)",
        "steel_1045": "碳钢 1045 (中碳钢)",
        "steel_4140": "合金钢 4140 (高强度)",
        "steel_a36": "结构钢 A36 (焊接结构)",
        // 工具钢系列
        "tool_steel_d2": "工具钢 D2 (高碳高铬)",
        "tool_steel_a2": "工具钢 A2 (空气硬化)",
        "tool_steel_o1": "工具钢 O1 (油淬)",
        // 钛合金系列
        "titanium_gr2": "钛合金 Grade 2 (商业纯钛)",
        "titanium_6al4v": "钛合金 Ti-6Al-4V (航空级)",
        // 黄铜铜合金系列
        "brass_360": "黄铜 360 (易切削)",
        "brass_c110": "紫铜 C110 (导电)",
        "bronze_932": "青铜 932 (轴承合金)",
        // 工程塑料系列
        "plastic_abs": "工程塑料 ABS",
        "plastic_pom": "工程塑料 POM (聚甲醛)",
        "plastic_nylon6": "工程塑料 PA6 (尼龙6)",
        "plastic_peek": "工程塑料 PEEK (高性能)",
        "plastic_pei": "工程塑料 PEI (琥珀色)",
        other: "其他材料 (请在下方详细说明)"
      },
      customMaterialLabel: "请输入材料名称",
      customMaterialPlaceholder: "例如：碳纤维、陶瓷等",
      materialGroups: {
        aluminum: "铝合金系列",
        stainless: "不锈钢系列",
        carbon_steel: "碳钢系列",
        tool_steel: "工具钢系列",
        titanium: "钛合金系列",
        copper_alloy: "铜合金系列",
        engineering_plastic: "工程塑料",
        other: "其他"
      }
    },
    en: {
      title: "Submit Quote Request",
      contactSection: "Contact Information",
      emailLabel: "Email Address",
      emailPlaceholder: "your@email.com",
      contactNameLabel: "Contact Name",
      contactNamePlaceholder: "Enter your name",
      companyNameLabel: "Company Name",
      companyNamePlaceholder: "Enter company name (optional)",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+1 (555) 123-4567 (optional)",
      productSection: "Product Specifications",
      materialLabel: "Material",
      quantityLabel: "Quantity",
      quantityPlaceholder: "Enter quantity",
      fileSection: "Model File",
      fileLabel: "CAD File Upload",
      fileHelp: "Supported formats: STEP, STL, IGES, DWG, DXF, etc.",
      notesLabel: "Special Requirements / Notes",
      notesPlaceholder: "Please describe surface finish, tolerances, delivery requirements, etc...",
      submitButton: "Submit Quote Request",
      submitting: "Submitting...",
      fileRequired: "Please upload at least one CAD file",
      emailRequired: "Please enter email address",
      contactNameRequired: "Please enter contact name",
      successMessage: "Your quote request has been submitted successfully! We will respond within 24 hours.",
      materials: {
        // Aluminum Series
        "aluminum_6061": "Aluminum 6061-T6 (General Structural)",
        "aluminum_7075": "Aluminum 7075-T6 (High Strength Aviation)",
        "aluminum_2024": "Aluminum 2024-T3 (Aircraft Structure)",
        "aluminum_5052": "Aluminum 5052-H32 (Corrosion Resistant)",
        "aluminum_6063": "Aluminum 6063-T6 (Extrusion)",
        // Stainless Steel Series
        "stainless_304": "Stainless Steel 304 (General Corrosion Resistant)",
        "stainless_316": "Stainless Steel 316 (Marine Grade)",
        "stainless_316L": "Stainless Steel 316L (Low Carbon)",
        "stainless_17_4PH": "Stainless Steel 17-4PH (Precipitation Hardening)",
        // Carbon Steel Series
        "steel_1018": "Carbon Steel 1018 (Low Carbon)",
        "steel_1045": "Carbon Steel 1045 (Medium Carbon)",
        "steel_4140": "Alloy Steel 4140 (High Strength)",
        "steel_a36": "Structural Steel A36 (Weldable)",
        // Tool Steel Series
        "tool_steel_d2": "Tool Steel D2 (High Carbon Chromium)",
        "tool_steel_a2": "Tool Steel A2 (Air Hardening)",
        "tool_steel_o1": "Tool Steel O1 (Oil Hardening)",
        // Titanium Series
        "titanium_gr2": "Titanium Grade 2 (Commercial Pure)",
        "titanium_6al4v": "Titanium Ti-6Al-4V (Aviation Grade)",
        // Brass & Copper Series
        "brass_360": "Brass 360 (Free Machining)",
        "brass_c110": "Copper C110 (Electrical)",
        "bronze_932": "Bronze 932 (Bearing Alloy)",
        // Engineering Plastics
        "plastic_abs": "Engineering Plastic ABS",
        "plastic_pom": "Engineering Plastic POM (Acetal)",
        "plastic_nylon6": "Engineering Plastic PA6 (Nylon 6)",
        "plastic_peek": "Engineering Plastic PEEK (High Performance)",
        "plastic_pei": "Engineering Plastic PEI (Amber)",
        other: "Other Material (please specify below)"
      },
      customMaterialLabel: "Please enter material name",
      customMaterialPlaceholder: "e.g. Carbon Fiber, Ceramic, etc.",
      materialGroups: {
        aluminum: "Aluminum Series",
        stainless: "Stainless Steel Series",
        carbon_steel: "Carbon Steel Series",
        tool_steel: "Tool Steel Series",
        titanium: "Titanium Series",
        copper_alloy: "Copper Alloy Series",
        engineering_plastic: "Engineering Plastics",
        other: "Other"
      }
    }
  };
  const t = text[language];
  const handleFileChange = (event) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };
  const handleMaterialChange = (event) => {
    setSelectedMaterial(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user || !formRef.current) {
      setMessage(language === "zh" ? "错误：表单或用户会话尚未准备好。" : "Error: Form or user session is not ready.");
      setMessageType("error");
      return;
    }
    if (files.length === 0) {
      setMessage(t.fileRequired);
      setMessageType("error");
      return;
    }
    setLoading(true);
    setMessage("");
    setMessageType("");
    try {
      const formData = new FormData(formRef.current);
      const contactName = formData.get("contact_name")?.toString();
      const companyName = formData.get("company_name")?.toString();
      const phoneNumber = formData.get("phone_number")?.toString();
      const materialSelect = formData.get("material")?.toString() || "";
      const customMaterial = formData.get("custom_material")?.toString() || "";
      const material = materialSelect === "other" ? customMaterial : materialSelect;
      const quantity = Number(formData.get("quantity"));
      const notes = formData.get("notes")?.toString() || "";
      setMessage(language === "zh" ? "正在更新联系人档案..." : "Updating contact profile...");
      const { error: profileError } = await supabase.from("profiles").update({
        contact_name: contactName,
        phone_number: phoneNumber,
        company_name: companyName
      }).eq("id", user.id);
      if (profileError) throw profileError;
      setMessage(language === "zh" ? "正在上传文件..." : "Uploading files...");
      const file = files[0];
      const fileExtension = file.name.split(".").pop() || "";
      const safeFileName = `${Date.now()}_${crypto.randomUUID()}.${fileExtension}`;
      const filePath = `public/${user.id}/${safeFileName}`;
      const { error: uploadError } = await supabase.storage.from("cad-files").upload(filePath, file);
      if (uploadError) throw new Error(language === "zh" ? `文件上传失败: ${uploadError.message}` : `File upload failed: ${uploadError.message}`);
      setMessage(language === "zh" ? "正在提交报价请求..." : "Submitting quote request...");
      const { data: quoteData, error: insertError } = await supabase.from("quotes").insert({
        user_id: user.id,
        material,
        quantity,
        customer_notes: notes,
        cad_file_path: filePath,
        status: "new"
      }).select().single();
      if (insertError) throw insertError;
      setMessage(language === "zh" ? `${t.successMessage} 报价ID: #${quoteData.id}` : `${t.successMessage} Quote ID: #${quoteData.id}`);
      setMessageType("success");
      setTimeout(() => {
        formRef.current?.reset();
        setFiles([]);
        setSelectedMaterial("aluminum_6061");
      }, 3e3);
    } catch (e) {
      setMessage(language === "zh" ? `提交失败: ${e.message}` : `Submission failed: ${e.message}`);
      setMessageType("error");
      console.error("Submit failed:", e);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-xl p-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-brand-gradient" }),
    /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-8", children: /* @__PURE__ */ jsx("span", { className: "text-brand-gradient", children: t.title }) }),
    /* @__PURE__ */ jsxs("form", { ref: formRef, onSubmit: handleSubmit, className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 pb-8 mb-8", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold mb-6", style: { color: "var(--color-text-primary)" }, children: t.contactSection }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "contactName", className: "block text-sm font-semibold mb-3", style: { color: "var(--color-text-primary)" }, children: [
              t.contactNameLabel,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "contactName",
                name: "contact_name",
                placeholder: t.contactNamePlaceholder,
                required: true,
                className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "companyName", className: "block text-sm font-semibold mb-3", style: { color: "var(--color-text-primary)" }, children: t.companyNameLabel }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "companyName",
                name: "company_name",
                placeholder: t.companyNamePlaceholder,
                className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-sm font-semibold mb-3", style: { color: "var(--color-text-primary)" }, children: t.phoneLabel }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                id: "phone",
                name: "phone_number",
                placeholder: t.phonePlaceholder,
                className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 pb-8 mb-8", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold mb-6", style: { color: "var(--color-text-primary)" }, children: t.productSection }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "material", className: "block text-sm font-semibold mb-3", style: { color: "var(--color-text-primary)" }, children: [
              t.materialLabel,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "material",
                name: "material",
                value: selectedMaterial,
                onChange: handleMaterialChange,
                required: true,
                className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300",
                children: [
                  /* @__PURE__ */ jsxs("optgroup", { label: t.materialGroups.aluminum, children: [
                    /* @__PURE__ */ jsx("option", { value: "aluminum_6061", children: t.materials.aluminum_6061 }),
                    /* @__PURE__ */ jsx("option", { value: "aluminum_7075", children: t.materials.aluminum_7075 }),
                    /* @__PURE__ */ jsx("option", { value: "aluminum_2024", children: t.materials.aluminum_2024 }),
                    /* @__PURE__ */ jsx("option", { value: "aluminum_5052", children: t.materials.aluminum_5052 }),
                    /* @__PURE__ */ jsx("option", { value: "aluminum_6063", children: t.materials.aluminum_6063 })
                  ] }),
                  /* @__PURE__ */ jsxs("optgroup", { label: t.materialGroups.stainless, children: [
                    /* @__PURE__ */ jsx("option", { value: "stainless_304", children: t.materials.stainless_304 }),
                    /* @__PURE__ */ jsx("option", { value: "stainless_316", children: t.materials.stainless_316 }),
                    /* @__PURE__ */ jsx("option", { value: "stainless_316L", children: t.materials.stainless_316L }),
                    /* @__PURE__ */ jsx("option", { value: "stainless_17_4PH", children: t.materials.stainless_17_4PH })
                  ] }),
                  /* @__PURE__ */ jsxs("optgroup", { label: t.materialGroups.carbon_steel, children: [
                    /* @__PURE__ */ jsx("option", { value: "steel_1018", children: t.materials.steel_1018 }),
                    /* @__PURE__ */ jsx("option", { value: "steel_1045", children: t.materials.steel_1045 }),
                    /* @__PURE__ */ jsx("option", { value: "steel_4140", children: t.materials.steel_4140 }),
                    /* @__PURE__ */ jsx("option", { value: "steel_a36", children: t.materials.steel_a36 })
                  ] }),
                  /* @__PURE__ */ jsxs("optgroup", { label: t.materialGroups.tool_steel, children: [
                    /* @__PURE__ */ jsx("option", { value: "tool_steel_d2", children: t.materials.tool_steel_d2 }),
                    /* @__PURE__ */ jsx("option", { value: "tool_steel_a2", children: t.materials.tool_steel_a2 }),
                    /* @__PURE__ */ jsx("option", { value: "tool_steel_o1", children: t.materials.tool_steel_o1 })
                  ] }),
                  /* @__PURE__ */ jsxs("optgroup", { label: t.materialGroups.titanium, children: [
                    /* @__PURE__ */ jsx("option", { value: "titanium_gr2", children: t.materials.titanium_gr2 }),
                    /* @__PURE__ */ jsx("option", { value: "titanium_6al4v", children: t.materials.titanium_6al4v })
                  ] }),
                  /* @__PURE__ */ jsxs("optgroup", { label: t.materialGroups.copper_alloy, children: [
                    /* @__PURE__ */ jsx("option", { value: "brass_360", children: t.materials.brass_360 }),
                    /* @__PURE__ */ jsx("option", { value: "brass_c110", children: t.materials.brass_c110 }),
                    /* @__PURE__ */ jsx("option", { value: "bronze_932", children: t.materials.bronze_932 })
                  ] }),
                  /* @__PURE__ */ jsxs("optgroup", { label: t.materialGroups.engineering_plastic, children: [
                    /* @__PURE__ */ jsx("option", { value: "plastic_abs", children: t.materials.plastic_abs }),
                    /* @__PURE__ */ jsx("option", { value: "plastic_pom", children: t.materials.plastic_pom }),
                    /* @__PURE__ */ jsx("option", { value: "plastic_nylon6", children: t.materials.plastic_nylon6 }),
                    /* @__PURE__ */ jsx("option", { value: "plastic_peek", children: t.materials.plastic_peek }),
                    /* @__PURE__ */ jsx("option", { value: "plastic_pei", children: t.materials.plastic_pei })
                  ] }),
                  /* @__PURE__ */ jsx("optgroup", { label: t.materialGroups.other, children: /* @__PURE__ */ jsx("option", { value: "other", children: t.materials.other }) })
                ]
              }
            )
          ] }),
          selectedMaterial === "other" && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "customMaterial", className: "block text-sm font-semibold mb-3", style: { color: "var(--color-text-primary)" }, children: [
              t.customMaterialLabel,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "customMaterial",
                name: "custom_material",
                placeholder: t.customMaterialPlaceholder,
                required: true,
                className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "quantity", className: "block text-sm font-semibold mb-3", style: { color: "var(--color-text-primary)" }, children: [
              t.quantityLabel,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                id: "quantity",
                name: "quantity",
                min: "1",
                defaultValue: "1",
                placeholder: t.quantityPlaceholder,
                required: true,
                className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 pb-8 mb-8", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold mb-6", style: { color: "var(--color-text-primary)" }, children: t.fileSection }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold mb-3", style: { color: "var(--color-text-primary)" }, children: [
            t.fileLabel,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              name: "cadFiles",
              multiple: true,
              accept: ".step,.stp,.stl,.iges,.igs,.dwg,.dxf,.obj,.ply,.3mf",
              onChange: handleFileChange,
              required: true,
              className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white file:transition-all file:duration-200 hover:file:shadow-md",
              style: {
                "--file-bg": "var(--color-brand-purple)",
                "--file-hover-bg": "#6A00D6"
              },
              onMouseEnter: (e) => {
                const fileButton = e.currentTarget.querySelector('input[type="file"]::-webkit-file-upload-button');
                if (fileButton) fileButton.style.backgroundColor = "#6A00D6";
              },
              onMouseLeave: (e) => {
                const fileButton = e.currentTarget.querySelector('input[type="file"]::-webkit-file-upload-button');
                if (fileButton) fileButton.style.backgroundColor = "var(--color-brand-purple)";
              }
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: t.fileHelp }),
          files.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3 p-3 bg-green-50 border border-green-200 rounded-md", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-green-800 font-medium mb-1", children: language === "zh" ? `已选择 ${files.length} 个文件:` : `${files.length} file(s) selected:` }),
            /* @__PURE__ */ jsx("ul", { className: "text-xs text-green-700 space-y-1", children: files.map((file, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx("span", { children: "📄" }),
              /* @__PURE__ */ jsx("span", { children: file.name }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                "(",
                (file.size / 1024 / 1024).toFixed(2),
                " MB)"
              ] })
            ] }, index)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "notes", className: "block text-sm font-semibold mb-3", style: { color: "var(--color-text-primary)" }, children: t.notesLabel }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "notes",
            name: "notes",
            rows: 4,
            placeholder: t.notesPlaceholder,
            className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-300 resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full px-6 py-4 text-white font-semibold rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] text-lg",
          style: { backgroundColor: "var(--color-brand-purple)" },
          onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "#6A00D6",
          onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "var(--color-brand-purple)",
          children: loading ? t.submitting : t.submitButton
        }
      ),
      message && /* @__PURE__ */ jsx("div", { className: `p-4 rounded-md text-sm ${messageType === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`, children: message })
    ] })
  ] });
}

function QuoteCreationFlow({ language = "zh" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const text = {
    zh: {
      loading: "正在加载...",
      step1Title: "第一步：验证您的邮箱",
      step1Desc: "请输入您的邮箱以接收一个安全的登录/注册链接。",
      step2Title: "第二步：提交您的报价详情",
      welcomeBack: "欢迎回来！您已登录，邮箱为: ",
      logout: "退出登录"
    },
    en: {
      loading: "Loading...",
      step1Title: "Step 1: Verify Your Email",
      step1Desc: "Please enter your email to receive a secure login/registration link.",
      step2Title: "Step 2: Submit Your Quote Details",
      welcomeBack: "Welcome back! You are logged in as: ",
      logout: "Sign Out"
    }
  };
  const t = text[language];
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("🔍 开始检查用户会话状态...");
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("❌ 获取会话失败:", error);
          setUser(null);
        } else if (session?.user) {
          console.log("✅ 用户已登录:", {
            userId: session.user.id,
            userEmail: session.user.email,
            hasValidSession: true
          });
          setUser(session.user);
        } else {
          console.log("❌ 没有有效的用户会话");
          setUser(null);
        }
      } catch (error) {
        console.error("❌ 检查会话异常:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 认证状态变化详情:", {
        event,
        hasSession: !!session,
        userEmail: session?.user?.email,
        userId: session?.user?.id,
        sessionObject: session
      });
      if (event === "SIGNED_IN" && session?.user) {
        console.log("✅ 用户登录成功:", session.user.email);
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        console.log("👋 用户登出");
        setUser(null);
      } else if (session?.user) {
        console.log("🔄 更新用户状态:", session.user.email);
        setUser(session.user);
      } else {
        console.log("❌ 清空用户状态, event:", event);
        setUser(null);
      }
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("登出失败:", error);
      }
    } catch (error) {
      console.error("登出异常:", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-64", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5 text-indigo-600", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "m12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6v-4z" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: t.loading })
    ] }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: t.step1Title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: t.step1Desc })
      ] }),
      /* @__PURE__ */ jsx(LoginForm, { language })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: t.step2Title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-4 text-sm text-gray-600", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          t.welcomeBack,
          user.email
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSignOut,
            className: "text-indigo-600 hover:text-indigo-800 underline",
            children: t.logout
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(QuoteForm, { user, language })
  ] });
}

export { QuoteCreationFlow as Q };
