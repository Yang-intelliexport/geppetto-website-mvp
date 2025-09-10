import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useContext } from 'react';
import { s as supabase } from './supabase_2zlJawaa.mjs';

const AuthContext = createContext(void 0);
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session: session2 }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("获取会话失败:", error);
      } else {
        setSession(session2);
        setUser(session2?.user ?? null);
      }
      setLoading(false);
    };
    getInitialSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session2) => {
        console.log("🔄 认证状态变化:", event);
        setSession(session2);
        setUser(session2?.user ?? null);
        setLoading(false);
      }
    );
    return () => subscription.unsubscribe();
  }, []);
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("退出登录失败:", error);
      throw error;
    }
  };
  const value = {
    user,
    session,
    loading,
    signOut
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value, children });
};

const AuthGuard = ({
  children,
  redirectTo,
  fallback
}) => {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && !user && redirectTo !== false) {
      const currentPath = window.location.pathname;
      const loginUrl = redirectTo || `/login?redirect=${encodeURIComponent(currentPath)}`;
      window.location.href = loginUrl;
    }
  }, [user, loading, redirectTo]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-64", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full" }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "加载中..." })
    ] }) });
  }
  if (!user && fallback) {
    return /* @__PURE__ */ jsx(Fragment, { children: fallback });
  }
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
};

function OrderTracker({ language = "zh" }) {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const text = {
    zh: {
      title: "我的订单",
      noOrders: "暂无订单",
      createQuote: "立即创建报价请求",
      viewDetails: "查看详情",
      payNow: "立即支付",
      loggedInAs: "登录为",
      quantity: "数量",
      amount: "金额",
      created: "创建时间",
      pieces: "件"
    },
    en: {
      title: "My Orders",
      noOrders: "No orders yet",
      createQuote: "Create Quote Request",
      viewDetails: "View Details",
      payNow: "Pay Now",
      loggedInAs: "Logged in as",
      quantity: "Quantity",
      amount: "Amount",
      created: "Created",
      pieces: "pcs"
    }
  };
  const t = text[language];
  useEffect(() => {
    if (!user) return;
    const loadOrders = async () => {
      try {
        console.log("🔍 加载用户订单，user_id:", user.id);
        const { data: quotesData, error } = await supabase.from("quotes").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
        if (error) {
          console.error("❌ 查询订单失败:", error);
        } else {
          console.log("✅ 成功加载订单:", quotesData?.length || 0, "条");
          setQuotes(quotesData || []);
        }
      } catch (error) {
        console.error("❌ 加载订单异常:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [user]);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  const getStatusColor = (status) => {
    const colors = {
      "new": "bg-blue-100 text-blue-800",
      "pending": "bg-yellow-100 text-yellow-800",
      "processing": "bg-orange-100 text-orange-800",
      "quoted": "bg-purple-100 text-purple-800",
      "approved": "bg-green-100 text-green-800",
      "paid": "bg-green-100 text-green-800",
      "in_production": "bg-indigo-100 text-indigo-800",
      "completed": "bg-gray-100 text-gray-800",
      "cancelled": "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };
  const OrderRow = ({ quote, index }) => /* @__PURE__ */ jsxs("div", { className: "bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600", children: index + 1 }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900 truncate", children: quote.product_name || `${quote.material} ${language === "zh" ? "加工件" : "Part"}` }),
            /* @__PURE__ */ jsx("span", { className: `inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quote.status)}`, children: quote.status })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 font-mono mt-1", children: [
            "#",
            String(quote.id).slice(0, 8)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-8 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-xs", children: t.quantity }),
          /* @__PURE__ */ jsxs("div", { className: "font-medium", children: [
            quote.quantity,
            " ",
            t.pieces
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-xs", children: t.amount }),
          /* @__PURE__ */ jsx("div", { className: "font-medium text-green-600", children: quote.total_amount ? `$${quote.total_amount.toFixed(2)} ${(quote.currency || "USD").toUpperCase()}` : language === "zh" ? "待报价" : "Pending" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-xs", children: t.created }),
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: formatDate(quote.created_at) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              const currentUrl = new URL(window.location.href);
              currentUrl.searchParams.set("quote_id", String(quote.id));
              window.history.pushState(null, "", currentUrl.toString());
              window.location.reload();
            },
            className: "px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors",
            children: t.viewDetails
          }
        ),
        quote.status === "quoted" && quote.total_amount && /* @__PURE__ */ jsx(
          "a",
          {
            href: `/${language}/order/${quote.id}/payment`,
            className: "px-3 py-1.5 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors",
            children: t.payNow
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden px-6 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "text-gray-500 text-xs", children: [
          t.quantity,
          ":"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "font-medium", children: [
          quote.quantity,
          " ",
          t.pieces
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "text-gray-500 text-xs", children: [
          t.amount,
          ":"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "font-medium text-green-600", children: quote.total_amount ? `$${quote.total_amount.toFixed(2)}` : language === "zh" ? "待报价" : "Pending" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "text-gray-500 text-xs", children: [
          t.created,
          ":"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "font-medium", children: formatDate(quote.created_at) })
      ] })
    ] }) })
  ] });
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full" }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: language === "zh" ? "加载中..." : "Loading..." })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: t.title }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
        t.loggedInAs,
        ": ",
        user?.email
      ] })
    ] }),
    quotes.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-white rounded-lg border border-gray-200", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-gray-400 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0V3a2 2 0 112 0v2m-2 0a2 2 0 110 0" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg mb-4", children: t.noOrders }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `/${language}/create-quote`,
          className: "inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors",
          children: t.createQuote
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden md:block bg-gray-50 border-b border-gray-200 px-6 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs font-medium text-gray-500 uppercase tracking-wide", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8" }),
          " ",
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: language === "zh" ? "订单信息" : "Order Info" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-8", children: [
          /* @__PURE__ */ jsx("div", { className: "text-center", children: t.quantity }),
          /* @__PURE__ */ jsx("div", { className: "text-center", children: t.amount }),
          /* @__PURE__ */ jsx("div", { className: "text-center", children: t.created }),
          /* @__PURE__ */ jsx("div", { className: "w-24", children: language === "zh" ? "操作" : "Actions" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-200", children: quotes.map((quote, index) => /* @__PURE__ */ jsx(OrderRow, { quote, index }, quote.id)) })
    ] })
  ] }) });
}

function OrderDetail({ quoteId, language = "zh", onBack }) {
  const { user } = useAuth();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const text = {
    zh: {
      backToList: "返回订单列表",
      orderDetail: "订单详情",
      loading: "加载中...",
      notFound: "订单不存在或无权限访问",
      basicInfo: "基本信息",
      productName: "产品名称",
      material: "材料",
      quantity: "数量",
      pieces: "件",
      status: "状态",
      created: "创建时间",
      specialReq: "特殊要求",
      deliveryTime: "预计交期",
      days: "天",
      priceBreakdown: "报价明细",
      item: "项目",
      unitPrice: "单价",
      total: "小计",
      grandTotal: "总计",
      payNow: "立即支付",
      viewPaymentPage: "查看详细支付页面",
      materials: {
        "aluminum": "铝合金",
        "steel": "碳钢",
        "stainless_steel": "不锈钢",
        "brass": "黄铜",
        "titanium": "钛合金",
        "plastic": "塑料",
        "other": "其他"
      },
      statusMap: {
        "new": "新订单",
        "pending": "待处理",
        "processing": "处理中",
        "quoted": "已报价",
        "approved": "已确认",
        "in_production": "生产中",
        "completed": "已完成",
        "cancelled": "已取消"
      }
    },
    en: {
      backToList: "Back to Order List",
      orderDetail: "Order Detail",
      loading: "Loading...",
      notFound: "Order not found or access denied",
      basicInfo: "Basic Information",
      productName: "Product Name",
      material: "Material",
      quantity: "Quantity",
      pieces: "pcs",
      status: "Status",
      created: "Created",
      specialReq: "Special Requirements",
      deliveryTime: "Estimated Delivery",
      days: "days",
      priceBreakdown: "Price Breakdown",
      item: "Item",
      unitPrice: "Unit Price",
      total: "Total",
      grandTotal: "Grand Total",
      payNow: "Pay Now",
      viewPaymentPage: "View Payment Page",
      materials: {
        "aluminum": "Aluminum",
        "steel": "Carbon Steel",
        "stainless_steel": "Stainless Steel",
        "brass": "Brass",
        "titanium": "Titanium",
        "plastic": "Plastic",
        "other": "Other"
      },
      statusMap: {
        "new": "New",
        "pending": "Pending",
        "processing": "Processing",
        "quoted": "Quoted",
        "approved": "Approved",
        "in_production": "In Production",
        "completed": "Completed",
        "cancelled": "Cancelled"
      }
    }
  };
  const t = text[language];
  useEffect(() => {
    if (!user || !quoteId) return;
    const loadQuoteDetail = async () => {
      try {
        console.log("🔍 加载订单详情，quote_id:", quoteId);
        const { data: quoteData, error: error2 } = await supabase.from("quotes").select(`
            *,
            quote_breakdown_items (
              description,
              quantity,
              unit_price,
              total_price
            )
          `).eq("id", quoteId).eq("user_id", user.id).single();
        if (error2) {
          console.error("❌ 查询订单详情失败:", error2);
          setError(t.notFound);
        } else if (quoteData) {
          console.log("✅ 成功加载订单详情");
          setQuote(quoteData);
        } else {
          setError(t.notFound);
        }
      } catch (error2) {
        console.error("❌ 加载订单详情异常:", error2);
        setError(t.notFound);
      } finally {
        setLoading(false);
      }
    };
    loadQuoteDetail();
  }, [user, quoteId]);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const getStatusColor = (status) => {
    const colors = {
      "new": "bg-blue-100 text-blue-800",
      "pending": "bg-yellow-100 text-yellow-800",
      "processing": "bg-orange-100 text-orange-800",
      "quoted": "bg-purple-100 text-purple-800",
      "approved": "bg-green-100 text-green-800",
      "in_production": "bg-indigo-100 text-indigo-800",
      "completed": "bg-gray-100 text-gray-800",
      "cancelled": "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full" }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: t.loading })
    ] }) }) });
  }
  if (error || !quote) {
    return /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-gray-400 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.657-2.343" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg mb-4", children: error || t.notFound }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onBack,
          className: "inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700",
          children: t.backToList
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onBack,
          className: "inline-flex items-center text-purple-600 hover:text-purple-700 mb-4",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }),
            t.backToList
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: t.orderDetail }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600 font-mono", children: [
            "#",
            String(quote.id).slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`, children: t.statusMap[quote.status] || quote.status })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: t.basicInfo }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: t.productName }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-900", children: quote.product_name })
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
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: t.created }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-900", children: formatDate(quote.created_at) })
            ] }),
            quote.delivery_time_days && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: t.deliveryTime }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-gray-900", children: [
                quote.delivery_time_days,
                " ",
                t.days
              ] })
            ] })
          ] }),
          quote.special_requirements && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-500", children: t.specialReq }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-900", children: quote.special_requirements })
          ] })
        ] }),
        (quote.total_amount || quote.quote_breakdown_items?.length > 0) && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: t.priceBreakdown }),
          quote.quote_breakdown_items && quote.quote_breakdown_items.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
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
                  "¥",
                  item.unit_price.toFixed(2)
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "py-2 text-right font-semibold", children: [
                  "¥",
                  item.total_price.toFixed(2)
                ] })
              ] }, index)) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "border-t pt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-lg font-bold", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: t.grandTotal }),
              /* @__PURE__ */ jsxs("span", { className: "text-purple-600", children: [
                "¥",
                quote.total_amount?.toFixed(2) || "0.00"
              ] })
            ] }) })
          ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-4", children: /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-purple-600", children: [
            "¥",
            quote.total_amount?.toFixed(2) || "待报价"
          ] }) }),
          quote.status === "quoted" && quote.total_amount && /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-3", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: `/${language}/order/${quote.id}/payment`,
              className: "block w-full text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:from-purple-700 hover:to-blue-600 transition-colors",
              children: [
                t.payNow,
                " ¥",
                quote.total_amount.toFixed(2)
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: language === "zh" ? "联系信息" : "Contact Info" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: language === "zh" ? "联系人：" : "Contact: " }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: quote.contact_name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: language === "zh" ? "邮箱：" : "Email: " }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: quote.email })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-gray-200", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onBack,
            className: "w-full bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors",
            children: t.backToList
          }
        ) })
      ] }) })
    ] })
  ] });
}

function TrackOrderContent({ language = "zh" }) {
  const [quoteId, setQuoteId] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const quotIdParam = urlParams.get("quote_id");
    setQuoteId(quotIdParam);
  }, []);
  const handleBackToList = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("quote_id");
    window.history.pushState(null, "", currentUrl.toString());
    setQuoteId(null);
    window.location.reload();
  };
  if (quoteId) {
    return /* @__PURE__ */ jsx(
      OrderDetail,
      {
        quoteId,
        language,
        onBack: handleBackToList
      }
    );
  }
  return /* @__PURE__ */ jsx(OrderTracker, { language });
}
function AuthenticatedOrderTracker({ language = "zh" }) {
  return /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(AuthGuard, { children: /* @__PURE__ */ jsx(TrackOrderContent, { language }) }) });
}

export { AuthenticatedOrderTracker as A };
