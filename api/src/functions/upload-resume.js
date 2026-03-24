const { app } = require("@azure/functions");
const crypto = require("crypto");

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const CONTAINER_NAME = "resumes";

/**
 * Parse a connection string like:
 * DefaultEndpointsProtocol=https;AccountName=...;AccountKey=...;BlobEndpoint=...
 */
function parseConnectionString(connStr) {
  const parts = {};
  for (const pair of connStr.split(";")) {
    const idx = pair.indexOf("=");
    if (idx > 0) {
      const key = pair.substring(0, idx);
      const val = pair.substring(idx + 1);
      parts[key] = val;
    }
  }
  return parts;
}

/**
 * Sign a request using Azure Storage Shared Key authorization.
 * https://learn.microsoft.com/en-us/rest/api/storageservices/authorize-with-shared-key
 */
function createAuthHeader(method, accountName, accountKey, blobPath, contentLength, contentType, headers) {
  const now = new Date().toUTCString();
  headers["x-ms-date"] = now;
  headers["x-ms-version"] = "2020-10-02";
  headers["x-ms-blob-type"] = "BlockBlob";

  // Canonicalized headers
  const canonicalizedHeaders = Object.keys(headers)
    .filter((k) => k.startsWith("x-ms-"))
    .sort()
    .map((k) => `${k}:${headers[k]}`)
    .join("\n");

  // Canonicalized resource
  const canonicalizedResource = `/${accountName}/${blobPath}`;

  // String to sign for Blob service
  const stringToSign = [
    method,               // HTTP verb
    "",                   // Content-Encoding
    "",                   // Content-Language
    contentLength.toString(), // Content-Length
    "",                   // Content-MD5
    contentType,          // Content-Type
    "",                   // Date (empty when x-ms-date is used)
    "",                   // If-Modified-Since
    "",                   // If-Match
    "",                   // If-None-Match
    "",                   // If-Unmodified-Since
    "",                   // Range
    canonicalizedHeaders, // Canonicalized headers
    canonicalizedResource // Canonicalized resource
  ].join("\n");

  const key = Buffer.from(accountKey, "base64");
  const signature = crypto.createHmac("sha256", key).update(stringToSign, "utf8").digest("base64");

  return `SharedKey ${accountName}:${signature}`;
}

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

      // Parse connection string
      const config = parseConnectionString(connectionString);
      const accountName = config.AccountName;
      const accountKey = config.AccountKey;
      const blobEndpoint = config.BlobEndpoint || `https://${accountName}.blob.core.windows.net/`;

      // Generate unique blob name
      const timestamp = Date.now();
      const safeName = (file.name || "resume.pdf").replace(/[^a-zA-Z0-9._-]/g, "_");
      const blobName = `${timestamp}-${safeName}`;
      const blobPath = `${CONTAINER_NAME}/${blobName}`;

      // Read file
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // Build request headers
      const headers = {};
      const authHeader = createAuthHeader(
        "PUT", accountName, accountKey, blobPath,
        fileBuffer.length, file.type, headers
      );

      // Upload via Azure Blob REST API
      const blobUrl = `${blobEndpoint.replace(/\/$/, "")}/${blobPath}`;
      const response = await fetch(blobUrl, {
        method: "PUT",
        headers: {
          ...headers,
          "Authorization": authHeader,
          "Content-Type": file.type,
          "Content-Length": fileBuffer.length.toString(),
        },
        body: fileBuffer,
      });

      if (!response.ok) {
        const errorText = await response.text();
        context.error("Blob upload failed:", response.status, errorText);
        return {
          status: 500,
          jsonBody: { success: false, error: "Failed to upload file." },
        };
      }

      context.log("Resume uploaded to blob storage:", blobUrl);
      return { jsonBody: { success: true, url: blobUrl } };
    } catch (err) {
      context.error("Upload-resume function error:", err);
      return {
        status: 500,
        jsonBody: { success: false, error: "Failed to upload file." },
      };
    }
  },
});
