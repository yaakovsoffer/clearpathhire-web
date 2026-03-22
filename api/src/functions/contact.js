const { app } = require("@azure/functions");
const { Resend } = require("resend");

app.http("contact", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const body = await request.json();
      const { name, email, company, phone, message } = body;

      // Validate required fields
      if (!name || !email || !message) {
        return {
          status: 400,
          jsonBody: { success: false, error: "Name, email, and message are required." },
        };
      }

      // Basic email format check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
          status: 400,
          jsonBody: { success: false, error: "Invalid email format." },
        };
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      const { error } = await resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM,
        to: [process.env.CONTACT_EMAIL_TO],
        replyTo: email,
        subject: `New Contact Form Submission from ${sanitize(name)}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(email)}</td></tr>
            ${company ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Company</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(company)}</td></tr>` : ""}
            ${phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(phone)}</td></tr>` : ""}
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(message).replace(/\n/g, "<br>")}</td></tr>
          </table>
        `,
      });

      if (error) {
        context.error("Resend error:", error);
        return {
          status: 500,
          jsonBody: { success: false, error: "Failed to send email." },
        };
      }

      return { jsonBody: { success: true } };
    } catch (err) {
      context.error("Contact function error:", err);
      return {
        status: 500,
        jsonBody: { success: false, error: "Internal server error." },
      };
    }
  },
});

function sanitize(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
