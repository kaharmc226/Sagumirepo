# Staging Deployment Guide — Sagumi (`OPS-10`)

This guide sets up **staging auto-deploys from the `dev` branch** across:
- **Render (Blueprint):** `sagumi-api-staging` (`apps/api`) and `sagumi-ai-staging` (`services/ai`) via [`render.yaml`](../render.yaml)
- **Vercel:** `apps/web` via [`apps/web/vercel.json`](../apps/web/vercel.json)
- **Supabase:** Already provisioned (PostgreSQL + private `payment-proofs` bucket)

---

## 1. Prerequisites

1. Merge the branch containing `render.yaml` and `apps/web/vercel.json` into **`dev`** on GitHub (`kaharmc226/Sagumirepo`).
2. Confirm your Supabase project already has [`apps/api/db/schema.sql`](../apps/api/db/schema.sql), [`apps/api/db/seed.sql`](../apps/api/db/seed.sql), and the private `payment-proofs` bucket set up (see [SETUP.md](SETUP.md)).

---

## 2. Deploy API + AI on Render (Blueprint)

1. In Render, create a **Project** (e.g. `Sagumi`) with a `staging` environment (or move the two services into the project right after Blueprint creation).
2. Click **New + → Blueprint**, connect `kaharmc226/Sagumirepo`, select branch **`dev`**, and apply [`render.yaml`](../render.yaml). This creates:
   - `sagumi-api-staging`
   - `sagumi-ai-staging`
3. Fill in the prompted `sync: false` environment variables:
   - **`sagumi-ai-staging`:**
     - `GEMINI_API_KEY` *(optional for first boot—chat falls back to local FAQ retrieval if left blank)*
     - `GEMINI_MODEL` *(enter a verified Gemini model ID for your key, e.g. `gemini-2.5-flash`)*
   - **`sagumi-api-staging`:**
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `JWT_SECRET` *(generate a long random secret string)*
     - `CORS_ORIGIN` = `http://localhost:5173` *(temporary until Vercel URL is created)*
     - `AI_SERVICE_URL` = `http://localhost:8000` *(temporary; update as soon as `sagumi-ai-staging` deploys)*
4. Wait for **`sagumi-ai-staging`** to finish its initial deploy, copy its URL (e.g. `https://sagumi-ai-staging.onrender.com`), and paste it into **`sagumi-api-staging` → Environment → `AI_SERVICE_URL`** (save to trigger a quick redeploy).

---

## 3. Deploy Web on Vercel

1. In Vercel, click **Add New… → Project** and import `kaharmc226/Sagumirepo`.
2. Set **Root Directory** to `apps/web` (Vercel automatically detects Vite, npm workspaces, and `apps/web/vercel.json`).
3. Add environment variable:
   - `VITE_API_BASE_URL` = `https://<sagumi-api-staging-url>/api/v1` *(no trailing slash)*
4. Deploy, and copy the resulting `https://<project>.vercel.app` URL.
5. Go to **Project Settings → Git → Production Branch** and set it to **`dev`** during the development phase (switch back to `main` in Sprint 4 / `OPS-12`).

---

## 4. Final CORS Wiring

1. Go back to **Render → `sagumi-api-staging` → Environment**.
2. Update `CORS_ORIGIN` to:
   ```text
   https://<project>.vercel.app,http://localhost:5173
   ```
3. Save changes (Render will automatically redeploy `sagumi-api-staging`).

---

## 5. Post-Deploy Verification Checklist

- [ ] `GET https://<ai-url>/health` returns `{"status":"ok",...}` (and `https://<ai-url>/docs` loads Swagger UI)
- [ ] `GET https://<api-url>/api/v1/health` returns `{"success":true,...}`
- [ ] `GET https://<api-url>/api/v1/products` returns the seeded products from Supabase
- [ ] Open `https://<web-url>` — catalog loads live products from Supabase *(first load may take 30–50s if Render was asleep)*
- [ ] Navigate to `/track` and hard-refresh — loads cleanly without a Vercel 404

---

## 6. Free-Tier Reminders

- **Render Free sleep:** Web services sleep after 15 minutes of inactivity and take ~30–50s to wake up. Hit `/health` and `/api/v1/health` before demos or testing.
- **Supabase Free pause:** Projects can pause after 7 days of inactivity—keep an eye on the Supabase dashboard between sprints.
- **AI service visibility:** On Render Free, `sagumi-ai-staging` has a public `onrender.com` URL. Remember to harden it with an internal API key header in `AI-10` before production (`OPS-12`).

