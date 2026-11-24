# Architecture — Sagumi (A26-CS277)

## Stack

| Layer | Tech | Folder | Deploy |
|---|---|---|---|
| Frontend | React 18 + Vite + Tailwind + shadcn/ui + React Router + Axios + Recharts | `apps/web` | Vercel |
| Backend | Node.js + Express (`/api/v1`) + Joi + JWT | `apps/api` | Render |
| Database & Storage | Supabase (PostgreSQL + private bucket `payment-proofs`) | `apps/api/db` (SQL) | Supabase |
| AI Service | Python + FastAPI + scikit-learn + FAISS + Gemini API | `services/ai` | Render |

## System overview

```text
Browser (React + Vite)
        │  Axios (JSON, JWT for Owner)
        ▼
Express API  /api/v1  ◄────►  Supabase (Postgres + Storage)
        │  internal HTTP
        ▼
FastAPI AI Service  ──►  Gemini API + FAISS
```

**Responsibilities**

- **Express** is the only gateway for business data (CRUD, auth, validation). The browser never calls Supabase or Gemini directly.
- **FastAPI** only serves AI (intent classification, RAG + Gemini chat, stock forecast). It is stateless and is called only by Express.
- **Supabase** is the source of truth for data and file storage.

## Main flows

1. **Order:** choose products → upload payment proof (`POST /uploads/payment-proof`) → `POST /orders` (server recalculates totals, generates `reference_code`) → customer receives Reference ID.
2. **Tracking:** `GET /orders/track/:referenceCode` → returns safe fields only (no phone/address).
3. **Chatbot:** `POST /chat` → Express loads the last 6 messages → FastAPI `/classify-intent` → `keluhan` (confidence ≥ 0.6) gets a template reply pointing to the Owner; everything else goes to FastAPI `/chat` (RAG + Gemini) → both messages saved to `chat_messages`.
4. **Owner dashboard:** JWT login → FIFO order queue (`created_at ASC`) → verify payment → update status → analytics & stock forecast.

## Database (Supabase)

Defined in [`apps/api/db/schema.sql`](../apps/api/db/schema.sql), seeded by [`apps/api/db/seed.sql`](../apps/api/db/seed.sql). RLS is enabled on all tables; Express uses the secret key, which bypasses RLS.

| Table | Purpose |
|---|---|
| `products` | Catalog |
| `orders` | Customer orders, `reference_code` unique |
| `order_items` | Line items with product name/price snapshot |
| `order_status_history` | Status change log |
| `chat_messages` | Chatbot history per `session_id` |
| `faqs` | Knowledge base for RAG |
| `owner_users` | Owner login |

**Order status flow**

```text
MENUNGGU_KONFIRMASI ──► DIPROSES ──► SIAP_DIKIRIM ──► SELESAI
        │                  │
        └──► DIBATALKAN ◄──┘
```

## Security rules

- Secrets (Supabase secret key, Gemini key, JWT secret) live only in backend `.env` files, never in the frontend or Git.
- Order totals are always recalculated on the server.
- Payment proofs live in a private bucket; the Owner views them through short-lived signed URLs.
- CORS is restricted to the frontend domain; `/chat` is rate limited.

See [API_CONTRACT.md](API_CONTRACT.md) for every endpoint and payload.
