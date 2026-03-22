# ClearPath Hire — Phase 0 Audit

**Date:** 2026-03-22
**Auditor:** Claude (autonomous)
**Status:** Read-only audit — no code modified

---

## 1. Site Structure

### Pages (12 routes)

| Route | File | Purpose |
|-------|------|---------|
| `/` | Index.tsx | Homepage — hero, services preview, stats, CTA |
| `/about` | About.tsx | Company story, mission, vision, values |
| `/services` | Services.tsx | Detailed service offerings (7 categories) |
| `/team` | Team.tsx | Team member profiles |
| `/testimonials` | Testimonials.tsx | Client testimonials carousel |
| `/contact` | Contact.tsx | Contact form + company info |
| `/apply` | Apply.tsx | Job application form |
| `/client-login` | ClientLogin.tsx | Supabase auth login/signup |
| `/client-dashboard` | ClientDashboard.tsx | Protected — invoice management |
| `/payment` | Payment.tsx | Mock payment form (credit card + bank transfer) |
| `/google-business-guide` | GoogleBusinessGuide.tsx | Resource/lead magnet page |
| `*` | NotFound.tsx | 404 page |

### Sitemap (public)
7 pages listed in sitemap.xml: `/`, `/about`, `/team`, `/services`, `/testimonials`, `/contact`, `/apply`

---

## 2. Supabase Dependencies

### Client Initialization
- **File:** `src/integrations/supabase/client.ts`
- **Package:** `@supabase/supabase-js` v2.93.3
- **Project ID:** `lwjnbxnbakgsqqvaiqwt`
- **URL:** `https://lwjnbxnbakgsqqvaiqwt.supabase.co`
- **Features used:** localStorage persistence, auto-refresh tokens

### Authentication
- **File:** `src/hooks/useAuth.ts`
- **Methods:** signIn, signUp, signOut, session management
- **Auth state listener** with automatic session detection
- **Used by:** `ClientLogin.tsx`, `ProtectedRoute.tsx`, `ClientDashboard.tsx`

### Edge Functions (3)

| Function | File | Purpose | External Services |
|----------|------|---------|-------------------|
| `send-form-email` | `supabase/functions/send-form-email/index.ts` | Sends contact + application emails | Resend API |
| `crm-proxy` | `supabase/functions/crm-proxy/index.ts` | Proxies to external CRM (get-roles, submit-application) | CRM at `ewyaghobxwewdemloist.supabase.co` |
| `upload-resume` | `supabase/functions/upload-resume/index.ts` | Uploads resumes to Supabase Storage ("resumes" bucket) | Supabase Storage |

### Database
- **Types file:** `src/integrations/supabase/types.ts` — empty schema (no active tables)
- **Migration:** `supabase/migrations/20260225193444_*.sql` — initial schema exists but unused

### Supabase Config
- **File:** `supabase/config.toml` — project_id = `lwjnbxnbakgsqqvaiqwt`

---

## 3. Lovable Dependencies

| Item | Location | Notes |
|------|----------|-------|
| `lovable-tagger` v1.1.13 | `package.json` (devDependency) | Component tagging plugin |
| `componentTagger()` | `vite.config.ts` | Loaded in dev mode only |

---

## 4. Form Fields Catalog

### Contact Form (`src/pages/Contact.tsx`)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | text | Yes | max 100 chars |
| Email | email | Yes | email format |
| Company | text | No | max 100 chars |
| Phone | tel | No | max 30 chars, phone format |
| Message | textarea | Yes | max 2000 chars |

**Submission:** `supabase.functions.invoke("send-form-email")` with type "contact"

### Apply Form (`src/pages/Apply.tsx`)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | text | Yes | max 100 chars |
| Email | email | Yes | email format |
| Phone | tel | Yes | max 30 chars |
| Position | select | Yes | from CRM or fallback list |
| Years of Experience | select | Yes | 0-1, 1-3, 3-5, 5-10, 10+ |
| LinkedIn Profile | url | No | max 200 chars |
| About | textarea | Yes | max 2000 chars |
| Resume/CV | file | No | PDF/DOC/DOCX, max 5MB |

**Submissions:**
1. Email notification via `send-form-email`
2. CRM submission via `crm-proxy?action=submit-application`
3. Resume upload via `upload-resume` (if file attached)

### Client Login Form (`src/pages/ClientLogin.tsx`)

| Field | Type | Required |
|-------|------|----------|
| Email | email | Yes |
| Password | password | Yes |

**Auth:** Supabase Auth (signIn / signUp toggle)

### Payment Form (`src/pages/Payment.tsx`)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Amount | number | Yes | USD |
| Cardholder Name | text | Yes | — |
| Card Number | text | Yes | 16-19 digits, formatted |
| Expiry | text | Yes | MM/YY format |
| CVC | text | Yes | 3-4 digits |

**Status:** Mock implementation (2-second timeout simulation, no real processing)

---

## 5. API Calls Catalog

### Frontend → Supabase Functions

| Source File | Target | Method | Purpose |
|-------------|--------|--------|---------|
| `Contact.tsx` | `supabase.functions.invoke("send-form-email")` | POST | Send contact email |
| `Apply.tsx` | `supabase.functions.invoke("send-form-email")` | POST | Send application email |
| `Apply.tsx` | `{SUPABASE_URL}/functions/v1/crm-proxy?action=get-roles` | GET | Fetch open positions |
| `Apply.tsx` | `supabase.functions.invoke("crm-proxy?action=submit-application")` | POST | Submit to CRM |
| `Apply.tsx` | `{SUPABASE_URL}/functions/v1/upload-resume` | POST | Upload resume file |

### Edge Function → External Services

| Function | Target | Purpose |
|----------|--------|---------|
| `send-form-email` | Resend API (`https://api.resend.com/emails`) | Send emails |
| `crm-proxy` | `https://ewyaghobxwewdemloist.supabase.co/functions/v1` | CRM operations |
| `upload-resume` | Supabase Storage (resumes bucket) | File storage |

### Headers for Supabase Function Calls
```
Authorization: Bearer {VITE_SUPABASE_PUBLISHABLE_KEY}
apikey: {VITE_SUPABASE_PUBLISHABLE_KEY}
Content-Type: application/json
```

---

## 6. Email Templates

### Contact Email
- **From:** `ClearPath Hire <noreply@send.clearpathhire.com>`
- **To:** `info@clearpathhire.com`
- **Subject:** `New Contact Form Submission from {Name}`
- **Body:** HTML table with Name, Email, Company, Phone, Message

### Application Email
- **From:** `ClearPath Hire <noreply@send.clearpathhire.com>`
- **To:** `info@clearpathhire.com`
- **Subject:** `New Job Application from {Name} - {Position}`
- **Body:** HTML table with Name, Email, Phone, Position, Experience, LinkedIn, About, Resume URL

---

## 7. Environment Variables

### Frontend (.env)
| Variable | Value | Used In |
|----------|-------|---------|
| `VITE_SUPABASE_PROJECT_ID` | `lwjnbxnbakgsqqvaiqwt` | client.ts |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbG...` (anon key) | client.ts |
| `VITE_SUPABASE_URL` | `https://lwjnbxnbakgsqqvaiqwt.supabase.co` | client.ts, Apply.tsx |

### Edge Function Env Vars (server-side)
| Variable | Used In | Purpose |
|----------|---------|---------|
| `RESEND_API_KEY` | send-form-email | Resend email API |
| `CRM_API_KEY` | crm-proxy | CRM authentication |
| `SUPABASE_URL` | upload-resume | Auto-provided by runtime |
| `SUPABASE_SERVICE_ROLE_KEY` | upload-resume | Auto-provided for storage |

---

## 8. Analytics
- **Flock** (self-hosted): `clearpathhire.com/~flock.js`, proxy at `/~api/analytics`
- Loaded via `<script defer>` in index.html

---

## 9. Key Dependencies (package.json)

### Production
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | UI library |
| `react-router-dom` | ^6.30.1 | Client-side routing |
| `@supabase/supabase-js` | ^2.93.3 | **TO REMOVE** — Supabase client |
| `@tanstack/react-query` | ^5.83.0 | Data fetching |
| `zod` | ^3.25.76 | Schema validation |
| `react-hook-form` | ^7.61.1 | Form management |
| `framer-motion` | ^12.23.26 | Animations |
| `lucide-react` | ^0.462.0 | Icons |
| `sonner` | ^1.7.4 | Toast notifications |
| `recharts` | ^2.15.4 | Charts (minimal usage) |
| `tailwindcss` | ^3.4.17 | CSS framework |
| Radix UI packages | various | UI primitives (shadcn) |

### Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^5.4.19 | Build tool |
| `typescript` | ^5.8.3 | Type checking |
| `lovable-tagger` | ^1.1.13 | **TO REMOVE** — Lovable plugin |

---

## 10. Files That Need Changes (Phase 1 Targets)

### Supabase Removal Targets
| File | What to Change |
|------|----------------|
| `src/integrations/supabase/client.ts` | Remove entirely |
| `src/integrations/supabase/types.ts` | Remove entirely |
| `src/hooks/useAuth.ts` | Remove entirely (or replace with simple auth) |
| `src/pages/Contact.tsx` | Replace `supabase.functions.invoke()` with `fetch("/api/contact")` |
| `src/pages/Apply.tsx` | Replace all Supabase calls with `fetch("/api/lead")` + direct upload |
| `src/pages/ClientLogin.tsx` | Remove Supabase auth (defer client portal) |
| `src/pages/ClientDashboard.tsx` | Remove Supabase auth dependency |
| `src/components/ProtectedRoute.tsx` | Remove Supabase auth dependency |
| `supabase/` directory | Remove entirely |
| `.env` | Replace Supabase vars with Azure-appropriate vars |
| `package.json` | Remove `@supabase/supabase-js`, `lovable-tagger` |

### Lovable Removal Targets
| File | What to Change |
|------|----------------|
| `vite.config.ts` | Remove `lovable-tagger` import and `componentTagger()` plugin |
| `package.json` | Remove `lovable-tagger` from devDependencies |

### New Files Needed (Phase 2)
| File | Purpose |
|------|---------|
| `api/contact.js` | Azure Function — receives form POST, calls Resend |
| `api/lead.js` | Azure Function — receives form POST, forwards to ERP |
| `staticwebapp.config.json` | SPA routing + /api/* rules |

---

## 11. Migration Risk Notes

1. **Client Portal (login/dashboard/payment)** — currently uses Supabase Auth. No Azure replacement planned yet. Consider deferring these pages or removing them during Phase 1.
2. **Resume Upload** — uses Supabase Storage. Will need Azure Blob Storage or alternative in Phase 2.
3. **CRM Proxy** — currently proxies through Supabase Edge Function to an external Supabase project. Phase 2 `api/lead.js` should call the ERP API directly instead.
4. **Analytics (Flock)** — appears self-hosted on current Lovable deployment. May break after migration. Investigate if Flock config needs updating.
5. **Payment Form** — mock only, no real integration. Safe to keep as-is or remove.
6. **Open Positions List** — fetched from CRM via `crm-proxy`. Phase 2 `api/lead.js` or a new function should handle this, or hardcode a fallback list.
