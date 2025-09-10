import{s as t}from"./supabase.C0vo9XTQ.js";async function n(e){try{console.log("📋 获取用户报价列表:",e);const{data:o,error:r}=await t.from("quotes").select(`
        id,
        token,
        contact_name,
        product_name,
        material,
        quantity,
        status,
        total_price,
        created_at,
        delivery_time_days
      `).eq("email",e).order("created_at",{ascending:!1});if(r)throw console.error("❌ 获取报价列表失败:",r),new Error(`获取报价列表失败: ${r.message}`);return console.log("✅ 报价列表获取成功:",o),o}catch(o){throw console.error("❌ 获取报价列表错误:",o),o}}async function a(e,o){try{console.log("🔑 发送魔法链接:",e);const{error:r}=await t.auth.signInWithOtp({email:e,options:{emailRedirectTo:o}});if(r)throw console.error("❌ 发送魔法链接失败:",r),new Error(`发送登录链接失败: ${r.message}`);return console.log("✅ 魔法链接发送成功"),{success:!0}}catch(r){throw console.error("❌ 发送魔法链接错误:",r),r}}async function c(e){try{console.log("💳 创建支付会话 (V1.1):",e);const{data:o,error:r}=await t.functions.invoke("stripe-payment",{body:{quote_id:e}});if(r)throw console.error("❌ 创建支付会话失败:",r),new Error(`创建支付失败: ${r.message}`);return console.log("✅ 支付会话创建成功 (V1.1):",o),o}catch(o){throw console.error("❌ 创建支付会话错误:",o),o}}export{c,n as g,a as s};
