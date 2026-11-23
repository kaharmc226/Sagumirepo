# Sagumi — Sistem Katalog, Pemesanan, Antrian FIFO & Asisten AI (A26-CS277)

Capstone Project **Asah 2026 (Dicoding × GoTo)** untuk UMKM **Sagumi** (cemilan/oleh-oleh berbahan sagu khas Kendari).

> **Judul Use Case:** Optimalisasi Layanan Informasi Produk dan Pengelolaan Antrian Pesanan Pelanggan pada UMKM Sagumi

## Arsitektur & Tech Stack

- **Frontend (`apps/web`):** React 18 + Vite + Tailwind CSS + shadcn/ui + React Router + Axios + Recharts *(deploy: Vercel)*
- **Backend (`apps/api`):** Node.js + Express (`/api/v1`) + Joi + JWT *(deploy: Render)*
- **Database & Storage:** Supabase (PostgreSQL + Storage bucket privat `payment-proofs`)
- **AI & Data Science Service (`services/ai`):** Python + FastAPI + scikit-learn (TF-IDF + LinearSVC/LogisticRegression) + FAISS (RAG) + Gemini API *(deploy: Render)*

```text
Browser (React + Vite) ──► Express API (/api/v1) ◄──► Supabase (Postgres + Storage)
                                  │
                                  ▼ HTTP internal
                           FastAPI AI Service ──► Gemini API + FAISS
```

## Struktur Monorepo

```text
Sagumirepo/
├─ apps/
│  ├─ web/                 # Frontend React + Vite
│  └─ api/                 # Backend Express API
├─ services/
│  └─ ai/                  # FastAPI, training model intent, RAG, prompt, notebooks DS
├─ docs/
│  └─ API_CONTRACT.md      # Kontrak API v1 (Publik, Owner/Admin, FastAPI internal)
├─ .env.example            # Template environment variables
├─ package.json            # Root scripts
└─ pnpm-workspace.yaml     # Workspace apps/*
```

## Dokumentasi Teknis

- [API Contract v1](docs/API_CONTRACT.md)

## Setup Lokal (Ringkas)

1. Salin `.env.example` menjadi `.env` di masing-masing service atau root, lalu isi kredensial Supabase & Gemini API.
2. Install dependensi workspace Node.js:
   ```bash
   pnpm install
   ```
3. Setup environment Python untuk `services/ai` (FastAPI) menggunakan `.venv`.

## Tim A26-CS277

| Anggota | Learning Path | Peran Utama |
|---|---|---|
| Kahar Munajat | FS | Backend, REST API, integrasi, deployment (Leader) |
| Annisa Nur Fitriani | FS | Frontend, UI/UX, chat widget, User Guide |
| Fatih M. Bintang Possumah | DS | Preprocessing dataset, pelabelan intent, forecast stok |
| Rezki Alya Pasrun | DS | Data wrangling, EDA, analisis tren & visualisasi bisnis |
| Mochammad Raffi Fadhillah | AE | Model intent (`training/`, `models/`), evaluasi, RAG |
| M. Al-Fath Nazriel Rajab | AE | Chatbot Gemini, prompt & guardrail, FastAPI serving/deploy |
