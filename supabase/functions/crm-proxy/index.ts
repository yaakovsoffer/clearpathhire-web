import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const CRM_BASE_URL = "https://ewyaghobxwewdemloist.supabase.co/functions/v1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const CRM_API_KEY = Deno.env.get("CRM_API_KEY");
  if (!CRM_API_KEY) {
    return new Response(
      JSON.stringify({ success: false, error: "CRM_API_KEY is not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "get-roles") {
      const response = await fetch(`${CRM_BASE_URL}/public-roles`, {
        method: "GET",
        headers: {
          "x-api-key": CRM_API_KEY,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`CRM API error [${response.status}]: ${JSON.stringify(data)}`);
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (action === "submit-application") {
      const body = await req.json();

      const response = await fetch(`${CRM_BASE_URL}/receive-candidate-application`, {
        method: "POST",
        headers: {
          "x-api-key": CRM_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // Pass through CRM error status codes (400, 409, 429)
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid action. Use 'get-roles' or 'submit-application'" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("CRM proxy error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
