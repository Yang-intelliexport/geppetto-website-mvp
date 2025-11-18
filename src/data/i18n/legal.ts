export type Locale = 'en' | 'zh'

export type LegalListBlock = {
  type: 'list'
  title?: string
  items: string[]
}

export type LegalParagraphBlock = {
  type: 'paragraph'
  title?: string
  text: string
}

export type LegalNoteBlock = {
  type: 'note'
  text: string
  tone?: 'info' | 'warning'
}

export type LegalContactBlock = {
  type: 'contact'
  items: Array<{
    label: string
    value: string
  }>
}

export type LegalBlock = LegalListBlock | LegalParagraphBlock | LegalNoteBlock | LegalContactBlock

export type LegalSection = {
  title: string
  blocks: LegalBlock[]
}

export type LegalPageContent = {
  metaTitle: string
  metaDescription: string
  heroIcon: string
  heroTitle: string
  heroSubtitle: string
  lastUpdated: string
  sections: LegalSection[]
}

export const legalContent: Record<Locale, Record<'privacy' | 'terms', LegalPageContent>> = {
  en: {
    privacy: {
      metaTitle: 'Privacy Policy | Data Protection & Privacy | Geppetto Manufacturing',
      metaDescription:
        'Learn how Geppetto protects your personal information and data privacy. Our privacy policy explains data collection, usage, and protection practices.',
      heroIcon: '🔒',
      heroTitle: 'Privacy Policy',
      heroSubtitle: 'Your privacy is important to us. This policy explains how we collect, use, and protect your information.',
      lastUpdated: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Information We Collect',
          blocks: [
            {
              type: 'list',
              title: 'Personal Information',
              items: [
                'Name, email address, phone number',
                'Company information and business details',
                'Billing and shipping addresses',
                'Payment information (processed securely by third parties)'
              ]
            },
            {
              type: 'list',
              title: 'Technical Information',
              items: [
                'CAD files and technical specifications',
                'Manufacturing requirements and preferences',
                'Project communications and correspondence',
                'Website usage data and analytics'
              ]
            },
            {
              type: 'list',
              title: 'Automatically Collected Data',
              items: [
                'IP address and location data',
                'Browser type and device information',
                'Pages visited and time spent on site',
                'Cookies and tracking technologies'
              ]
            }
          ]
        },
        {
          title: '2. How We Use Your Information',
          blocks: [
            {
              type: 'list',
              title: 'Service Delivery',
              items: [
                'Process and fulfill manufacturing orders',
                'Provide quotes and technical consultations',
                'Communicate about project status and updates',
                'Handle billing and payment processing'
              ]
            },
            {
              type: 'list',
              title: 'Business Operations',
              items: [
                'Improve our services and user experience',
                'Analyze usage patterns and preferences',
                'Develop new features and capabilities',
                'Ensure security and prevent fraud'
              ]
            },
            {
              type: 'list',
              title: 'Communications',
              items: [
                'Send order confirmations and updates',
                'Provide customer support',
                'Share relevant industry insights (with consent)',
                'Send marketing materials (opt-in only)'
              ]
            }
          ]
        },
        {
          title: '3. Information Sharing and Disclosure',
          blocks: [
            {
              type: 'note',
              tone: 'info',
              text: 'We do not sell, rent, or trade your personal information to third parties.'
            },
            {
              type: 'list',
              title: 'Limited Sharing',
              items: [
                'Trusted service providers (payment processors, shipping companies)',
                'Manufacturing partners (only necessary technical information)',
                'Legal compliance (when required by law)',
                'Business transfers (merger, acquisition, asset sale)'
              ]
            },
            {
              type: 'list',
              title: 'Data Protection Measures',
              items: [
                'All third parties sign confidentiality agreements',
                'Technical data shared on a need-to-know basis only',
                'Regular audits of data handling practices',
                'Secure data transmission and storage protocols'
              ]
            }
          ]
        },
        {
          title: '4. Data Security',
          blocks: [
            {
              type: 'list',
              title: 'Technical Safeguards',
              items: [
                '256-bit SSL encryption for data transmission',
                'Secure servers with regular security updates',
                'Multi-factor authentication for staff access',
                'Regular security audits and penetration testing'
              ]
            },
            {
              type: 'list',
              title: 'Physical Security',
              items: [
                'Restricted access to manufacturing facilities',
                'Secure storage for physical documents',
                'Surveillance systems and access controls',
                'Clean desk and clear screen policies'
              ]
            },
            {
              type: 'list',
              title: 'Staff Training',
              items: [
                'Regular privacy and security training',
                'Confidentiality agreements for all employees',
                'Role-based access to customer data',
                'Incident response procedures'
              ]
            }
          ]
        },
        {
          title: '5. Your Privacy Rights',
          blocks: [
            {
              type: 'list',
              title: 'Access and Control',
              items: [
                'Request access to your personal information',
                'Correct inaccurate or incomplete data',
                'Delete your account and associated data',
                'Export your data in a portable format'
              ]
            },
            {
              type: 'list',
              title: 'Communication Preferences',
              items: [
                'Opt out of marketing communications',
                'Choose communication channels',
                'Set frequency preferences',
                'Update contact information'
              ]
            },
            {
              type: 'list',
              title: 'Legal Rights (where applicable)',
              items: [
                'Right to be forgotten (GDPR)',
                'Data portability rights',
                'Right to restrict processing',
                'Right to object to certain uses'
              ]
            }
          ]
        },
        {
          title: '6. Cookies and Tracking Technologies',
          blocks: [
            {
              type: 'list',
              title: 'Types of Cookies',
              items: [
                'Essential cookies (required for site functionality)',
                'Analytics cookies (site usage and performance)',
                'Preference cookies (user settings and choices)',
                'Marketing cookies (with explicit consent)'
              ]
            },
            {
              type: 'paragraph',
              title: 'Cookie Management',
              text: 'You can control cookies through:'
            },
            {
              type: 'list',
              items: [
                'Browser settings and preferences',
                'Our cookie consent banner',
                'Opt-out links in marketing emails',
                'Third-party opt-out tools'
              ]
            }
          ]
        },
        {
          title: '7. Data Retention',
          blocks: [
            {
              type: 'list',
              title: 'Retention Periods',
              items: [
                'Account information: Until account deletion',
                'Project data: 7 years for business records',
                'Payment information: As required by law',
                'Marketing data: Until consent withdrawal'
              ]
            },
            {
              type: 'list',
              title: 'Secure Deletion',
              items: [
                'Automated deletion of expired data',
                'Secure overwriting of storage media',
                'Certificate of destruction for sensitive data',
                'Regular purging of backup systems'
              ]
            }
          ]
        },
        {
          title: '8. International Data Transfers',
          blocks: [
            {
              type: 'paragraph',
              text: 'We may transfer your data internationally for processing and storage. When we do:'
            },
            {
              type: 'list',
              items: [
                'We ensure adequate protection through appropriate safeguards',
                'We use standard contractual clauses approved by regulators',
                'We conduct due diligence on international partners',
                'We maintain records of all international transfers'
              ]
            }
          ]
        },
        {
          title: '9. Contact Us',
          blocks: [
            {
              type: 'paragraph',
              text: 'If you have questions about this Privacy Policy or your personal information:'
            },
            {
              type: 'contact',
              items: [
                { label: 'Privacy Officer', value: 'privacy@geppetto.studio' },
                { label: 'Data Protection', value: 'dpo@geppetto.studio' },
                { label: 'General Inquiries', value: 'legal@geppetto.studio' },
                { label: 'Response Time', value: 'We respond within 30 days' }
              ]
            }
          ]
        },
        {
          title: '10. Policy Updates',
          blocks: [
            {
              type: 'paragraph',
              text: 'We may update this Privacy Policy periodically. When we make material changes:'
            },
            {
              type: 'list',
              items: [
                'We will notify you via email or website notice',
                'We will provide a 30-day notice period for significant changes',
                'We will maintain previous versions for reference',
                'Continued use indicates acceptance of changes'
              ]
            }
          ]
        }
      ]
    },
    terms: {
      metaTitle: 'Terms of Service | Terms and Conditions | Geppetto Manufacturing',
      metaDescription:
        "Read our terms of service and conditions for using Geppetto's CNC manufacturing services. Legal terms governing our business relationship.",
      heroIcon: '📋',
      heroTitle: 'Terms of Service',
      heroSubtitle: "These terms govern your use of Geppetto's manufacturing services and our business relationship.",
      lastUpdated: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Acceptance of Terms',
          blocks: [
            {
              type: 'paragraph',
              text: 'By accessing or using Geppetto’s services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.'
            },
            {
              type: 'note',
              tone: 'info',
              text: 'These terms constitute a legally binding agreement between you and Geppetto Manufacturing Inc.'
            },
            {
              type: 'list',
              title: 'Definitions',
              items: [
                '"Service" refers to CNC manufacturing, quotation, and related services',
                '"Customer" or "you" refers to the individual or entity using our services',
                '"We", "us", or "Geppetto" refers to Geppetto Manufacturing Inc.',
                '"Content" includes designs, specifications, CAD files, and communications'
              ]
            }
          ]
        },
        {
          title: '2. Service Description',
          blocks: [
            {
              type: 'list',
              title: 'Manufacturing Services',
              items: [
                'CNC machining and precision manufacturing',
                'AI-assisted quotation and analysis',
                'Design for manufacturing consultation',
                'Quality assurance and inspection',
                'Shipping and logistics coordination'
              ]
            },
            {
              type: 'list',
              title: 'Service Limitations',
              items: [
                'Services subject to technical feasibility assessment',
                'Minimum quality standards must be achievable',
                'Material availability and lead times may affect delivery',
                'Complex projects may require additional consultation'
              ]
            },
            {
              type: 'paragraph',
              title: 'Service Modifications',
              text: 'We reserve the right to modify, suspend, or discontinue services with reasonable notice. Existing orders will be completed under original terms.'
            }
          ]
        },
        {
          title: '3. Customer Responsibilities',
          blocks: [
            {
              type: 'list',
              title: 'Information Accuracy',
              items: [
                'Provide accurate and complete specifications',
                'Ensure CAD files are error-free and manufacturable',
                'Communicate requirements clearly and promptly',
                'Update contact and billing information as needed'
              ]
            },
            {
              type: 'list',
              title: 'Legal Compliance',
              items: [
                "Ensure designs don't infringe on intellectual property",
                'Comply with all applicable laws and regulations',
                'Obtain necessary permits and approvals',
                'Use manufactured parts legally and responsibly'
              ]
            },
            {
              type: 'list',
              title: 'Prohibited Uses',
              items: [
                'Manufacturing weapons or illegal items',
                'Counterfeiting or trademark violations',
                'Parts intended to harm people or property',
                'Any use that violates local or international law'
              ]
            }
          ]
        },
        {
          title: '4. Pricing and Payment',
          blocks: [
            {
              type: 'list',
              title: 'Quote Validity',
              items: [
                'Quotes valid for 30 days unless otherwise specified',
                'Prices subject to material and labor cost changes',
                'Complex projects may require updated quotes',
                'Additional services may incur extra charges'
              ]
            },
            {
              type: 'list',
              title: 'Payment Terms',
              items: [
                '50% deposit required to start production',
                'Balance due before shipping',
                'Net 30 terms available for approved customers',
                'Late payments subject to 1.5% monthly service charge'
              ]
            },
            {
              type: 'paragraph',
              title: 'Price Changes',
              text: 'We reserve the right to adjust prices for material cost fluctuations, design changes, or additional requirements discovered during production.'
            }
          ]
        },
        {
          title: '5. Production and Delivery',
          blocks: [
            {
              type: 'list',
              title: 'Lead Times',
              items: [
                'Lead times are estimates based on current capacity',
                'Rush orders available with additional fees',
                'Delays may occur due to material availability or complexity',
                'We will communicate any significant delays promptly'
              ]
            },
            {
              type: 'list',
              title: 'Quality Standards',
              items: [
                'Parts manufactured to specified tolerances',
                'Quality inspection performed before shipping',
                'Industry-standard certifications when required',
                'Documentation provided with completed orders'
              ]
            },
            {
              type: 'list',
              title: 'Delivery and Risk',
              items: [
                'Risk of loss transfers upon shipment',
                'Shipping insurance available at additional cost',
                'Customer responsible for customs and duties',
                'Delivery delays by carrier not our responsibility'
              ]
            }
          ]
        },
        {
          title: '6. Quality Assurance and Warranties',
          blocks: [
            {
              type: 'list',
              title: 'Quality Warranty',
              items: [
                'Parts warranted to meet specified dimensions and tolerances',
                'Material properties as specified in order',
                'Free from manufacturing defects',
                'Warranty period: 90 days from delivery'
              ]
            },
            {
              type: 'list',
              title: 'Warranty Limitations',
              items: [
                'Warranty void if parts modified after delivery',
                'Normal wear and tear not covered',
                'Damage from misuse or improper storage excluded',
                'Customer must inspect parts upon receipt'
              ]
            },
            {
              type: 'paragraph',
              title: 'Warranty Claims',
              text: 'Claims must be made within 30 days of discovery. We will repair, replace, or refund defective parts at our discretion.'
            }
          ]
        },
        {
          title: '7. Intellectual Property',
          blocks: [
            {
              type: 'list',
              title: 'Customer IP Rights',
              items: [
                'You retain ownership of your designs and specifications',
                'We do not claim rights to your intellectual property',
                'Your IP information kept strictly confidential',
                'Non-disclosure agreements available upon request'
              ]
            },
            {
              type: 'list',
              title: 'Our IP Rights',
              items: [
                'Our manufacturing processes and methods are proprietary',
                'AI algorithms and software are our intellectual property',
                'Manufacturing expertise and know-how protected',
                'Trademarks and branding remain our property'
              ]
            },
            {
              type: 'paragraph',
              title: 'Infringement Protection',
              text: "You warrant that your designs don't infringe on third-party rights and agree to indemnify us against any infringement claims."
            }
          ]
        },
        {
          title: '8. Limitation of Liability',
          blocks: [
            {
              type: 'note',
              tone: 'warning',
              text: 'Our liability is limited to the value of the specific order in question. We are not liable for consequential, indirect, or incidental damages.'
            },
            {
              type: 'list',
              title: 'Specific Limitations',
              items: [
                'Maximum liability equal to order value',
                'No liability for lost profits or business interruption',
                'Force majeure events exclude liability',
                'Third-party actions beyond our control excluded'
              ]
            },
            {
              type: 'paragraph',
              title: 'Exclusive Remedies',
              text: 'Repair, replacement, or refund of defective parts constitutes our entire liability and your exclusive remedy for any claims.'
            }
          ]
        },
        {
          title: '9. Dispute Resolution',
          blocks: [
            {
              type: 'list',
              title: 'Informal Resolution',
              items: [
                'Contact our customer service team first',
                'Good faith effort to resolve disputes amicably',
                'Senior management review for complex issues',
                '30-day informal resolution period'
              ]
            },
            {
              type: 'list',
              title: 'Formal Arbitration',
              items: [
                'Binding arbitration for unresolved disputes',
                'American Arbitration Association rules apply',
                'Single arbitrator for claims under $50,000',
                'Location: [Your jurisdiction]'
              ]
            },
            {
              type: 'paragraph',
              title: 'Class Action Waiver',
              text: 'You agree to resolve disputes individually and waive rights to participate in class actions or representative proceedings.'
            }
          ]
        },
        {
          title: '10. Termination',
          blocks: [
            {
              type: 'list',
              title: 'Termination Rights',
              items: [
                'Either party may terminate with 30 days notice',
                'Immediate termination for material breach',
                'Orders in progress completed under original terms',
                'Outstanding payments remain due'
              ]
            },
            {
              type: 'list',
              title: 'Effect of Termination',
              items: [
                'Access to services immediately suspended',
                'Confidentiality obligations survive termination',
                'Customer data handling per privacy policy',
                'Accrued rights and obligations remain in effect'
              ]
            }
          ]
        },
        {
          title: '11. General Provisions',
          blocks: [
            {
              type: 'paragraph',
              title: 'Governing Law',
              text: 'These terms are governed by the laws of [Your State/Country] without regard to conflict of law principles.'
            },
            {
              type: 'paragraph',
              title: 'Entire Agreement',
              text: 'These terms constitute the entire agreement between parties and supersede all prior negotiations, representations, or agreements.'
            },
            {
              type: 'paragraph',
              title: 'Modifications',
              text: 'We may modify these terms with 30 days notice. Continued use constitutes acceptance of modified terms.'
            },
            {
              type: 'paragraph',
              title: 'Severability',
              text: 'If any provision is found unenforceable, the remainder of these terms remain in full force and effect.'
            }
          ]
        },
        {
          title: '12. Contact Information',
          blocks: [
            {
              type: 'paragraph',
              text: 'For questions about these Terms of Service:'
            },
            {
              type: 'contact',
              items: [
                { label: 'Legal Department', value: 'legal@geppetto.studio' },
                { label: 'Customer Service', value: 'hello@geppetto.studio' },
                { label: 'General Inquiries', value: 'info@geppetto.studio' },
                { label: 'Address', value: '[Your Business Address]' }
              ]
            }
          ]
        }
      ]
    }
  },
  zh: {
    privacy: {
      metaTitle: '隐私政策 | 数据保护与隐私 | Geppetto智能制造',
      metaDescription: '了解Geppetto如何保护您的个人信息和数据隐私。我们的隐私政策说明数据收集、使用和保护措施。',
      heroIcon: '🔒',
      heroTitle: '隐私政策',
      heroSubtitle: '您的隐私对我们非常重要。本政策说明我们如何收集、使用和保护您的信息。',
      lastUpdated: '最后更新：2025年1月',
      sections: [
        {
          title: '1. 我们收集的信息',
          blocks: [
            {
              type: 'list',
              title: '个人信息',
              items: [
                '姓名、邮箱地址、电话号码',
                '公司信息和业务详情',
                '账单和收货地址',
                '支付信息（由第三方安全处理）'
              ]
            },
            {
              type: 'list',
              title: '技术信息',
              items: [
                'CAD文件和技术规格',
                '制造要求和偏好',
                '项目沟通和通信记录',
                '网站使用数据和分析'
              ]
            },
            {
              type: 'list',
              title: '自动收集的数据',
              items: [
                'IP地址和位置数据',
                '浏览器类型和设备信息',
                '访问页面和停留时间',
                'Cookie和跟踪技术'
              ]
            }
          ]
        },
        {
          title: '2. 我们如何使用您的信息',
          blocks: [
            {
              type: 'list',
              title: '服务提供',
              items: [
                '处理和完成制造订单',
                '提供报价和技术咨询',
                '项目状态和更新沟通',
                '处理账单和付款'
              ]
            },
            {
              type: 'list',
              title: '业务运营',
              items: [
                '改进服务和用户体验',
                '分析使用模式和偏好',
                '开发新功能和能力',
                '确保安全和防止欺诈'
              ]
            },
            {
              type: 'list',
              title: '通信交流',
              items: [
                '发送订单确认和更新',
                '提供客户支持',
                '分享相关行业洞察（经同意）',
                '发送营销材料（仅限选择加入）'
              ]
            }
          ]
        },
        {
          title: '3. 信息共享和披露',
          blocks: [
            {
              type: 'note',
              tone: 'info',
              text: '我们不会向第三方出售、出租或交易您的个人信息。'
            },
            {
              type: 'list',
              title: '有限共享',
              items: [
                '可信赖的服务提供商（支付处理商、物流公司）',
                '制造合作伙伴（仅必要的技术信息）',
                '法律合规（法律要求时）',
                '业务转移（合并、收购、资产出售）'
              ]
            },
            {
              type: 'list',
              title: '数据保护措施',
              items: [
                '所有第三方签署保密协议',
                '技术数据仅按需知原则共享',
                '定期审核数据处理实践',
                '安全的数据传输和存储协议'
              ]
            }
          ]
        },
        {
          title: '4. 数据安全',
          blocks: [
            {
              type: 'list',
              title: '技术保障',
              items: [
                '256位SSL加密数据传输',
                '定期安全更新的安全服务器',
                '员工访问的多因素认证',
                '定期安全审计和渗透测试'
              ]
            },
            {
              type: 'list',
              title: '物理安全',
              items: [
                '制造设施访问限制',
                '物理文档安全存储',
                '监控系统和访问控制',
                '清洁桌面和清洁屏幕政策'
              ]
            },
            {
              type: 'list',
              title: '员工培训',
              items: [
                '定期隐私和安全培训',
                '所有员工签署保密协议',
                '基于角色的客户数据访问',
                '事件响应程序'
              ]
            }
          ]
        },
        {
          title: '5. 您的隐私权利',
          blocks: [
            {
              type: 'list',
              title: '访问和控制',
              items: [
                '请求访问您的个人信息',
                '更正不准确或不完整的数据',
                '删除您的账户和相关数据',
                '以可移植格式导出您的数据'
              ]
            },
            {
              type: 'list',
              title: '通信偏好',
              items: [
                '选择退出营销通信',
                '选择通信渠道',
                '设置频率偏好',
                '更新联系信息'
              ]
            },
            {
              type: 'list',
              title: '法律权利（适用情况下）',
              items: [
                '被遗忘权（GDPR）',
                '数据可移植性权利',
                '限制处理权',
                '反对特定用途权'
              ]
            }
          ]
        },
        {
          title: '6. Cookie和跟踪技术',
          blocks: [
            {
              type: 'list',
              title: 'Cookie类型',
              items: [
                '必要Cookie（网站功能所必需）',
                '分析Cookie（网站使用和性能）',
                '偏好Cookie（用户设置和选择）',
                '营销Cookie（需明确同意）'
              ]
            },
            {
              type: 'paragraph',
              title: 'Cookie管理',
              text: '您可以通过以下方式管理Cookie：'
            },
            {
              type: 'list',
              items: [
                '浏览器设置和偏好',
                '我们的网站Cookie同意横幅',
                '营销邮件中的退订链接',
                '第三方退订工具'
              ]
            }
          ]
        },
        {
          title: '7. 数据保留',
          blocks: [
            {
              type: 'list',
              title: '保留期限',
              items: [
                '账户信息：直到账户被删除',
                '项目数据：保留7年满足业务记录要求',
                '支付信息：按法律要求保留',
                '营销数据：直到撤回同意'
              ]
            },
            {
              type: 'list',
              title: '安全删除',
              items: [
                '自动删除过期数据',
                '安全覆盖存储介质',
                '敏感数据提供销毁证明',
                '定期清理备份系统'
              ]
            }
          ]
        },
        {
          title: '8. 国际数据传输',
          blocks: [
            {
              type: 'paragraph',
              text: '我们可能为了处理和存储在国际间传输您的数据。在此过程中我们会：'
            },
            {
              type: 'list',
              items: [
                '通过适当的保护措施确保充分保护',
                '使用监管机构批准的标准合同条款',
                '对国际合作伙伴进行尽职调查',
                '记录所有国际数据传输'
              ]
            }
          ]
        },
        {
          title: '9. 联系我们',
          blocks: [
            {
              type: 'paragraph',
              text: '如果您对本隐私政策或个人信息有任何问题：'
            },
            {
              type: 'contact',
              items: [
                { label: '隐私官', value: 'privacy@geppetto.studio' },
                { label: '数据保护', value: 'dpo@geppetto.studio' },
                { label: '一般咨询', value: 'legal@geppetto.studio' },
                { label: '回复时间', value: '30天内回复' }
              ]
            }
          ]
        },
        {
          title: '10. 政策更新',
          blocks: [
            {
              type: 'paragraph',
              text: '我们可能会定期更新本隐私政策。当我们进行重大更改时：'
            },
            {
              type: 'list',
              items: [
                '通过邮件或网站公告通知您',
                '重大更改提供30天通知期',
                '保留历史版本供参考',
                '继续使用即表示接受更新'
              ]
            }
          ]
        }
      ]
    },
    terms: {
      metaTitle: '服务条款 | 使用条款和条件 | Geppetto智能制造',
      metaDescription: '阅读我们关于Geppetto CNC制造服务的使用条款和条件，了解管理业务关系的法律条款。',
      heroIcon: '📋',
      heroTitle: '服务条款',
      heroSubtitle: '这些条款规定您使用Geppetto制造服务以及我们业务关系的规则。',
      lastUpdated: '最后更新：2025年1月',
      sections: [
        {
          title: '1. 条款接受',
          blocks: [
            {
              type: 'paragraph',
              text: '通过访问或使用Geppetto的服务，您同意受本服务条款约束。如果您不同意任何条款，您可能无法访问该服务。'
            },
            {
              type: 'note',
              tone: 'info',
              text: '这些条款构成您与杰佩托智能制造有限公司之间具有法律约束力的协议。'
            },
            {
              type: 'list',
              title: '定义',
              items: [
                '“服务”指CNC制造、报价和相关服务',
                '“客户”或“您”指使用我们服务的个人或实体',
                '“我们”“我司”或“Geppetto”指杰佩托智能制造有限公司',
                '“内容”包括设计、规格、CAD文件和通信'
              ]
            }
          ]
        },
        {
          title: '2. 服务描述',
          blocks: [
            {
              type: 'list',
              title: '制造服务',
              items: [
                'CNC加工和精密制造',
                'AI辅助的报价和分析',
                '面向制造的设计咨询',
                '质量保证和检验',
                '运输和物流协调'
              ]
            },
            {
              type: 'list',
              title: '服务限制',
              items: [
                '服务须经技术可行性评估',
                '必须能达到最低质量标准',
                '材料供应和交期可能影响交付',
                '复杂项目可能需要额外咨询'
              ]
            },
            {
              type: 'paragraph',
              title: '服务修改',
              text: '我们保留在合理通知后修改、暂停或停止服务的权利，现有订单将按原条款完成。'
            }
          ]
        },
        {
          title: '3. 客户责任',
          blocks: [
            {
              type: 'list',
              title: '信息准确性',
              items: [
                '提供准确完整的规格',
                '确保CAD文件无错误且可制造',
                '清晰及时地沟通需求',
                '根据需要更新联系和账单信息'
              ]
            },
            {
              type: 'list',
              title: '法律合规',
              items: [
                '确保设计不侵犯知识产权',
                '遵守所有适用法律法规',
                '获得必要的许可和批准',
                '合法负责地使用制造零件'
              ]
            },
            {
              type: 'list',
              title: '禁止用途',
              items: [
                '制造武器或非法物品',
                '假冒或商标侵权',
                '意图伤害人员或财产的零件',
                '任何违反法律法规的用途'
              ]
            }
          ]
        },
        {
          title: '4. 定价和付款',
          blocks: [
            {
              type: 'list',
              title: '报价有效期',
              items: [
                '报价有效期30天，除非另有说明',
                '价格可能因材料和人工成本变动而调整',
                '复杂项目可能需要更新报价',
                '额外服务可能产生额外费用'
              ]
            },
            {
              type: 'list',
              title: '付款条款',
              items: [
                '开始生产需支付50%定金',
                '发货前需付清余额',
                '经批准的客户可享受月结30天',
                '逾期付款每月收取1.5%服务费'
              ]
            },
            {
              type: 'paragraph',
              title: '价格变更',
              text: '对于材料成本波动、设计变更或生产中发现的额外要求，我们保留调整价格的权利。'
            }
          ]
        },
        {
          title: '5. 生产和交付',
          blocks: [
            {
              type: 'list',
              title: '交期',
              items: [
                '交期为基于当前产能的估计',
                '可提供加急订单（需额外费用）',
                '可能因材料供应或复杂性而延迟',
                '重大延迟会及时通知'
              ]
            },
            {
              type: 'list',
              title: '质量标准',
              items: [
                '零件按指定公差制造',
                '发货前进行质量检验',
                '需要时提供行业标准认证',
                '完成订单提供相关文档'
              ]
            },
            {
              type: 'list',
              title: '交付和风险',
              items: [
                '发货后损失风险转移给客户',
                '运输保险可额外购买',
                '客户负责关税和清关',
                '承运人造成的延迟不由我司承担'
              ]
            }
          ]
        },
        {
          title: '6. 质量保证和保修',
          blocks: [
            {
              type: 'list',
              title: '质量保修',
              items: [
                '零件保证符合指定尺寸和公差',
                '材料属性符合订单要求',
                '无制造缺陷',
                '保修期：交付后90天'
              ]
            },
            {
              type: 'list',
              title: '保修限制',
              items: [
                '交付后修改零件保修失效',
                '正常磨损不在保修范围',
                '误用或不当存储造成的损坏除外',
                '客户需在收货时检查零件'
              ]
            },
            {
              type: 'paragraph',
              title: '保修声明',
              text: '需在发现后30天内提出。我们将酌情修理、更换或退还有缺陷的零件。'
            }
          ]
        },
        {
          title: '7. 知识产权',
          blocks: [
            {
              type: 'list',
              title: '客户知识产权',
              items: [
                '您保留设计和规格的所有权',
                '我们不主张获取您的知识产权',
                '您的IP信息严格保密',
                '可提供保密协议'
              ]
            },
            {
              type: 'list',
              title: '我司知识产权',
              items: [
                '制造工艺和方法为我司专有技术',
                'AI算法和软件为我司知识产权',
                '制造经验和技术受保护',
                '商标和品牌归我司所有'
              ]
            },
            {
              type: 'paragraph',
              title: '侵权保护',
              text: '您保证设计不侵犯第三方权利，并同意就任何侵权声明对我司进行赔偿。'
            }
          ]
        },
        {
          title: '8. 责任限制',
          blocks: [
            {
              type: 'note',
              tone: 'warning',
              text: '我司责任仅限于相关订单的价值，不对间接、附带或特殊损害承担责任。'
            },
            {
              type: 'list',
              title: '具体限制',
              items: [
                '最大责任等于订单价值',
                '不对利润损失或业务中断负责',
                '不可抗力事件免责',
                '超出我司控制的第三方行为除外'
              ]
            },
            {
              type: 'paragraph',
              title: '专属救济',
              text: '修理、更换或退还有缺陷零件构成我司的全部责任，也是您唯一的救济方式。'
            }
          ]
        },
        {
          title: '9. 争议解决',
          blocks: [
            {
              type: 'list',
              title: '非正式解决',
              items: [
                '首先联系客服团队',
                '善意协商友好解决',
                '复杂问题由高层审核',
                '30天非正式解决期'
              ]
            },
            {
              type: 'list',
              title: '正式仲裁',
              items: [
                '未解决争议进入具有约束力的仲裁',
                '适用中国国际经济贸易仲裁委员会规则',
                '5万元以下争议由单一仲裁员处理',
                '地点：[您的管辖区]'
              ]
            },
            {
              type: 'paragraph',
              title: '集体诉讼豁免',
              text: '您同意个别解决争议，并放弃参与集体诉讼或代表性诉讼的权利。'
            }
          ]
        },
        {
          title: '10. 终止',
          blocks: [
            {
              type: 'list',
              title: '终止权利',
              items: [
                '任何一方可提前30天通知终止',
                '重大违约可立即终止',
                '进行中的订单按原条款完成',
                '未付款项仍需支付'
              ]
            },
            {
              type: 'list',
              title: '终止效力',
              items: [
                '服务访问立即暂停',
                '保密义务在终止后继续有效',
                '客户数据按隐私政策处理',
                '既有权利义务继续有效'
              ]
            }
          ]
        },
        {
          title: '11. 一般条款',
          blocks: [
            {
              type: 'paragraph',
              title: '管辖法律',
              text: '这些条款受[您所在地]法律管辖，不考虑法律冲突原则。'
            },
            {
              type: 'paragraph',
              title: '完整协议',
              text: '这些条款构成双方完整协议，取代之前的所有谈判和陈述。'
            },
            {
              type: 'paragraph',
              title: '修改',
              text: '我们可能提前30天通知修改条款，继续使用即表示接受。'
            },
            {
              type: 'paragraph',
              title: '可分割性',
              text: '如果任何条款被认定不可执行，其余条款仍完全有效。'
            }
          ]
        },
        {
          title: '12. 联系信息',
          blocks: [
            {
              type: 'paragraph',
              text: '如对本服务条款有疑问：'
            },
            {
              type: 'contact',
              items: [
                { label: '法务部门', value: 'legal@geppetto.studio' },
                { label: '客户服务', value: 'hello@geppetto.studio' },
                { label: '一般咨询', value: 'info@geppetto.studio' },
                { label: '地址', value: '[您的营业地址]' }
              ]
            }
          ]
        }
      ]
    }
  }
}
