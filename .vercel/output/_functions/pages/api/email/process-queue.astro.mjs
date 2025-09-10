import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../../renderers.mjs';

const RESEND_API_KEY = "<YOUR_RESEND_API_KEY>";
const SUPABASE_URL = "https://phwzmhsotoajyoiqrwvn.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBod3ptaHNvdG9hanlvaXFyd3ZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzE2ODgzMCwiZXhwIjoyMDcyNzQ0ODMwfQ.n3o4mfzK_8iqZkbVkpe0C41CBTnBMZB4cJCIDMLXn5k";
function renderTemplate(template, data) {
  let rendered = template;
  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    rendered = rendered.replace(regex, data[key] || "");
  });
  rendered = rendered.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, variable, content) => {
    return data[variable] ? content : "";
  });
  return rendered;
}
async function sendEmailWithResend(to, subject, html, fromName = "Geppetto Team") {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `${fromName} <noreply@geppetto.studio>`,
      // 需要验证的域名
      to: [to],
      subject,
      html
    })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }
  return await response.json();
}
async function sendEmailWithSMTP(to, subject, html) {
  console.log("SMTP sending not implemented yet");
  throw new Error("SMTP sending not configured");
}
const POST = async ({ request }) => {
  try {
    const authHeader = request.headers.get("authorization");
    const apiToken = "<YOUR_API_SECRET_TOKEN>";
    const isDev = false;
    if (!isDev && (!authHeader || !authHeader.includes("Bearer"))) {
      return new Response(JSON.stringify({
        error: "Unauthorized",
        message: "API认证失败，请检查Authorization header"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!isDev && apiToken && !authHeader?.includes(apiToken)) {
      return new Response(JSON.stringify({
        error: "Invalid token",
        message: "API Token无效"
      }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }
    const debugMode = false;
    if (debugMode) ;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) ;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: emailQueue, error: fetchError } = await supabase.from("email_queue").select(`
        *,
        email_templates!inner(subject_template, body_template)
      `).eq("status", "pending").lte("send_at", (/* @__PURE__ */ new Date()).toISOString()).lt("attempts", 3).order("created_at", { ascending: true }).limit(10);
    if (fetchError) {
      throw new Error(`Database error: ${fetchError.message}`);
    }
    const results = {
      processed: 0,
      failed: 0,
      errors: []
    };
    for (const email of emailQueue || []) {
      try {
        const subject = renderTemplate(email.email_templates.subject_template, email.template_data);
        const body = renderTemplate(email.email_templates.body_template, email.template_data);
        const htmlBody = body.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>").replace(/^/, "<p>").replace(/$/, "</p>");
        let sendResult;
        if (RESEND_API_KEY) {
          sendResult = await sendEmailWithResend(
            email.recipient_email,
            subject,
            htmlBody
          );
        }
        const { error: updateError } = await supabase.from("email_queue").update({
          status: "sent",
          sent_at: (/* @__PURE__ */ new Date()).toISOString(),
          attempts: email.attempts + 1,
          error_message: null
        }).eq("id", email.id);
        if (updateError) {
          throw new Error(`Update error: ${updateError.message}`);
        }
        results.processed++;
        console.log(`Email sent successfully to ${email.recipient_email}, ID: ${sendResult.id}`);
      } catch (error) {
        const attempts = email.attempts + 1;
        const status = attempts >= email.max_attempts ? "failed" : "retry";
        const { error: updateError } = await supabase.from("email_queue").update({
          status,
          attempts,
          error_message: error instanceof Error ? error.message : "Unknown error"
        }).eq("id", email.id);
        if (updateError) {
          console.error("Failed to update error status:", updateError);
        }
        results.failed++;
        results.errors.push(`${email.recipient_email}: ${error instanceof Error ? error.message : "Unknown error"}`);
        console.error(`Failed to send email to ${email.recipient_email}:`, error);
      }
    }
    const { data: queueStatus } = await supabase.from("email_queue").select("status").eq("status", "pending");
    const pendingCount = queueStatus?.length || 0;
    return new Response(JSON.stringify({
      success: true,
      results: {
        ...results,
        pending: pendingCount,
        total_processed: emailQueue?.length || 0
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Email processing error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const GET = async () => {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) ;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: statusData } = await supabase.from("email_queue_status").select("*");
    return new Response(JSON.stringify({
      success: true,
      queue_status: statusData || []
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
