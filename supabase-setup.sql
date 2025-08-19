-- Geppetto网站数据库表创建脚本
-- 请在Supabase SQL编辑器中执行此脚本

-- 1. 联系表单提交表
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    message TEXT NOT NULL,
    source VARCHAR(50) CHECK (source IN ('contact_form', 'ai_quote', 'calculator')) DEFAULT 'contact_form',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. AI报价请求表
CREATE TABLE quote_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    material VARCHAR(255),
    quantity INTEGER NOT NULL DEFAULT 1,
    requirements TEXT,
    file_urls TEXT[], -- 存储文件URL数组
    estimated_cost DECIMAL(10,2),
    status VARCHAR(50) CHECK (status IN ('pending', 'reviewing', 'quoted', 'completed')) DEFAULT 'pending',
    expert_notes TEXT,
    final_quote DECIMAL(10,2),
    delivery_days INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 成本计算结果表
CREATE TABLE cost_calculations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    parameters JSONB NOT NULL, -- 存储计算参数
    results JSONB NOT NULL, -- 存储计算结果
    total_cost DECIMAL(10,2) NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    user_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 创建索引提升查询性能
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_email ON quote_requests(email);
CREATE INDEX idx_cost_calculations_created_at ON cost_calculations(created_at DESC);
CREATE INDEX idx_cost_calculations_email ON cost_calculations(user_email);

-- 5. 创建更新时间戳触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quote_requests_updated_at
    BEFORE UPDATE ON quote_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. 启用RLS (Row Level Security) - 可根据需要配置
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_calculations ENABLE ROW LEVEL SECURITY;

-- 7. 创建公共访问策略（允许插入）
CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on quote_requests" ON quote_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on cost_calculations" ON cost_calculations
    FOR INSERT WITH CHECK (true);

-- 8. 创建用户角色表（用于更精细的权限控制）
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'viewer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- 创建用户角色索引
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- 创建获取用户角色的函数
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID DEFAULT auth.uid())
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT role 
        FROM user_roles 
        WHERE user_id = user_uuid 
        AND role IN ('admin', 'manager')
        ORDER BY CASE role WHEN 'admin' THEN 1 WHEN 'manager' THEN 2 ELSE 3 END
        LIMIT 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建检查是否为管理员的函数
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM user_roles 
        WHERE user_id = user_uuid 
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. 创建增强的管理员策略
CREATE POLICY "Admins can view all contact submissions" ON contact_submissions
    FOR SELECT USING (is_admin());

CREATE POLICY "Managers can view contact submissions" ON contact_submissions
    FOR SELECT USING (get_user_role() IN ('admin', 'manager'));

CREATE POLICY "Admins can view all quote requests" ON quote_requests
    FOR SELECT USING (is_admin());

CREATE POLICY "Managers can view quote requests" ON quote_requests
    FOR SELECT USING (get_user_role() IN ('admin', 'manager'));

CREATE POLICY "Admins can update quote requests" ON quote_requests
    FOR UPDATE USING (is_admin());

CREATE POLICY "Managers can update quote status only" ON quote_requests
    FOR UPDATE USING (
        get_user_role() = 'manager' 
        AND (
            OLD.status != NEW.status OR
            OLD.expert_notes != NEW.expert_notes OR
            OLD.final_quote != NEW.final_quote OR
            OLD.delivery_days != NEW.delivery_days
        )
    );

-- 10. 用户角色管理策略
CREATE POLICY "Admins can manage user roles" ON user_roles
    FOR ALL USING (is_admin());

-- 启用用户角色表的RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- 9. 创建Storage bucket（用于文件上传）
INSERT INTO storage.buckets (id, name, public) VALUES ('cad-files', 'cad-files', true);

-- 10. 设置Storage策略
CREATE POLICY "Allow public upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'cad-files');

CREATE POLICY "Allow public view" ON storage.objects
    FOR SELECT USING (bucket_id = 'cad-files');

-- 11. 创建统计视图（用于后台仪表板）
CREATE VIEW quote_requests_stats AS
SELECT 
    status,
    COUNT(*) as count,
    AVG(estimated_cost) as avg_cost,
    DATE(created_at) as date
FROM quote_requests 
GROUP BY status, DATE(created_at)
ORDER BY date DESC;

CREATE VIEW daily_submissions AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_submissions,
    COUNT(CASE WHEN source = 'contact_form' THEN 1 END) as contact_forms,
    COUNT(CASE WHEN source = 'ai_quote' THEN 1 END) as quote_requests,
    COUNT(CASE WHEN source = 'calculator' THEN 1 END) as calculator_saves
FROM contact_submissions
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- 12. 插入测试数据（可选）
INSERT INTO contact_submissions (name, email, company, message, source) VALUES
('张工程师', 'zhang@example.com', '某机器人公司', '希望了解精密零件加工服务', 'contact_form'),
('李经理', 'li@example.com', '航空科技公司', '需要航空级零件制造', 'ai_quote');

INSERT INTO quote_requests (name, email, company, material, quantity, requirements, status) VALUES
('王工程师', 'wang@example.com', '医疗设备公司', '316L不锈钢', 50, '医疗级精度要求', 'pending'),
('刘设计师', 'liu@example.com', '汽车配件公司', '6061-T6铝合金', 100, '汽车级表面处理', 'reviewing');

-- 完成！数据库设置完成。
-- 请确保在Supabase项目设置中获取：
-- 1. Project URL
-- 2. Anon key 
-- 3. Service role key (如需后台管理功能)