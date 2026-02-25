import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Allowed MIME types and their magic bytes
const ALLOWED_TYPES: Record<string, { mimeTypes: string[]; magicBytes: number[][] }> = {
  pdf: {
    mimeTypes: ["application/pdf"],
    magicBytes: [[0x25, 0x50, 0x44, 0x46]], // %PDF
  },
  docx: {
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    magicBytes: [[0x50, 0x4b, 0x03, 0x04]], // PK (ZIP archive)
  },
  doc: {
    mimeTypes: ["application/msword"],
    magicBytes: [[0xd0, 0xcf, 0x11, 0xe0]], // MS Compound File
  },
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function validateMagicBytes(buffer: Uint8Array): boolean {
  for (const type of Object.values(ALLOWED_TYPES)) {
    for (const magic of type.magicBytes) {
      if (magic.every((byte, i) => buffer[i] === byte)) {
        return true;
      }
    }
  }
  return false;
}

function isAllowedMimeType(mimeType: string): boolean {
  return Object.values(ALLOWED_TYPES).some((t) =>
    t.mimeTypes.includes(mimeType)
  );
}

function sanitizeFileName(name: string): string {
  // Remove path traversal attempts and special characters
  return name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/\.{2,}/g, ".")
    .substring(0, 100);
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ success: false, error: "No file provided" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ success: false, error: "File size exceeds 5MB limit" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (file.size === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "File is empty" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate MIME type
    if (!isAllowedMimeType(file.type)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Read file and validate magic bytes
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    if (!validateMagicBytes(uint8Array)) {
      console.warn("Magic bytes validation failed for file:", file.name, "type:", file.type);
      return new Response(
        JSON.stringify({
          success: false,
          error: "File content does not match its declared type. The file may be corrupted or potentially unsafe.",
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate safe filename with timestamp
    const sanitizedName = sanitizeFileName(file.name);
    const timestamp = Date.now();
    const filePath = `${timestamp}_${sanitizedName}`;

    // Upload to Supabase Storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, uint8Array, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error("Failed to upload file");
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("resumes")
      .getPublicUrl(filePath);

    console.log("Resume uploaded successfully:", filePath);

    return new Response(
      JSON.stringify({
        success: true,
        url: urlData.publicUrl,
        fileName: sanitizedName,
        filePath: filePath,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Resume upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
