const { app } = require("@azure/functions");
const { BlobServiceClient } = require("@azure/storage-blob");

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const CONTAINER_NAME = "resumes";

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

      const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
      if (!connectionString) {
        context.error("AZURE_STORAGE_CONNECTION_STRING not configured");
        return {
          status: 503,
          jsonBody: { success: false, error: "File storage not available." },
        };
      }

      // Upload directly to Azure Blob Storage
      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

      // Ensure container exists (no public access — storage account policy)
      await containerClient.createIfNotExists();

      // Generate unique blob name: timestamp-originalname
      const timestamp = Date.now();
      const safeName = (file.name || "resume.pdf").replace(/[^a-zA-Z0-9._-]/g, "_");
      const blobName = `${timestamp}-${safeName}`;

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      await blockBlobClient.upload(fileBuffer, fileBuffer.length, {
        blobHTTPHeaders: { blobContentType: file.type },
      });

      const url = blockBlobClient.url;
      context.log("Resume uploaded to blob storage:", url);

      return { jsonBody: { success: true, url } };
    } catch (err) {
      context.error("Upload-resume function error:", err);
      return {
        status: 500,
        jsonBody: { success: false, error: "Failed to upload file." },
      };
    }
  },
});
