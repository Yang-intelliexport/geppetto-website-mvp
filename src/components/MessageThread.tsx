import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '../lib/supabase/client';

// V1.1版本：quote_messages表结构
interface Message {
  id: string;
  quote_id: string;
  sender_id: string;
  message_content: string;
  created_at: string;
}

interface MessageThreadProps {
  quoteId: string;
  initialMessages: Message[];
  userId: string;  // V1.1使用user_id而不是email
  userName: string;
  currentLang?: 'zh' | 'en';
}

export default function MessageThread({ 
  quoteId, 
  initialMessages, 
  userId, 
  userName,
  currentLang = 'zh'
}: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  // 多语言文本配置
  const texts = {
    zh: {
      noMessagesPrompt: '还没有消息。如有疑问，请随时留言。',
      customerService: '客服',
      messagePlaceholder: '输入您的消息...',
      sendButton: '发送',
      sending: '发送中...',
      responsePrompt: '发送消息后我们的专家会尽快回复您',
      sendFailedPrefix: '发送失败: ',
      unknownError: '未知错误'
    },
    en: {
      noMessagesPrompt: 'No messages yet. Feel free to leave a message if you have any questions.',
      customerService: 'Support',
      messagePlaceholder: 'Type your message...',
      sendButton: 'Send',
      sending: 'Sending...',
      responsePrompt: 'Our experts will respond to your message as soon as possible',
      sendFailedPrefix: 'Send failed: ',
      unknownError: 'Unknown error'
    }
  };

  const t = texts[currentLang];

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // V1.1实时订阅quote_messages表
  useEffect(() => {
    console.log('🔄 订阅报价消息 (V1.1):', quoteId);
    
    const channel = supabase
      .channel(`quote-messages-${quoteId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'quote_messages',
        filter: `quote_id=eq.${quoteId}`
      }, (payload) => {
        console.log('✅ 收到新消息 (V1.1):', payload.new);
        const newMsg = payload.new as Message;
        setMessages((currentMessages) => {
          // 避免重复添加消息
          if (currentMessages.find(msg => msg.id === newMsg.id)) {
            return currentMessages;
          }
          return [...currentMessages, newMsg];
        });
      })
      .subscribe();

    // 组件卸载时取消订阅
    return () => {
      console.log('🛑 取消消息订阅');
      supabase.removeChannel(channel);
    };
  }, [quoteId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    if (sending) return;

    setSending(true);
    setError('');

    try {
      console.log('📤 发送消息 (V1.1):', newMessage);
      
      // V1.1版本：使用quote_messages表结构
      const { error: insertError } = await supabase
        .from('quote_messages')
        .insert({
          quote_id: quoteId,
          sender_id: userId,
          message_content: newMessage.trim()
        });

      if (insertError) {
        throw insertError;
      }

      setNewMessage('');
      console.log('✅ 消息发送成功 (V1.1)');
    } catch (error: any) {
      console.error('❌ 发送消息失败:', error);
      setError(t.sendFailedPrefix + (error.message || t.unknownError));
    } finally {
      setSending(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString(locale, { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const isUserMessage = (message: Message) => message.sender_id === userId;

  const getSenderLabel = (message: Message) => {
    if (isUserMessage(message)) {
      return userName?.trim() || (currentLang === 'zh' ? '我' : 'You');
    }
    return t.customerService;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* 消息列表 */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>{t.noMessagesPrompt}</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${isUserMessage(message) ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isUserMessage(message)
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <div className="text-sm">
                  {message.message_content}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    isUserMessage(message)
                      ? 'text-purple-200'
                      : 'text-gray-500'
                  }`}
                >
                  <span className="font-medium">{getSenderLabel(message)}</span>
                  <span aria-hidden="true"> · </span>
                  {formatTimestamp(message.created_at)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 发送消息表单 */}
      <div className="border-t bg-white p-4">
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t.messagePlaceholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending || newMessage.trim() === ''}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? t.sending : t.sendButton}
          </button>
        </form>
        
        <div className="mt-2 text-xs text-gray-500">
          {t.responsePrompt}
        </div>
      </div>
    </div>
  );
}
