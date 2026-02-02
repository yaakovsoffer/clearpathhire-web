import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple sanitization to prevent XSS in emails
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

// Validate phone format (basic)
function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
  return phoneRegex.test(phone) && phone.length <= 30;
}

interface ContactFormData {
  formType: "contact" | "apply";
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  position?: string;
  experience?: string;
  linkedin?: string;
  about?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactFormData = await req.json();

    // Validate required fields
    if (!data.name || data.name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (data.name.length > 100) {
      throw new Error("Name must be less than 100 characters");
    }

    if (!data.email || !isValidEmail(data.email)) {
      throw new Error("Valid email is required");
    }

    if (!isValidPhone(data.phone || "")) {
      throw new Error("Invalid phone number format");
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      company: data.company ? sanitizeInput(data.company) : "",
      phone: data.phone ? sanitizeInput(data.phone) : "",
      message: data.message ? sanitizeInput(data.message) : "",
      position: data.position ? sanitizeInput(data.position) : "",
      experience: data.experience ? sanitizeInput(data.experience) : "",
      linkedin: data.linkedin ? sanitizeInput(data.linkedin) : "",
      about: data.about ? sanitizeInput(data.about) : "",
    };

    // Validate message/about length
    if (data.formType === "contact" && sanitizedData.message.length > 2000) {
      throw new Error("Message must be less than 2000 characters");
    }
    if (data.formType === "apply" && sanitizedData.about.length > 2000) {
      throw new Error("About section must be less than 2000 characters");
    }

    let subject: string;
    let htmlContent: string;

    if (data.formType === "contact") {
      subject = `New Contact Form Submission from ${sanitizedData.name}`;
      htmlContent = `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${sanitizedData.name}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td></tr>
          ${sanitizedData.company ? `<tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${sanitizedData.company}</td></tr>` : ""}
          ${sanitizedData.phone ? `<tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${sanitizedData.phone}</td></tr>` : ""}
        </table>
        <h3>Message:</h3>
        <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${sanitizedData.message}</p>
      `;
    } else {
      subject = `New Job Application from ${sanitizedData.name} - ${sanitizedData.position}`;
      htmlContent = `
        <h2>New Job Application</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${sanitizedData.name}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${sanitizedData.phone}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Position:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${sanitizedData.position}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Experience:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${sanitizedData.experience}</td></tr>
          ${sanitizedData.linkedin ? `<tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>LinkedIn:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="${sanitizedData.linkedin}">${sanitizedData.linkedin}</a></td></tr>` : ""}
        </table>
        <h3>About:</h3>
        <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${sanitizedData.about}</p>
      `;
    }

    console.log(`Sending ${data.formType} form email from ${sanitizedData.email}`);

    const emailResponse = await resend.emails.send({
      from: "ClearPath Hire <noreply@clearpathhire.com>",
      to: ["info@clearpathhire.com"],
      reply_to: sanitizedData.email,
      subject: subject,
      html: htmlContent,
    });

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      throw new Error(emailResponse.error.message || "Failed to send email");
    }

    console.log("Email sent successfully:", emailResponse.data?.id);

    return new Response(JSON.stringify({ success: true, id: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-form-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
