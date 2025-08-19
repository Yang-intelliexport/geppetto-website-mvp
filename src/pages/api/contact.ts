import type { APIRoute } from 'astro';

interface ContactFormData {
  firstName?: string;
  lastName?: string;
  name?: string; // For Chinese form
  position?: string; // For Chinese form  
  email: string;
  company: string;
  phone: string;
  projectDetails: string;
  language?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data: ContactFormData = {
      firstName: formData.get('firstName')?.toString(),
      lastName: formData.get('lastName')?.toString(),
      name: formData.get('name')?.toString(),
      position: formData.get('position')?.toString(),
      email: formData.get('email')?.toString() || '',
      company: formData.get('company')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      projectDetails: formData.get('projectDetails')?.toString() || '',
      language: formData.get('language')?.toString() || 'en',
    };

    // Validate required fields
    if (!data.email || !data.company || !data.projectDetails) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: email, company, and project details are required.' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid email format.' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notifications
    // 3. Integrate with CRM
    // 4. Send auto-response email
    
    // For now, we'll simulate processing and return success
    console.log('Contact form submission:', data);
    
    // Simulate email sending or database storage
    await processContactSubmission(data);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: data.language === 'zh' ? 
          '感谢您的咨询！我们的专业团队将在24小时内与您联系。' : 
          'Thank you for your inquiry! Our expert team will contact you within 24 hours.'
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An error occurred while processing your request. Please try again.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

async function processContactSubmission(data: ContactFormData) {
  // This function would handle the actual processing:
  // - Database storage
  // - Email notifications
  // - CRM integration
  // - Auto-response emails
  
  const timestamp = new Date().toISOString();
  const submissionId = `contact_${timestamp.replace(/[:.]/g, '')}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Simulate database storage
  const submissionRecord = {
    id: submissionId,
    timestamp,
    ...data,
    status: 'new',
    source: 'contact_form'
  };
  
  console.log('Processed contact submission:', submissionRecord);
  
  // In a real implementation, you would:
  // 1. Insert into database (PostgreSQL, MongoDB, etc.)
  // 2. Send notification email to team
  // 3. Send confirmation email to customer
  // 4. Create CRM record
  // 5. Trigger follow-up workflows
  
  return submissionRecord;
}