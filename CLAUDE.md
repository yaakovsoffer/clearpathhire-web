# ClearPath Hire — Website

## Project Overview
Marketing website for ClearPath Hire (clearpathhire.com), a global staffing agency.
Being migrated from Lovable to Azure Static Web App (Free tier).
Repo: github.com/yaakovsoffer/clearpathhire

## Owner
Jacob Soffer — solo operator, prefers autonomous execution. Run tasks end-to-end without asking for confirmation at each step. Only stop if you hit a genuine blocker that requires a decision.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite (exported from Lovable) |
| API | Azure Functions (built into SWA) |
| Email | Resend |
| ERP Hook | POST to ClearPath ERP API |
| Hosting | Azure Static Web App (Free tier) |
| CI/CD | GitHub Actions |
| DNS | clearpathhire.com |

---

## Migration Strategy

**Order: Migrate 1:1 first → then makeover (Phase 4)**
Do not redesign anything during migration. Get a clean working copy on Azure first, then refresh design afterward.

### Phases

**Phase 0 — Audit & Prep** ← Start here on first session
- Screenshot live site at https://clearpathhire.com (all pages/sections)
- Read all source files, catalog every Supabase/Lovable dependency
- Catalog all form fields, email templates, API calls, env vars
- Document findings in AUDIT.md at repo root
- Do not modify any code in Phase 0 — read only

**Phase 1 — Strip & Clean**
- Remove all Supabase client imports and calls
- Remove Lovable-specific config, metadata, plugins
- Replace any Supabase form submissions with local state + fetch to /api/*
- Verify: npm run build passes cleanly
- Commit clean baseline to main

**Phase 2 — API Functions**
- Create api/contact.js — receives form POST, calls Resend, sends email to team inbox
- Create api/lead.js — receives form POST, forwards to ERP API as a new lead
- Create staticwebapp.config.json with SPA routing + /api/* rules
- Test locally with SWA CLI: npx @azure/static-web-apps-cli start
- Wire all frontend forms to new /api/* endpoints

**Phase 3 — Deploy & Wire**
- Create Azure Static Web App resource: clearpath-website (RG: clearpathops, East US)
- Wire GitHub Actions CI/CD using SWA deployment token
- Add GitHub secrets (see Secrets section below)
- Deploy and smoke test on Azure preview URL
- Add clearpathhire.com as custom domain in Azure portal
- DNS cutover (lower TTL first, then update CNAME)

**Phase 4 — Makeover (later, separate session)**
- Design refresh, copy updates, new sections
- SEO, performance, mobile audit
- Do not start this until Phase 3 is confirmed stable

---

## API Layer

### /api/contact.js
- Triggered by contact form submissions
- Calls Resend to send formatted email to team inbox
- Required secrets: RESEND_API_KEY, CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO
- Returns 200 OK or structured error

### /api/lead.js
- Triggered by staffing inquiry / job application forms
- POSTs structured data to ClearPath ERP API endpoint: POST /api/leads
- Required secrets: ERP_API_URL, ERP_API_KEY
- On ERP failure: log error, still return 200 to visitor (never surface ERP errors publicly)
- ERP_API_URL = https://clearpath-erp-api-a3gggpbbf4ebeecz.centralus-01.azurewebsites.net

---

## Azure Infrastructure

| Resource | Value |
|----------|-------|
| Subscription | ClearPath ERP (32e7fb5d-d13d-4376-811d-f4f3d5c68405) |
| Resource Group | clearpathops |
| Region | East US |
| SWA Resource Name | clearpath-website (to be created) |
| Live URL | https://clearpathhire.com |

---

## GitHub Secrets Needed

| Secret | Purpose |
|--------|---------|
| AZURE_STATIC_WEB_APPS_API_TOKEN | SWA deployment token |
| RESEND_API_KEY | Resend email API |
| CONTACT_EMAIL_FROM | From address for contact emails |
| CONTACT_EMAIL_TO | Team inbox recipient |
| ERP_API_URL | ClearPath ERP base URL |
| ERP_API_KEY | Shared secret header for ERP webhook |

---

## Related Project
ClearPath ERP — separate repo: github.com/yaakovsoffer/clearpath-erp
The ERP needs a corresponding inbound endpoint built: POST /api/leads
That is a separate task tracked in the ERP repo.

---

## Key Principles
- Never surface backend errors to the public-facing site
- Keep /api/* functions lightweight — validate, call external service, return
- All secrets via environment variables — never hardcoded
- SPA routing must be handled in staticwebapp.config.json (not in Vite config)
- Commit frequently with clear messages scoped to the phase (e.g. "phase1: remove supabase deps")
