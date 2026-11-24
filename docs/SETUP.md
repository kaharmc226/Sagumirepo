# Local Setup — Sagumi (A26-CS277)

## Prerequisites

- Node.js 20+ and npm
- Python 3.11+ (for `services/ai`)
- Access to the team Supabase project (ask Kahar)

## 1. Clone and install

```bash
git clone https://github.com/kaharmc226/Sagumirepo.git
cd Sagumirepo
npm install
```

`npm install` at the root installs dependencies for every app in `apps/*`.

## 2. Environment variables

Copy `.env.example` to `.env` in the repo root and fill in the real values (get them from Kahar privately, never through the group chat or Git).

| Variable | Used by | Notes |
|---|---|---|
| `PORT`, `NODE_ENV`, `CORS_ORIGIN` | API | Defaults work locally |
| `JWT_SECRET`, `JWT_EXPIRES_IN` | API | Owner login |
| `SUPABASE_URL` | API | `https://<project-ref>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | API | Secret key (`sb_secret_...`), backend only |
| `SUPABASE_STORAGE_BUCKET` | API | `payment-proofs` |
| `AI_SERVICE_URL` | API | FastAPI base URL |
| `VITE_API_BASE_URL` | Web | Express base URL |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | AI | Backend only |
| `INTENT_CONFIDENCE_THRESHOLD` | API / AI | Default `0.6` |

## 3. Database (first time only)

Already done on the team Supabase project. For a fresh project:

1. Supabase Dashboard → **SQL Editor**.
2. Run [`apps/api/db/schema.sql`](../apps/api/db/schema.sql) and choose **Run and enable RLS**.
3. Run [`apps/api/db/seed.sql`](../apps/api/db/seed.sql).
4. Storage → create a **private** bucket named `payment-proofs`.

## 4. Run the services

**Express API**

```bash
npm run dev:api
```

Check: http://localhost:4000/api/v1/health and http://localhost:4000/api/v1/products

**Web (React + Vite)** — not scaffolded yet.

**AI service (FastAPI)** — not scaffolded yet.
