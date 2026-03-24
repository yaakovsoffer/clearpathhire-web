const { app } = require("@azure/functions");

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

app.http("upload-resume", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || typeof file === "string") {
        return {
          status: 400,
          jsonBody: { success: false, error: "No file provided." },
        };
      }

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return {
          status: 400,
          jsonBody: { success: false, error: "Only PDF, DOC, and DOCX files are allowed." },
        };
      }

      // Validate file size
      if (file.size > MAX_SIZE) {
        return {
          status: 400,
          jsonBody: { success: false, error: "File size must be under 5MB." },
        };
      }

      if (file.size === 0) {
        return {
          status: 400,
          jsonBody: { success: false, error: "File appears to be empty." },
        };
      }

      // Forward file to ERP API for storage
      const erpUrl = process.env.ERP_API_URL;
      const erpKey = process.env.ERP_API_KEY;

      if (!erpUrl) {
        context.warn("ERP_API_URL not configured, cannot store resume");
        return {
          status: 503,
          jsonBody: { success: false, error: "File storage not available." },
        };
      }

      // Manually build multipart/form-data because Node.js Web API FormData
      // doesn't produce output that multer (Express) can parse reliably
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const boundary = "----WebKitFormBoundary" + Math.random().toString(36).slice(2);
      const fileName = file.name || "resume.pdf";

      const bodyParts = [
        `--${boundary}\r\n`,
        `Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`,
        `Content-Type: ${file.type}\r\n`,
        `\r\n`,
      ];

      const header = Buffer.from(bodyParts.join(""));
      const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
      const body = Buffer.concat([header, fileBuffer, footer]);

      const response = await fetch(`${erpUrl}/api/upload-resume`, {
        method: "POST",
        headers: {
          "x-api-key": erpKey || "",
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
        },
        body,
      });

      let data;
      try {
        data = await response.json();
      } catch {
        const text = await response.text().catch(() => "Unknown error");
        context.error("ERP upload non-JSON response:", text);
        return {
          status: 500,
          jsonBody: { success: false, error: "Failed to upload file." },
        };
      }

      if (!response.ok || !data.success) {
        context.error("ERP upload error:", data);
        return {
          status: 500,
          jsonBody: { success: false, error: data.error || "Failed to upload file." },
        };
      }

      return { jsonBody: { success: true, url: data.url } };
    } catch (err) {
      context.error("Upload-resume function error:", err);
      return {
        status: 500,
        jsonBody: { success: false, error: "Internal server error." },
      };
    }
  },
});
