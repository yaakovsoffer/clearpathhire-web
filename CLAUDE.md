# ClearPath Hire — Website

## Project Overview
Marketing website for ClearPath Hire (clearpathhire.com), a global staffing agency.
Hosted on Azure Static Web App (Free tier).
Repo: github.com/yaakovsoffer/clearpathhire-web

## Owner
Jacob Soffer — solo operator, prefers autonomous execution. Run tasks end-to-end without asking for confirmation at each step. Only stop if you hit a genuine blocker that requires a decision.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| UI | shadcn/ui + Tailwind CSS |
| API | Azure Functions (built into SWA, Node 18) |
| Email | Resend |
| ERP Integration | ClearPath ERP API (public + API key endpoints) |
| Hosting | Azure Static Web App (Free tier) |
| CI/CD | GitHub Actions (auto-deploy on push to main) |
| DNS | clearpathhire.com (GoDaddy) |

---

## API Layer

### GET /api/roles
- Fetches open positions from ERP: `GET {ERP_API_URL}/api/public/roles`
- Normalizes ERP camelCase fields to snake_case for frontend
- No authentication required (public ERP endpoint)
- Returns empty array on failure (frontend has hardcoded fallback list)

### POST /api/contact
- Receives contact form submissions
- Sends formatted email via Resend to team inbox
- Required env vars: RESEND_API_KEY, CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO

### POST /api/lead
- Receives job application form submissions
- Two parallel actions:
  1. Sends email notification via Resend
  2. Forwards to ERP: `POST {ERP_API_URL}/api/leads` with x-api-key header
- Surfaces 409 (duplicate) and 429 (rate limit) from ERP to user
- Never surfaces other ERP errors publicly — still returns 200
- Required env vars: ERP_API_URL, ERP_API_KEY, RESEND_API_KEY

### POST /api/upload-resume
- Accepts PDF/DOC/DOCX up to 5MB
- Stores file directly in Azure Blob Storage (container: "resumes")
- Returns `{ success: true, url: "..." }` with public blob URL
- Required env vars: AZURE_STORAGE_CONNECTION_STRING

---

## Azure Infrastructure

| Resource | Value |
|----------|-------|
| Subscription | ClearPath ERP (32e7fb5d-d13d-4376-811d-f4f3d5c68405) |
| Resource Group | clearpathops |
| SWA Name | clearpath-website |
| SWA Region | East US 2 |
| Preview URL | https://brave-glacier-0bf11090f.1.azurestaticapps.net |
| Live URL | https://clearpathhire.com |

---

## Environment Variables (Azure SWA App Settings)

| Variable | Purpose |
|----------|---------|
| RESEND_API_KEY | Resend email API key |
| CONTACT_EMAIL_FROM | From address for emails |
| CONTACT_EMAIL_TO | Team inbox recipient |
| ERP_API_URL | ClearPath ERP API base URL |
| ERP_API_KEY | API key for authenticated ERP endpoints |
| AZURE_STORAGE_CONNECTION_STRING | Azure Storage account connection string for resume uploads |

---

## Related Project
ClearPath ERP — separate repo: github.com/yaakovsoffer/clearpath-erp
ERP API docs: see /api/public/roles (no auth), /api/leads (API key), /api/upload-resume (API key)

---

## Key Principles
- Never surface backend errors to the public-facing site
- Keep /api/* functions lightweight — validate, call external service, return
- All secrets via environment variables — never hardcoded
- SPA routing handled in staticwebapp.config.json
- Resume files stored in ERP's Azure Blob Storage (not on the website)
