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

      const response = await fetch(`${erpUrl}/api/roles`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": erpKey || "",
        },
      });

      if (!response.ok) {
        context.error(`ERP roles responded ${response.status}`);
        return { jsonBody: { roles: [] } };
      }

      const data = await response.json();
      return { jsonBody: { roles: data.roles || [] } };
    } catch (err) {
      context.error("Roles function error:", err);
      return { jsonBody: { roles: [] } };
    }
  },
});
