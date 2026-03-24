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
- Receives job application form submissions (multipart form data with optional resume file)
- Two parallel actions:
  1. Sends email notification via Resend (with resume attached if provided)
  2. Forwards to ERP: `POST {ERP_API_URL}/api/leads` with x-api-key header (JSON with resume_url)
- Surfaces 409 (duplicate) and 429 (rate limit) from ERP to user
- Never surfaces other ERP errors publicly — still returns 200
- Also accepts JSON body for backward compatibility
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

---

## ERP Integration Surface
The website calls exactly 2 ERP endpoints:
- `GET {ERP_API_URL}/api/public/roles` — list open roles (no auth)
- `POST {ERP_API_URL}/api/leads` — submit application with resume_url (API key auth)

The website does NOT call the ERP's `/api/upload-resume` endpoint. Resume uploads go directly from the website to Azure Blob Storage (`clearpatherpstorage/resumes` container) via the Azure REST API.

The `resume_url` in the ERP points to a private blob — the ERP has its own `GET /api/resumes/view` endpoint that generates time-limited SAS URLs for viewing.

---

## Application Submission Flow
1. User fills out form and attaches resume on the Apply page
2. On submit: website `/api/upload-resume` uploads file to `clearpatherpstorage/resumes` via Azure REST API → returns blob URL
3. Website `/api/lead` receives form data + resume file (multipart):
   - Sends email via Resend with resume **attached** (so Jacob can view from inbox)
   - Forwards lead to ERP `/api/leads` as JSON with `resume_url` field
4. ERP creates candidate record with resumeUrl

---

## Key Principles
- Never surface backend errors to the public-facing site
- Keep /api/* functions lightweight — validate, call external service, return
- All secrets via environment variables — never hardcoded
- SPA routing handled in staticwebapp.config.json
- Resume files stored in Azure Blob Storage (clearpatherpstorage/resumes), uploaded directly by the website
