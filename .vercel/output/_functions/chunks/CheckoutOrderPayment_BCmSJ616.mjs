import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from './supabase_2zlJawaa.mjs';
import { c as createPaymentSession } from './supabase_cGWeccMZ.mjs';

function CheckoutOrderPayment({ orderId, language = "zh" }) {
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const text = {
    zh: {
      title: "订单支付",
      loading: "加载中...",
      loginRequired: "请登录后进行支付",
      orderNotFound: "订单不存在或无权限访问",
      orderInfo: "订单信息",
      productName: "产品名称",
      material: "材料",
      quantity: "数量",
      pieces: "件",
      priceBreakdown: "价格明细",
      item: "项目",
      unitPrice: "单价",
      total: "小计",
      grandTotal: "总计",
      paymentSection: "支付信息",
      securePayment: "安全支付",
      paymentNote: "点击下方按钮将跳转到安全的 Stripe 支付页面",
      checkoutButton: "前往支付",
      processing: "跳转中...",
      paymentFailed: "支付跳转失败，请重试",
      materials: {
        "aluminum": "铝合金",
        "steel": "碳钢",
        "stainless_steel": "不锈钢",
        "brass": "黄铜",
        "titanium": "钛合金",
        "plastic": "塑料",
        "other": "其他"
      }
    },
    en: {
      title: "Order Payment",
      loading: "Loading...",
      loginRequired: "Please login to make payment",
      orderNotFound: "Order not found or access denied",
      orderInfo: "Order Information",
      productName: "Product Name",
      material: "Material",
      quantity: "Quantity",
      pieces: "pcs",
      priceBreakdown: "Price Breakdown",
      item: "Item",
      unitPrice: "Unit Price",
      total: "Total",
      grandTotal: "Grand Total",
      paymentSection: "Payment Information",
      securePayment: "Secure Payment",
      paymentNote: "Click the button below to proceed to secure Stripe payment page",
      checkoutButton: "Proceed to Payment",
      processing: "Redirecting...",
      paymentFailed: "Payment redirect failed, please try again",
      materials: {
        "aluminum": "Aluminum",
        "steel": "Carbon Steel",
        "stainless_steel": "Stainless Steel",
        "brass": "Brass",
        "titanium": "Titanium",
        "plastic": "Plastic",
        "other": "Other"
      }
    }
  };
  const t = text[language];
  useEffect(() => {
    const checkAuthAndLoadOrder = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session?.user) {
          setMessage(t.loginRequired);
          return;
        }
        setUser(session.user);
        const { data: quoteData, error: quoteError } = await supabase.from("quotes").select(`
            id,
            contact_name,
            email,
            product_name,
            material,
            quantity,
            total_amount,
            status,
            currency,
            created_at,
            quote_breakdown_items (
              description,
              quantity,
              unit_price,
              total_price
            )
          `).eq("id", orderId).eq("user_id", session.user.id).single();
        if (quoteError || !quoteData) {
          console.error("查询订单失败:", quoteError);
          setMessage(t.orderNotFound);
          return;
        }
        console.log("📊 数据库实际返回的数据:", {
          id: quoteData.id,
          product_name: quoteData.product_name,
          total_amount: quoteData.total_amount,
          status: quoteData.status,
          currency: quoteData.currency,
          created_at: quoteData.created_at,
          quantity: quoteData.quantity,
          material: quoteData.material,
          allFields: Object.keys(quoteData)
        });
        setQuote(quoteData);
      } catch (error) {
        console.error("加载订单失败:", error);
        setMessage(t.orderNotFound);
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndLoadOrder();
  }, [orderId, language]);
  const handleCheckout = async () => {
    if (!quote || paymentLoading) return;
    console.log("🛒 开始支付流程:", {
      quoteId: quote.id,
      totalAmount: quote.total_amount,
      email: quote.email
    });
    setPaymentLoading(true);
    setMessage("");
    try {
      console.log("🔄 创建支付会话，订单ID:", quote.id);
      const paymentData = await createPaymentSession(String(quote.id));
      console.log("📋 支付数据返回:", paymentData);
      if (paymentData && paymentData.url) {
        console.log("✅ 支付会话创建成功，跳转到:", paymentData.url);
        window.location.href = paymentData.url;
      } else {
        console.error("❌ 支付数据格式错误:", paymentData);
        throw new Error("未返回支付URL");
      }
    } catch (error) {
      console.error("❌ 创建支付会话失败:", {
        error: error.message,
        stack: error.stack,
        quoteId: quote.id
      });
      setMessage(error.message || t.paymentFailed);
    } finally {
      setPaymentLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full" }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: t.loading })
    ] }) }) });
  }
  if (message && !quote) {
    return /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-200 rounded-lg p-6", children: /* @__PURE__ */ jsx("p", { className: "text-red-800", children: message }) }) });
  }
  if (!quote) return null;
  return /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: t.title }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: t.orderInfo }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: t.productName }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-900", children: quote.product_name || "CNC Machined Part" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: t.material }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-900", children: t.materials[quote.material] || quote.material })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: t.quantity }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-gray-900", children: [
                quote.quantity,
                " ",
                t.pieces
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: "状态 / Status" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-900", children: /* @__PURE__ */ jsx("span", { className: `inline-flex px-2 py-1 text-xs font-medium rounded-full ${quote.status === "paid" ? "bg-green-100 text-green-800" : quote.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`, children: quote.status === "paid" ? "Paid" : quote.status }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: "总金额 / Amount" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-gray-900 text-lg font-semibold", children: [
                "$",
                quote.total_amount?.toFixed(2) || "0.00",
                " ",
                quote.currency?.toUpperCase() || "USD"
              ] })
            ] }),
            quote.created_at && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: "创建时间 / Created" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-900", children: new Date(quote.created_at).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ] })
          ] })
        ] }),
        quote.quote_breakdown_items && quote.quote_breakdown_items.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: t.priceBreakdown }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200", children: [
              /* @__PURE__ */ jsx("th", { className: "text-left py-2 font-semibold text-gray-900", children: t.item }),
              /* @__PURE__ */ jsx("th", { className: "text-center py-2 font-semibold text-gray-900", children: t.quantity }),
              /* @__PURE__ */ jsx("th", { className: "text-right py-2 font-semibold text-gray-900", children: t.unitPrice }),
              /* @__PURE__ */ jsx("th", { className: "text-right py-2 font-semibold text-gray-900", children: t.total })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: quote.quote_breakdown_items.map((item, index) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100", children: [
              /* @__PURE__ */ jsx("td", { className: "py-2", children: item.description }),
              /* @__PURE__ */ jsx("td", { className: "py-2 text-center", children: item.quantity }),
              /* @__PURE__ */ jsxs("td", { className: "py-2 text-right", children: [
                "$",
                item.unit_price.toFixed(2)
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "py-2 text-right font-semibold", children: [
                "$",
                item.total_price.toFixed(2)
              ] })
            ] }, index)) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "border-t pt-4 mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-lg font-bold", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: t.grandTotal }),
            /* @__PURE__ */ jsxs("span", { className: "text-purple-600", children: [
              "$",
              quote.total_amount?.toFixed(2) || "0.00"
            ] })
          ] }) })
        ] }),
        (!quote.quote_breakdown_items || quote.quote_breakdown_items.length === 0) && quote.total_amount && /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: t.priceBreakdown }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold text-purple-600", children: [
              "$",
              quote.total_amount.toFixed(2)
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: t.grandTotal })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: [
          "🔒 ",
          t.securePayment
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: language === "zh" ? "安全支付由" : "Secure payment powered by" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://js.stripe.com/v3/fingerprinted/img/stripe-logo-slate_small-3d0c0f37c.png",
                alt: "Stripe",
                className: "h-6 opacity-80"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: t.paymentNote }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleCheckout,
              disabled: paymentLoading || !quote.total_amount,
              className: "w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg",
              children: paymentLoading ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3" }),
                t.processing
              ] }) }) : `🔒 ${t.checkoutButton} $${quote.total_amount?.toFixed(2) || "0.00"}`
            }
          ),
          message && /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4", children: /* @__PURE__ */ jsx("p", { className: "text-red-800 text-sm", children: message }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 mb-2", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-green-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-green-800 font-medium", children: language === "zh" ? "安全保障" : "Secure Payment" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-green-700 text-sm space-y-1", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                "• ",
                language === "zh" ? "256位SSL加密" : "256-bit SSL encryption"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                "• ",
                language === "zh" ? "支持信用卡、PayPal" : "Credit cards & PayPal supported"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                "• ",
                language === "zh" ? "支付完成后立即开始生产" : "Production starts immediately after payment"
              ] })
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}

export { CheckoutOrderPayment as C };
