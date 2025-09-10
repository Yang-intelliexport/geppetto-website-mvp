import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from './supabase_2zlJawaa.mjs';

function LoginForm({ redirectUrl = "/", currentLang = "zh" }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [email, setEmail] = useState("");
  const texts = {
    zh: {
      emailLabel: "邮箱地址",
      emailPlaceholder: "your.email@company.com",
      sendButton: "发送登录链接",
      sending: "发送中...",
      emailRequired: "请输入邮箱地址",
      successMessage: "登录链接已发送到您的邮箱！请检查您的邮件（包括垃圾邮件文件夹）。",
      errorMessage: "发送失败，请稍后重试",
      securityNote: "我们使用安全的无密码登录方式",
      instruction: "点击邮件中的链接即可安全登录"
    },
    en: {
      emailLabel: "Email Address",
      emailPlaceholder: "your.email@company.com",
      sendButton: "Send Login Link",
      sending: "Sending...",
      emailRequired: "Please enter your email address",
      successMessage: "Login link sent to your email! Please check your inbox (including spam folder).",
      errorMessage: "Failed to send. Please try again later.",
      securityNote: "We use secure passwordless authentication",
      instruction: "Click the link in the email to log in securely"
    }
  };
  const t = texts[currentLang];
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        window.location.href = redirectUrl;
      }
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        window.location.href = redirectUrl;
      }
    });
    return () => subscription.unsubscribe();
  }, [redirectUrl]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setMessage(t.emailRequired);
      setMessageType("error");
      return;
    }
    setLoading(true);
    setMessage("");
    setMessageType("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}${redirectUrl}`
          // 重定向到目标页面
        }
      });
      if (error) {
        throw error;
      }
      setMessage(t.successMessage);
      setMessageType("success");
    } catch (error) {
      console.error("发送魔法链接失败:", error);
      setMessage(error.message || t.errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto bg-white p-6 rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-2", children: t.emailLabel }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            placeholder: t.emailPlaceholder
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
          children: loading ? t.sending : t.sendButton
        }
      ),
      message && /* @__PURE__ */ jsx("div", { className: `p-4 rounded-md text-sm ${messageType === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`, children: message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 text-xs text-gray-500 text-center", children: [
      /* @__PURE__ */ jsx("p", { children: t.securityNote }),
      /* @__PURE__ */ jsx("p", { children: t.instruction })
    ] })
  ] });
}

export { LoginForm as L };
