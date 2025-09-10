import { a as supabaseAdmin } from '../../../chunks/supabase_2zlJawaa.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const signature = request.headers.get("resend-signature");
    const payload = await request.json();
    console.log("收到Resend webhook:", payload);
    if (payload.type === "email.delivered") {
      console.log(`邮件 ${payload.data.email_id} 已送达到 ${payload.data.to[0]}`);
      return new Response("OK");
    }
    if (payload.type === "email.bounced") {
      console.log(`邮件 ${payload.data.email_id} 退信: ${payload.data.bounce_type}`);
      return new Response("OK");
    }
    if (payload.type === "email.replied") {
      await handleEmailReply(payload.data);
    }
    return new Response("OK");
  } catch (error) {
    console.error("处理Resend webhook错误:", error);
    return new Response("Error", { status: 500 });
  }
};
async function handleEmailReply(data) {
  try {
    const { data: result, error } = await supabaseAdmin.rpc("handle_email_reply", {
      p_from_email: data.from,
      p_subject: data.subject,
      p_content: data.text || data.html || "用户回复了邮件",
      p_message_id: data.email_id,
      p_in_reply_to: data.in_reply_to
    });
    if (error) {
      throw error;
    }
    console.log(`邮件回复已处理: ${data.from} -> conversation_id: ${result}`);
    await notifyTeamAboutReply(data);
  } catch (error) {
    console.error("处理邮件回复失败:", error);
    throw error;
  }
}
async function notifyTeamAboutReply(data) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${"<YOUR_RESEND_API_KEY>"}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Geppetto系统 <system@geppetto.studio>",
        to: ["business@geppetto.studio"],
        subject: `客户回复: ${data.subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #059669;">收到客户邮件回复</h2>
            
            <div style="background: #f0fdf4; border: 1px solid #16a34a; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>发件人:</strong> ${data.from}</p>
              <p><strong>主题:</strong> ${data.subject}</p>
              <p><strong>时间:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("zh-CN")}</p>
            </div>
            
            <div style="background: #fafafa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>邮件内容:</h3>
              <p style="white-space: pre-wrap;">${data.text || "查看HTML内容"}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://geppetto.studio/admin/create-quotes" 
                 style="display: inline-block; background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                查看并回复客户 →
              </a>
            </div>
          </div>
        `
      })
    });
    if (response.ok) {
      console.log("团队通知邮件发送成功");
    }
  } catch (error) {
    console.error("发送团队通知邮件失败:", error);
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
