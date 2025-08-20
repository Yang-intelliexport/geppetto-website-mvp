import type { APIRoute } from 'astro';
import { submitContactForm, sendNotificationEmail } from '../../utils/supabase';

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

    // Process the contact submission with real database integration
    const submissionResult = await processContactSubmission(data);
    
    if (!submissionResult.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: submissionResult.error || 'Failed to process submission' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
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
  try {
    // Prepare contact submission data
    const contactData = {
      name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
      email: data.email,
      company: data.company,
      phone: data.phone,
      message: data.projectDetails,
      source: 'contact_form' as const
    };

    // Save to database via Supabase
    const result = await submitContactForm(contactData);
    
    if (!result.success) {
      console.error('Database submission failed:', result.error);
      return { success: false, error: result.error };
    }

    // Send notification email to admin
    const adminEmail = import.meta.env.ADMIN_EMAIL || 'admin@geppetto.com';
    const notificationSubject = `New Contact Form Submission from ${contactData.name}`;
    const notificationContent = `
      New contact form submission received:
      
      Name: ${contactData.name}
      Email: ${contactData.email}
      Company: ${contactData.company}
      Phone: ${contactData.phone}
      
      Message:
      ${contactData.message}
      
      Language: ${data.language || 'en'}
      Submitted at: ${new Date().toISOString()}
    `;

    // Send notification (non-blocking)
    sendNotificationEmail(adminEmail, notificationSubject, notificationContent)
      .catch(error => console.error('Email notification failed:', error));

    return { success: true, data: result.data };
  } catch (error) {
    console.error('Contact submission processing error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}