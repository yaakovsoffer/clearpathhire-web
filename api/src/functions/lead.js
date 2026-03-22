const { app } = require("@azure/functions");
const { Resend } = require("resend");

app.http("lead", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const body = await request.json();
      const { name, email, phone, position, experience, linkedin, about, resume_url, role_id } = body;

      // Validate required fields
      if (!name || !email || !phone || !position || !experience || !about) {
        return {
          status: 400,
          jsonBody: { success: false, error: "Required fields missing." },
        };
      }

      // Send email notification via Resend
      const emailPromise = sendEmailNotification(context, {
        name, email, phone, position, experience, linkedin, about, resume_url,
      });

      // Forward to ERP API
      const erpPromise = forwardToERP(context, {
        full_name: name,
        email,
        phone,
        years_of_experience: experience,
        about,
        linkedin_profile: linkedin
          ? (linkedin.startsWith("http") ? linkedin : `https://${linkedin}`)
          : undefined,
        resume_url: resume_url || undefined,
        role_id: role_id || undefined,
      });

      const [emailResult, erpResult] = await Promise.allSettled([emailPromise, erpPromise]);

      if (emailResult.status === "rejected") {
        context.error("Email send failed:", emailResult.reason);
      }

      // Surface ERP-specific status codes to the client (409 duplicate, 429 rate limit)
      if (erpResult.status === "fulfilled" && erpResult.value.status) {
        const erpStatus = erpResult.value.status;
        if (erpStatus === 409 || erpStatus === 429) {
          return {
            status: erpStatus,
            jsonBody: { success: false, error: erpResult.value.error },
          };
        }
      }

      if (erpResult.status === "rejected") {
        context.error("ERP submit failed:", erpResult.reason);
        // Per CLAUDE.md: never surface ERP errors publicly — still return 200
      }

      return { jsonBody: { success: true } };
    } catch (err) {
      context.error("Lead function error:", err);
      return {
        status: 500,
        jsonBody: { success: false, error: "Internal server error." },
      };
    }
  },
});

async function sendEmailNotification(context, data) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM,
    to: [process.env.CONTACT_EMAIL_TO],
    replyTo: data.email,
    subject: `New Job Application from ${sanitize(data.name)} - ${sanitize(data.position)}`,
    html: `
      <h2>New Job Application</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(data.name)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(data.email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(data.phone)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Position</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(data.position)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Experience</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(data.experience)}</td></tr>
        ${data.linkedin ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">LinkedIn</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(data.linkedin)}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">About</td><td style="padding:8px;border:1px solid #ddd;">${sanitize(data.about).replace(/\n/g, "<br>")}</td></tr>
        ${data.resume_url ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Resume</td><td style="padding:8px;border:1px solid #ddd;"><a href="${sanitize(data.resume_url)}">Download</a></td></tr>` : ""}
      </table>
    `,
  });

  if (error) {
    context.error("Resend error:", error);
    throw error;
  }
}

async function forwardToERP(context, payload) {
  const erpUrl = process.env.ERP_API_URL;
  const erpKey = process.env.ERP_API_KEY;

  if (!erpUrl) {
    context.warn("ERP_API_URL not configured, skipping ERP submission");
    return { status: null };
  }

  const response = await fetch(`${erpUrl}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": erpKey || "",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    context.error(`ERP responded ${response.status}: ${errorText}`);
    return { status: response.status, error: errorText };
  }

  return { status: 200 };
}

function sanitize(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
