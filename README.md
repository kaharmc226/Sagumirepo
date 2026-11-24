# Sagumi — Katalog, Pemesanan, Antrian FIFO & Asisten AI (A26-CS277)

Capstone Project **Asah 2026 (Dicoding × GoTo)** untuk UMKM **Sagumi**, cemilan/oleh-oleh berbahan sagu khas Kendari.

> **Use case:** Optimalisasi Layanan Informasi Produk dan Pengelolaan Antrian Pesanan Pelanggan pada UMKM Sagumi

**Stack:** React + Vite · Express · FastAPI · Supabase · Gemini API

## Quick start

```bash
npm install
cp .env.example .env   # fill in real values
npm run dev:api        # http://localhost:4000/api/v1/health
```

Full instructions: [docs/SETUP.md](docs/SETUP.md)

## Repository structure

```text
Sagumirepo/
├─ apps/
│  ├─ api/            # Express API + DB schema/seed (apps/api/db)
│  └─ web/            # React + Vite frontend
├─ services/
│  └─ ai/             # FastAPI, intent model, RAG, prompts, DS notebooks
├─ docs/              # Project documentation
├─ .env.example
└─ package.json       # npm workspaces
```

## Documentation

| Doc | Contents |
|---|---|
| [SETUP.md](docs/SETUP.md) | Local setup, env variables, running services |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, system flow, database, security rules |
| [API_CONTRACT.md](docs/API_CONTRACT.md) | All endpoints, payloads and error codes |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | Module ownership, branches, commits, PRs |
| [TASKS.md](docs/TASKS.md) | Sprint 0–4 checklist, owners, and DoD |

## Team A26-CS277

| Member | Path | Role |
|---|---|---|
| Kahar Munajat | FS | Backend, REST API, integration, deployment (Leader) |
| Annisa Nur Fitriani | FS | Frontend, UI/UX, chat widget, User Guide |
| Fatih M. Bintang Possumah | DS | Dataset preprocessing, intent labeling, stock forecast |
| Rezki Alya Pasrun | DS | Data wrangling, EDA, sales trend analysis |
| Mochammad Raffi Fadhillah | AE | Intent model, evaluation, RAG |
| M. Al-Fath Nazriel Rajab | AE | Gemini chatbot, prompts & guardrails, FastAPI serving |

*FS = Full-Stack · DS = Data Science · AE = AI Engineer*
