// ApiDataProcessor - 前端中间件处理增强API数据
export interface EnhancedApiResponse {
  success: boolean;
  data: {
    operation: {
      type: 'quote_update' | 'message_reply' | 'order_update';
      quoteId: string;
      expertId: string;
      updatedAt: string;
      changes: Record<string, any>;
    };
    quote: {
      id: string;
      status: string;
      statusLabel: string;
      total: number;
      currency: string;
      material: string;
      materialLabel: string;
      quantity: number;
      notes: string;
      estimatedDeliveryDays: number;
      createdAt: string;
      updatedAt: string;
      progress: {
        percentage: number;
        category: string;
        nextStep: string;
        estimatedNext: string;
      };
    };
    customer: {
      email: string;
      name?: string;
      company?: string;
      totalOrders?: number;
      registrationDate?: string;
    };
    expert: {
      id: string;
      name: string;
      role: string;
    };
    context: {
      recentMessages: Array<{
        id: string;
        senderType: string;
        senderName: string;
        content: string;
        createdAt: string;
      }>;
      relatedOrders: Array<{
        id: string;
        shortId: string;
        status: string;
        total: number;
      }>;
      suggestedActions: Array<{
        action: string;
        label: string;
        priority: 'high' | 'medium' | 'low';
      }>;
    };
    ui: {
      canEdit: boolean;
      canMessage: boolean;
      canUpdateOrder: boolean;
      statusColor: string;
      urgencyLevel: 'low' | 'medium' | 'high';
    };
  };
  meta: {
    processedAt: string;
    apiVersion: string;
    dataVersion: string;
  };
}

export class ApiDataProcessor {
  /**
   * 处理专家报价更新的增强数据
   */
  processQuoteUpdateResponse(
    response: EnhancedApiResponse,
    displayMode: 'dashboard' | 'detail' | 'mobile' | 'admin' = 'admin'
  ) {
    const { data } = response;
    
    switch (displayMode) {
      case 'dashboard':
        return this.processDashboardData(data);
      case 'detail':
        return this.processDetailData(data);
      case 'mobile':
        return this.processMobileData(data);
      case 'admin':
        return this.processAdminData(data);
      default:
        return this.processDefaultData(data);
    }
  }
  
  /**
   * 管理后台数据处理 - 完整功能
   */
  private processAdminData(data: any) {
    return {
      // 核心报价信息
      quote: {
        id: data.quote.id,
        status: data.quote.status,
        statusLabel: data.quote.statusLabel,
        statusColor: data.ui.statusColor,
        total: data.quote.total,
        formattedTotal: this.formatCurrency(data.quote.total, data.quote.currency),
        currency: data.quote.currency,
        material: data.quote.material,
        materialLabel: data.quote.materialLabel,
        quantity: data.quote.quantity,
        notes: data.quote.notes,
        estimatedDeliveryDays: data.quote.estimatedDeliveryDays,
        estimatedCompletion: this.calculateCompletionDate(data.quote.estimatedDeliveryDays),
        createdAt: data.quote.createdAt,
        updatedAt: data.quote.updatedAt,
        formattedCreatedAt: this.formatDateTime(data.quote.createdAt),
        formattedUpdatedAt: this.formatDateTime(data.quote.updatedAt),
        progress: {
          ...data.quote.progress,
          progressColor: this.getProgressColor(data.quote.progress.percentage)
        },
        // 添加Transparent Breakdown Pricing处理
        transparentBreakdown: data.quote.transparentBreakdown ? {
          ...data.quote.transparentBreakdown,
          formattedBreakdown: this.formatTransparentBreakdown(data.quote.transparentBreakdown)
        } : null
      },
      
      // 客户信息
      customer: {
        ...data.customer,
        displayName: data.customer.company || data.customer.name || data.customer.email,
        registrationDuration: data.customer.registrationDate ? 
          this.formatDuration(data.customer.registrationDate) : null,
        totalOrders: data.customer.totalOrders || 0
      },
      
      // 专家信息和权限
      expert: {
        ...data.expert,
        permissions: {
          canEdit: data.ui.canEdit,
          canMessage: data.ui.canMessage,
          canUpdateOrder: data.ui.canUpdateOrder
        }
      },
      
      // 操作历史和上下文
      context: {
        operation: {
          ...data.operation,
          formattedDate: this.formatDateTime(data.operation.updatedAt)
        },
        messages: data.context.recentMessages.map(m => ({
          ...m,
          formattedDate: this.formatRelativeTime(m.createdAt),
          isFromCustomer: m.senderType === 'customer',
          isFromExpert: m.senderType === 'expert'
        })),
        orders: data.context.relatedOrders.map(o => ({
          ...o,
          formattedTotal: this.formatCurrency(o.total, data.quote.currency),
          statusBadge: this.getStatusBadge(o.status)
        })),
        actions: this.prioritizeActions(data.context.suggestedActions),
        timeline: this.buildAdminTimeline(data)
      },
      
      // UI控制数据
      ui: {
        ...data.ui,
        urgencyBadge: this.getUrgencyBadge(data.ui.urgencyLevel),
        statusBadge: this.getStatusBadge(data.quote.status),
        actionButtons: this.generateActionButtons(data),
        notifications: this.generateNotifications(data)
      }
    };
  }
  
  /**
   * 仪表板视图数据处理 - 精简高效
   */
  private processDashboardData(data: any) {
    return {
      quote: {
        id: data.quote.id,
        status: data.quote.statusLabel,
        customer: data.customer.company || data.customer.name,
        material: data.quote.materialLabel,
        total: this.formatCurrency(data.quote.total, data.quote.currency),
        urgency: data.ui.urgencyLevel,
        progress: data.quote.progress.percentage
      },
      ui: {
        statusColor: data.ui.statusColor,
        canEdit: data.ui.canEdit,
        showUrgentBadge: data.ui.urgencyLevel === 'high',
        actions: data.context.suggestedActions.slice(0, 2)
      },
      context: {
        hasNewMessages: data.context.recentMessages.some(m => !m.isRead),
        messageCount: data.context.recentMessages.length,
        nextStep: data.quote.progress.nextStep
      }
    };
  }
  
  /**
   * 详情页数据处理 - 完整展示
   */
  private processDetailData(data: any) {
    return {
      quote: {
        ...data.quote,
        formattedTotal: this.formatCurrency(data.quote.total, data.quote.currency),
        estimatedCompletion: this.calculateCompletionDate(data.quote.estimatedDeliveryDays)
      },
      customer: {
        ...data.customer,
        displayName: data.customer.company || data.customer.name,
        loyaltyLevel: this.calculateLoyaltyLevel(data.customer.totalOrders),
        registrationDuration: this.formatDuration(data.customer.registrationDate)
      },
      expert: {
        ...data.expert,
        permissions: {
          canEdit: data.ui.canEdit,
          canMessage: data.ui.canMessage,
          canUpdateOrder: data.ui.canUpdateOrder
        }
      },
      context: {
        messages: data.context.recentMessages.map(m => ({
          ...m,
          formattedDate: this.formatRelativeTime(m.createdAt),
          isFromCustomer: m.senderType === 'customer'
        })),
        orders: data.context.relatedOrders.map(o => ({
          ...o,
          formattedTotal: this.formatCurrency(o.total, data.quote.currency)
        })),
        actions: this.prioritizeActions(data.context.suggestedActions),
        timeline: this.buildTimeline(data)
      }
    };
  }
  
  /**
   * 移动端数据处理 - 优化体验
   */
  private processMobileData(data: any) {
    return {
      header: {
        title: `${data.customer.company || data.customer.name}`,
        subtitle: `${data.quote.quantity}x ${data.quote.materialLabel}`,
        status: data.quote.statusLabel,
        statusColor: data.ui.statusColor
      },
      metrics: [
        {
          label: '报价金额',
          value: this.formatCurrency(data.quote.total, data.quote.currency),
          important: true
        },
        {
          label: '进度',
          value: `${data.quote.progress.percentage}%`,
          progress: data.quote.progress.percentage
        },
        {
          label: '交期',
          value: `${data.quote.estimatedDeliveryDays}天`,
          urgent: data.ui.urgencyLevel === 'high'
        }
      ],
      quickActions: data.context.suggestedActions
        .filter(action => action.priority === 'high')
        .slice(0, 3),
      summary: {
        hasUpdates: data.context.recentMessages.length > 0,
        nextStep: data.quote.progress.nextStep,
        canTakeAction: data.ui.canEdit
      }
    };
  }
  
  private processDefaultData(data: any) {
    return data;
  }
  
  // 辅助方法
  private formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
  
  private calculateCompletionDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('zh-CN');
  }
  
  private formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString('zh-CN');
  }
  
  private formatRelativeTime(dateString: string): string {
    const rtf = new Intl.RelativeTimeFormat('zh-CN', { numeric: 'auto' });
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    if (days < 7) return rtf.format(-days, 'day');
    return new Date(dateString).toLocaleDateString('zh-CN');
  }
  
  private formatDuration(dateString: string): string {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years}年`;
    if (months > 0) return `${months}个月`;
    return `${days}天`;
  }
  
  /**
   * 格式化Transparent Breakdown Pricing数据
   */
  private formatTransparentBreakdown(breakdown: any) {
    if (!breakdown || !breakdown.breakdown) return null;
    
    return {
      totalSummary: {
        transparentThirdPartyCost: `¥${breakdown.transparentThirdPartyCost?.toFixed(2)}`,
        engineeringDesignFee: `¥${breakdown.engineeringDesignFee?.toFixed(2)}`,
        manufacturingQualityService: `¥${breakdown.manufacturingQualityService?.toFixed(2)}`,
        operationalManagementFee: `¥${breakdown.operationalManagementFee?.toFixed(2)}`,
        subtotal: `¥${breakdown.subtotal?.toFixed(2)}`,
        quantityDiscount: breakdown.quantityDiscount ? `¥${breakdown.quantityDiscount?.toFixed(2)}` : '¥0.00',
        finalTotal: `¥${breakdown.finalTotal?.toFixed(2)}`
      },
      detailedBreakdown: breakdown.breakdown,
      explanation: {
        title: 'Transparent Breakdown Pricing体系',
        subtitle: '材料+工时+设备+利润=总价的完全透明化',
        philosophy: '零隐藏费用，8小时专家审核详细报价'
      }
    };
  }
  
  private prioritizeActions(actions: any[]): any[] {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return actions.sort((a, b) => 
      priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }
  
  private getProgressColor(percentage: number): string {
    if (percentage >= 80) return '#10b981'; // green
    if (percentage >= 50) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  }
  
  private getStatusBadge(status: string): string {
    const badges = {
      'pending': 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800',
      'reviewing': 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800',
      'quoted': 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800',
      'accepted': 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800',
      'ordered': 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800',
      'archived': 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'
    };
    return badges[status] || badges['pending'];
  }
  
  private getUrgencyBadge(urgency: string): string {
    const badges = {
      'high': 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800',
      'medium': 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800',
      'low': 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
    };
    return badges[urgency] || '';
  }
  
  private generateActionButtons(data: any): Array<{ action: string, label: string, style: string }> {
    const buttons = [];
    
    if (data.ui.canEdit) {
      buttons.push({
        action: 'edit_quote',
        label: '编辑报价',
        style: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      });
    }
    
    if (data.ui.canMessage) {
      buttons.push({
        action: 'send_message',
        label: '发送消息',
        style: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
      });
    }
    
    if (data.ui.canUpdateOrder) {
      buttons.push({
        action: 'update_order',
        label: '更新订单',
        style: 'bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700'
      });
    }
    
    return buttons;
  }
  
  private generateNotifications(data: any): Array<{ type: string, message: string }> {
    const notifications = [];
    
    if (data.ui.urgencyLevel === 'high') {
      notifications.push({
        type: 'warning',
        message: '此报价标记为紧急，请优先处理'
      });
    }
    
    if (data.context.recentMessages.length > 0) {
      notifications.push({
        type: 'info',
        message: `有 ${data.context.recentMessages.length} 条新消息`
      });
    }
    
    return notifications;
  }
  
  private buildAdminTimeline(data: any): Array<{ title: string, description: string, date: string, type: string }> {
    const timeline = [];
    
    // 操作记录
    timeline.push({
      title: '报价更新',
      description: `专家 ${data.expert.name} 更新了报价`,
      date: this.formatRelativeTime(data.operation.updatedAt),
      type: 'operation'
    });
    
    // 最近消息
    data.context.recentMessages.slice(0, 3).forEach(message => {
      timeline.push({
        title: message.senderType === 'customer' ? '客户消息' : '专家回复',
        description: message.content.substring(0, 50) + (message.content.length > 50 ? '...' : ''),
        date: this.formatRelativeTime(message.createdAt),
        type: 'message'
      });
    });
    
    return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  private buildTimeline(data: any): Array<any> {
    // 构建标准时间线
    return this.buildAdminTimeline(data);
  }
}