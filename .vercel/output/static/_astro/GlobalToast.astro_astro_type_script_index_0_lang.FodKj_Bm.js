import{t as i,r as c}from"./modalStore.zIR6UEMD.js";const n=document.getElementById("toast-container"),r={success:{bgClass:"bg-white border-green-500",iconColor:"text-green-500",icon:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>`},error:{bgClass:"bg-white border-red-500",iconColor:"text-red-500",icon:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`},warning:{bgClass:"bg-white border-yellow-500",iconColor:"text-yellow-500",icon:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>`},info:{bgClass:"bg-white border-blue-500",iconColor:"text-blue-500",icon:`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>`}};i.subscribe(t=>{d(t)});function d(t){const o=Array.from(n.children).map(e=>e.dataset.toastId),l=t.map(e=>e.id);o.forEach(e=>{l.includes(e)||u(e)}),t.forEach(e=>{o.includes(e.id)||v(e)})}function v(t){const{id:o,message:l,type:e}=t,a=r[e]||r.info,s=document.createElement("div");s.dataset.toastId=o,s.className=`toast-item max-w-sm w-full ${a.bgClass} rounded-lg shadow-lg border-2 p-4`,s.innerHTML=`
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <div class="${a.iconColor}">
            ${a.icon}
          </div>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">${l}</p>
        </div>
        <div class="ml-4 flex-shrink-0">
          <button class="close-btn text-gray-400 hover:text-gray-600 focus:outline-none">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    `,s.querySelector(".close-btn").addEventListener("click",()=>{c(o)}),n.appendChild(s)}function u(t){const o=n.querySelector(`[data-toast-id="${t}"]`);o&&(o.classList.add("removing"),setTimeout(()=>{o.parentNode&&o.remove()},300))}
