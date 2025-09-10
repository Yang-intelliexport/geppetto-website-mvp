// 邮件服务工具 - 使用Resend
// 动态导入避免在客户端构建时出现问题
let resendInstance: any = null;

// 初始化Resend客户端（仅在服务器端）
async function getResendClient() {
  if (typeof window !== 'undefined') {
    throw new Error('Resend can only be used on the server side');
  }
  
  if (!resendInstance) {
    const { Resend } = await import('resend');
    resendInstance = new Resend(process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY);
  }
  
  return resendInstance;
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

export interface QuoteEmailData {
  customerName: string;
  customerEmail: string;
  quoteId: string;
  finalQuote: number;
  deliveryDays: number;
  expertNotes?: string;
  materials: string;
  quantity: number;
  requirements?: string;
  fileUrls?: string[];
}

// 发送通用邮件
export async function sendEmail(options: EmailOptions) {
  try {
    const resend = await getResendClient();
    const { data, error } = await resend.emails.send({
      from: options.from || 'Geppetto <no-reply@geppetto.studio>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      attachments: options.attachments
    });

    if (error) {
      throw new Error(`邮件发送失败: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

// 发送联系表单通知邮件给管理员
export async function sendContactNotification(contactData: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  source: string;
  language?: string;
}) {
  const isZh = contactData.language === 'zh';
  
  const subject = isZh ? 
    `新的咨询提交 - ${contactData.name}` : 
    `New Contact Form Submission - ${contactData.name}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(90deg, #7F00FF, #00BFFF); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-row { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #7F00FF; border-radius: 4px; }
        .label { font-weight: bold; color: #7F00FF; }
        .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e1e5e9; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Geppetto ${isZh ? '新咨询' : 'New Inquiry'}</h1>
        </div>
        <div class="content">
          <div class="info-row">
            <span class="label">${isZh ? '客户姓名' : 'Customer Name'}:</span> ${contactData.name}
          </div>
          <div class="info-row">
            <span class="label">${isZh ? '邮箱地址' : 'Email'}:</span> ${contactData.email}
          </div>
          ${contactData.company ? `
            <div class="info-row">
              <span class="label">${isZh ? '公司名称' : 'Company'}:</span> ${contactData.company}
            </div>
          ` : ''}
          ${contactData.phone ? `
            <div class="info-row">
              <span class="label">${isZh ? '联系电话' : 'Phone'}:</span> ${contactData.phone}
            </div>
          ` : ''}
          <div class="info-row">
            <span class="label">${isZh ? '提交来源' : 'Source'}:</span> ${contactData.source}
          </div>
          <div class="message-box">
            <h3>${isZh ? '咨询内容' : 'Message'}:</h3>
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            ${isZh ? '收到时间' : 'Received at'}: ${new Date().toLocaleString(isZh ? 'zh-CN' : 'en-US')}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: import.meta.env.ADMIN_EMAIL || 'business@geppetto.studio',
    subject,
    html,
    replyTo: contactData.email
  });
}

// 发送报价邮件给客户
export async function sendQuoteEmail(quoteData: QuoteEmailData) {
  const subject = `Your Geppetto Quote #${quoteData.quoteId} - $${quoteData.finalQuote}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(90deg, #7F00FF, #00BFFF); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 40px; border-radius: 0 0 8px 8px; }
        .quote-summary { background: white; padding: 30px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .price-highlight { font-size: 36px; font-weight: bold; color: #7F00FF; text-align: center; margin: 20px 0; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .info-item { background: #f8f9fa; padding: 15px; border-radius: 6px; }
        .info-label { font-weight: bold; color: #666; font-size: 14px; }
        .info-value { color: #333; font-size: 16px; }
        .cta-button { display: inline-block; background: linear-gradient(90deg, #7F00FF, #00BFFF); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .notes-section { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
        .footer { text-align: center; margin-top: 40px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Geppetto Quote is Ready!</h1>
          <p>Hi ${quoteData.customerName}, we've prepared your custom manufacturing quote</p>
        </div>
        <div class="content">
          <div class="quote-summary">
            <h2 style="color: #333; text-align: center;">Quote Summary</h2>
            <div class="price-highlight">$${quoteData.finalQuote.toLocaleString()}</div>
            <p style="text-align: center; color: #666;">Delivery in ${quoteData.deliveryDays} business days</p>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Quote ID</div>
              <div class="info-value">#${quoteData.quoteId}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Material</div>
              <div class="info-value">${quoteData.materials}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Quantity</div>
              <div class="info-value">${quoteData.quantity} pieces</div>
            </div>
            <div class="info-item">
              <div class="info-label">Delivery Time</div>
              <div class="info-value">${quoteData.deliveryDays} days</div>
            </div>
          </div>

          ${quoteData.requirements ? `
            <div class="info-item" style="grid-column: 1 / -1;">
              <div class="info-label">Your Requirements</div>
              <div class="info-value">${quoteData.requirements}</div>
            </div>
          ` : ''}

          ${quoteData.expertNotes ? `
            <div class="notes-section">
              <h3 style="color: #856404; margin-top: 0;">Expert Notes</h3>
              <p style="margin-bottom: 0; white-space: pre-wrap;">${quoteData.expertNotes}</p>
            </div>
          ` : ''}

          <div style="text-align: center;">
            <a href="${import.meta.env.PUBLIC_SITE_URL}/track-order?quote=${quoteData.quoteId}" class="cta-button">
              Accept Quote & Proceed to Payment
            </a>
          </div>

          <div class="footer">
            <p><strong>What's Next?</strong></p>
            <p>1. Review your quote above<br>
               2. Click "Accept Quote" to proceed with payment<br>
               3. We'll start manufacturing within 24 hours<br>
               4. Track your order progress in real-time</p>
            
            <p style="margin-top: 30px;">
              Questions? Reply to this email or contact us at<br>
              hello@geppetto.studio | +86 13511091304
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: quoteData.customerEmail,
    subject,
    html,
    replyTo: import.meta.env.SUPPORT_EMAIL || 'hello@geppetto.studio'
  });
}

// 发送订单确认邮件
export async function sendOrderConfirmation(orderData: {
  customerName: string;
  customerEmail: string;
  orderId: string;
  amount: number;
  paymentId: string;
  estimatedDelivery: string;
  trackingUrl: string;
}) {
  const subject = `Order Confirmed #${orderData.orderId} - Manufacturing Started!`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(90deg, #28a745, #20c997); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 40px; border-radius: 0 0 8px 8px; }
        .success-badge { background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #c3e6cb; }
        .order-details { background: white; padding: 30px; border-radius: 8px; margin: 20px 0; }
        .track-button { display: inline-block; background: linear-gradient(90deg, #7F00FF, #00BFFF); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; }
        .timeline { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .timeline-item { display: flex; align-items: center; margin: 15px 0; }
        .timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: #28a745; margin-right: 15px; }
        .timeline-dot.pending { background: #6c757d; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmed!</h1>
          <p>Hi ${orderData.customerName}, your payment has been received and manufacturing has started!</p>
        </div>
        <div class="content">
          <div class="success-badge">
            <strong>🎉 Payment Successful!</strong><br>
            Your order is now in our production queue
          </div>

          <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> #${orderData.orderId}</p>
            <p><strong>Amount Paid:</strong> $${orderData.amount.toLocaleString()}</p>
            <p><strong>Payment ID:</strong> ${orderData.paymentId}</p>
            <p><strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}</p>
          </div>

          <div class="timeline">
            <h3>Production Timeline</h3>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div>Order received and payment confirmed</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div>Production planning and material preparation</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot pending"></div>
              <div>⏳ CNC machining and manufacturing</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot pending"></div>
              <div>⏳ Quality inspection and finishing</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot pending"></div>
              <div>⏳ Packaging and shipping</div>
            </div>
          </div>

          <div style="text-align: center;">
            <a href="${orderData.trackingUrl}" class="track-button">
              Track Your Order Progress
            </a>
          </div>

          <div style="text-align: center; margin-top: 40px; color: #666; font-size: 14px;">
            <p><strong>Need Help?</strong></p>
            <p>hello@geppetto.studio | +86 13511091304</p>
            <p>We'll send you updates as your order progresses through production!</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: orderData.customerEmail,
    subject,
    html,
    replyTo: import.meta.env.SUPPORT_EMAIL || 'hello@geppetto.studio'
  });
}

