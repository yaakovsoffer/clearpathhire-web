const { app } = require("@azure/functions");

app.http("roles", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const erpUrl = process.env.ERP_API_URL;
      const erpKey = process.env.ERP_API_KEY;

      if (!erpUrl) {
        // Return empty roles if ERP not configured — frontend will use fallback list
        return { jsonBody: { roles: [] } };
      }

      const response = await fetch(`${erpUrl}/api/public/roles`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        context.error(`ERP roles responded ${response.status}`);
        return { jsonBody: { roles: [] } };
      }

      const data = await response.json();

      // Normalize ERP camelCase fields to snake_case the frontend expects
      const roles = (data.roles || []).map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        employment_type: r.employmentType || "",
        location: r.location || "",
        timezone: r.timezone || "",
        company: r.client?.companyName || "",
      }));

      return { jsonBody: { roles } };
    } catch (err) {
      context.error("Roles function error:", err);
      return { jsonBody: { roles: [] } };
    }
  },
});
