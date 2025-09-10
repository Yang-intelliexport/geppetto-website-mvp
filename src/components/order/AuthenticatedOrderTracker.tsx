import React, { useState, useEffect } from 'react';
import AuthGuard from '../auth/AuthGuard';
import OrderTracker from './OrderTracker';
import OrderDetail from './OrderDetail';

interface AuthenticatedOrderTrackerProps {
  language?: 'zh' | 'en';
}

function TrackOrderContent({ language = 'zh' }: AuthenticatedOrderTrackerProps) {
  const [quoteId, setQuoteId] = useState<string | null>(null);

  useEffect(() => {
    // 从URL参数中获取quote_id
    const urlParams = new URLSearchParams(window.location.search);
    const quotIdParam = urlParams.get('quote_id');
    setQuoteId(quotIdParam);
  }, []);

  const handleBackToList = () => {
    // 清除URL参数并刷新页面
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('quote_id');
    window.history.pushState(null, '', currentUrl.toString());
    setQuoteId(null);
    window.location.reload();
  };

  if (quoteId) {
    return (
      <OrderDetail
        quoteId={quoteId}
        language={language}
        onBack={handleBackToList}
      />
    );
  }

  return <OrderTracker language={language} />;
}

export default function AuthenticatedOrderTracker({ language = 'zh' }: AuthenticatedOrderTrackerProps) {
  return (
    <AuthGuard>
      <TrackOrderContent language={language} />
    </AuthGuard>
  );
}