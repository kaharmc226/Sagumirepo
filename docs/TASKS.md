# Tasks & Sprint Checklist — Sagumi (A26-CS277)

> Master spreadsheet-style checklist for **Sprint 0–4**.
> Check off (`[x]`) only when the **Definition of Done (DoD)** is met and merged into `dev`.
> Branch convention: `feat/<id>-<slug>` (see [CONTRIBUTING.md](CONTRIBUTING.md)).

---

## Sprint 0 — Fondasi (before 19 Nov)

| Done | ID | Task | PIC | Depends | Details |
|---|---|---|---|---|---|
| `[x]` | `OPS-01` | Finalisasi & submit Project Plan + fakta integritas | Kahar | — | [View](#ops-01) |
| `[x]` | `OPS-02` | Isi logbook Checkpoint 1 | Semua | — | [View](#ops-02) |
| `[ ]` | `OPS-03` | Ajukan request advisor | Kahar | `OPS-01` | [View](#ops-03) |
| `[x]` | `OPS-04` | Setup monorepo GitHub + branch rules + README skeleton | Kahar | — | [View](#ops-04) |
| `[x]` | `OPS-05` | Kontrak API v1 (`API_CONTRACT.md`, FS↔AE↔DS) | Kahar / Al-Fath / Raffi | — | [View](#ops-05) |
| `[x]` | `OPS-06` | Mockup web interaktif di `apps/web`: katalog, checkout, tracking, dashboard | Kahar / Annisa | — | [View](#ops-06) |
| `[ ]` | `OPS-07` | Minta data penjualan + katalog + FAQ ke Owner | Rezki / Kahar | — | [View](#ops-07) |
| `[x]` | `OPS-08` | Setup Supabase (DB + bucket `payment-proofs`) | Kahar | — | [View](#ops-08) |
| `[x]` | `OPS-09` | Skeleton FastAPI + `/health` + OpenAPI docs | Al-Fath | — | [View](#ops-09) |
| `[ ]` | `OPS-10` | Pipeline deploy awal (Vercel + Render) | Kahar | `OPS-04` | [View](#ops-10) |

---

## Sprint 1 — Fondasi Teknis & Data (19–25 Nov)

> **Milestone:** Katalog live dari DB, intent model v1, basis analytics siap.

| Done | ID | Task | PIC | Depends | Details |
|---|---|---|---|---|---|
| `[x]` | `FE-01` | Setup React + Vite + Tailwind + shadcn, routing, layout | Annisa | `OPS-06` | [View](#fe-01) |
| `[x]` | `FE-02` | Komponen dasar: button, input, card, toast, loader | Annisa | `FE-01` | [View](#fe-02) |
| `[x]` | `FE-03` | Halaman katalog + detail produk (mock → API) | Annisa | `BE-03` | [View](#fe-03) |
| `[x]` | `BE-01` | Setup Express + struktur + error middleware + CORS + Joi | Kahar | `OPS-05` | [View](#be-01) |
| `[x]` | `BE-02` | Skema DB + seed katalog | Kahar | `OPS-08` | [View](#be-02) |
| `[x]` | `BE-03` | `GET /api/v1/products` & `/:slug` | Kahar | `BE-02` | [View](#be-03) |
| `[ ]` | `DS-01` | Ekstraksi & wrangling data penjualan | Rezki | `OPS-07` | [View](#ds-01) |
| `[ ]` | `DS-02` | Pertanyaan bisnis + data dictionary | Rezki | `DS-01` | [View](#ds-02) |
| `[ ]` | `DS-03` | Agregasi harian (analytics & forecast basis) | Fatih | `DS-01` | [View](#ds-03) |
| `[ ]` | `DS-04` | Dataset intent (≥4 kelas) + augmentasi + split | Fatih | `OPS-07` | [View](#ds-04) |
| `[ ]` | `AI-01` | Eksperimen intent: LinearSVC vs LogReg | Raffi | `DS-04` | [View](#ai-01) |
| `[x]` | `AI-02` | FastAPI `/classify-intent` + docs | Al-Fath | `AI-01`, `OPS-09` | [View](#ai-02) |
| `[ ]` | `AI-03` | Prompt template chatbot + knowledge base FAQ | Al-Fath | `OPS-07` | [View](#ai-03) |
| `[ ]` | `AI-04` | Integrasi Gemini dasar via FastAPI `/chat` | Al-Fath | `AI-03`, `OPS-09` | [View](#ai-04) |

---

## Sprint 2 — Alur Pelanggan End-to-End (26 Nov–2 Des)

> **Milestone:** Pelanggan bisa memesan, upload bukti, dapat ID, tracking; chatbot v1 aktif.

| Done | ID | Task | PIC | Depends | Details |
|---|---|---|---|---|---|
| `[ ]` | `BE-04` | Upload bukti bayar ke Supabase Storage + validasi | Kahar | `OPS-08` | [View](#be-04) |
| `[ ]` | `BE-05` | `POST /api/v1/orders` (Joi, hitung server, `reference_code`) | Kahar | `BE-03`, `BE-04` | [View](#be-05) |
| `[ ]` | `BE-06` | `GET /orders/track/:code` (field aman saja) | Kahar | `BE-05` | [View](#be-06) |
| `[ ]` | `FE-04` | Form checkout + ringkasan harga + validasi client | Annisa | `BE-05` | [View](#fe-04) |
| `[ ]` | `FE-05` | Upload bukti bayar + state proses/berhasil/gagal | Annisa | `BE-04` | [View](#fe-05) |
| `[ ]` | `FE-06` | Halaman sukses (ID Referensi) + halaman tracking | Annisa | `BE-06` | [View](#fe-06) |
| `[ ]` | `AI-05` | Refine model intent v2 (class balance, hyperparameter) | Raffi | `AI-02` | [View](#ai-05) |
| `[ ]` | `FE-10` | Chat widget UI (state, render jawaban, error/loading) | Annisa | `OPS-05`, `FE-02` | [View](#fe-10) |
| `[ ]` | `AI-06` | Endpoint `/api/v1/chat` (Express → FastAPI) + intent routing | Al-Fath | `AI-04`, `BE-01` | [View](#ai-06) |
| `[ ]` | `AI-07` | Guardrail refusal + uji ≥10 out-of-context | Al-Fath | `AI-06` | [View](#ai-07) |
| `[ ]` | `DS-05` | Rekomendasi bisnis awal dari data | Rezki | `DS-02` | [View](#ds-05) |
| `[ ]` | `QA-00` | Uji integrasi katalog → checkout → tracking | Annisa / Kahar | `FE-06` | [View](#qa-00) |

---

## Sprint 3 — Dashboard Owner & Integrasi Penuh (3–9 Des)

> **Milestone:** Seluruh alur utama terhubung & berjalan di staging.

| Done | ID | Task | PIC | Depends | Details |
|---|---|---|---|---|---|
| `[ ]` | `BE-07` | Auth JWT login Owner + proteksi route admin | Kahar | `BE-01` | [View](#be-07) |
| `[ ]` | `BE-08` | Admin orders: list FIFO, filter, detail, `PATCH status` + history | Kahar | `BE-05`, `BE-07` | [View](#be-08) |
| `[ ]` | `BE-09` | Analytics endpoints (summary, sales-trend) | Kahar | `DS-03` | [View](#be-09) |
| `[ ]` | `FE-07` | Halaman login Owner | Annisa | `BE-07` | [View](#fe-07) |
| `[ ]` | `FE-08` | Dashboard antrian (list, detail, preview bukti, update status) | Annisa | `BE-08` | [View](#fe-08) |
| `[ ]` | `FE-09` | Chart Recharts + halaman analytics + filter tanggal/produk | Annisa | `BE-09` | [View](#fe-09) |
| `[ ]` | `AI-09` | RAG: embedding katalog/FAQ + FAISS + integrasi `/chat` | Raffi | `AI-06`, `AI-03` | [View](#ai-09) |
| `[ ]` | `AI-10` | Deploy & hardening service FastAPI (classify + chat) | Al-Fath | `AI-02`, `AI-06` | [View](#ai-10) |
| `[ ]` | `DS-06` | Model forecast stok (MA vs regresi) + MAE/RMSE | Fatih | `DS-03` | [View](#ds-06) |
| `[ ]` | `DS-07` | Integrasi forecast → endpoint + chart | Fatih / Kahar | `DS-06`, `BE-09` | [View](#ds-07) |
| `[ ]` | `DS-08` | Analisis tren final + rekomendasi | Rezki | `DS-05` | [View](#ds-08) |
| `[ ]` | `OPS-11` | Integrasi FE–BE–AI end-to-end (staging) | Semua | All | [View](#ops-11) |

---

## Sprint 4 — Uji, Perbaiki, Deploy, Dokumentasi (10–16 Des)

> **Milestone:** Aplikasi ter-deploy, teruji, terdokumentasi, demo & feedback UMKM selesai.

| Done | ID | Task | PIC | Depends | Details |
|---|---|---|---|---|---|
| `[ ]` | `QA-01` | Uji E2E sesuai checklist | Semua | `OPS-11` | [View](#qa-01) |
| `[ ]` | `QA-02` | Uji input invalid, upload salah, AI down | Kahar / Annisa | `QA-01` | [View](#qa-02) |
| `[ ]` | `QA-03` | Uji responsif HP & desktop | Annisa | `QA-01` | [View](#qa-03) |
| `[ ]` | `QA-04` | Uji relevansi chatbot + refusal | Al-Fath | `AI-09` | [View](#qa-04) |
| `[ ]` | `QA-05` | Verifikasi angka analytics/forecast vs DB | Rezki / Fatih | `FE-09` | [View](#qa-05) |
| `[ ]` | `BE-10` | Hardening: rate limit chat, validasi tambahan, CORS produksi | Kahar | `QA-02` | [View](#be-10) |
| `[ ]` | `OPS-12` | Deploy final + env produksi | Kahar | `QA-01` | [View](#ops-12) |
| `[ ]` | `OPS-13` | README lengkap (arsitektur, API, model, data, design rationale) | Kahar (koord.) | All | [View](#ops-13) |
| `[ ]` | `OPS-14` | User Guide Owner | Annisa | `FE-08` | [View](#ops-14) |
| `[ ]` | `OPS-15` | Skenario demo + sesi demo UMKM + catat feedback | Kahar | `OPS-12` | [View](#ops-15) |
| `[ ]` | `OPS-16` | Isi logbook Checkpoint 3 | Semua | — | [View](#ops-16) |

---

## Optional / Side Quest (only if Sprint 3 finishes early)

| Done | ID | Task | PIC | Depends | Details |
|---|---|---|---|---|---|
| `[ ]` | `AI-11` | Model sentimen keluhan (≥2 kelas) | Raffi | `AI-05` | [View](#ai-11) |
| `[ ]` | `AI-12` | Eksperimen SLM/LLM open-source lokal untuk generation | Al-Fath | `AI-09` | [View](#ai-12) |

---

## Task Details & Definition of Done (DoD)

### Sprint 0

#### OPS-01
- **Task:** Finalisasi & submit Project Plan + fakta integritas
- **PIC:** Kahar (leader)
- **DoD:** Ter-submit sebelum 15 Nov 23:59

#### OPS-02
- **Task:** Isi logbook Checkpoint 1
- **PIC:** Semua
- **DoD:** Semua anggota terisi

#### OPS-03
- **Task:** Ajukan request advisor
- **PIC:** Kahar (leader) | **Depends:** `OPS-01`
- **DoD:** Form terkirim

#### OPS-04
- **Task:** Setup monorepo GitHub + branch rules + README skeleton
- **PIC:** Kahar
- **DoD:** Repo siap, branch `main`/`dev` & rules aktif, README tersedia

#### OPS-05
- **Task:** Kontrak API v1 (FS↔AE↔DS)
- **PIC:** Kahar / Al-Fath / Raffi
- **DoD:** `docs/API_CONTRACT.md` disetujui 3 track

#### OPS-06
- **Task:** Mockup web interaktif di `apps/web`: katalog, checkout, tracking, dashboard owner + login + analytics (menggantikan Figma)
- **PIC:** Kahar / Annisa
- **DoD:** Halaman mockup berjalan di `apps/web` (`npm run dev:web`)

#### OPS-07
- **Task:** Minta data penjualan + katalog + FAQ ke Owner
- **PIC:** Rezki / Kahar
- **DoD:** Data/hasil wawancara terdokumentasi

#### OPS-08
- **Task:** Setup Supabase (DB + bucket `payment-proofs`)
- **PIC:** Kahar
- **DoD:** Koneksi & env tersimpan aman

#### OPS-09
- **Task:** Skeleton FastAPI + `/health` + OpenAPI docs
- **PIC:** Al-Fath | **Suggested branch:** `feat/OPS-09-fastapi-skeleton`
- **DoD:** Service jalan lokal, `/docs` terbuka

#### OPS-10
- **Task:** Pipeline deploy awal (Vercel + Render)
- **PIC:** Kahar | **Depends:** `OPS-04`
- **DoD:** URL staging aktif

### Sprint 1

#### FE-01
- **Task:** Setup React + Vite + Tailwind + shadcn, routing, layout
- **PIC:** Annisa | **Depends:** `OPS-06` | **Suggested branch:** `feat/FE-01-init-web-shell`
- **DoD:** App jalan (`npm run dev:web`), navigasi dasar OK

#### FE-02
- **Task:** Komponen dasar: button, input, card, toast, loader
- **PIC:** Annisa | **Depends:** `FE-01` | **Suggested branch:** `feat/FE-02-ui-primitives`
- **DoD:** Daftar komponen siap pakai

#### FE-03
- **Task:** Halaman katalog + detail produk (mock → API)
- **PIC:** Annisa | **Depends:** `BE-03` | **Suggested branch:** `feat/FE-03-catalog-page`
- **DoD:** Data dari `GET /api/v1/products` tampil rapi

#### BE-01
- **Task:** Setup Express + struktur + error middleware + CORS + Joi
- **PIC:** Kahar | **Depends:** `OPS-05` | **Suggested branch:** `feat/BE-01-express-setup`
- **DoD:** Server jalan, error konsisten

#### BE-02
- **Task:** Skema DB + seed katalog
- **PIC:** Kahar | **Depends:** `OPS-08` | **Suggested branch:** `feat/BE-02-db-schema-seed`
- **DoD:** Tabel + data produk masuk Supabase

#### BE-03
- **Task:** `GET /api/v1/products` & `/:slug`
- **PIC:** Kahar | **Depends:** `BE-02` | **Suggested branch:** `feat/BE-03-products-api`
- **DoD:** Response sesuai `docs/API_CONTRACT.md`

#### DS-01
- **Task:** Ekstraksi & wrangling data penjualan
- **PIC:** Rezki | **Depends:** `OPS-07` | **Suggested branch:** `feat/DS-01-sales-wrangling`
- **DoD:** Dataset bersih + notebook di `services/ai/notebooks`

#### DS-02
- **Task:** Pertanyaan bisnis + data dictionary
- **PIC:** Rezki | **Depends:** `DS-01` | **Suggested branch:** `docs/DS-02-data-dictionary`
- **DoD:** `data_dictionary.md` lengkap

#### DS-03
- **Task:** Agregasi harian (analytics & forecast basis)
- **PIC:** Fatih | **Depends:** `DS-01` | **Suggested branch:** `feat/DS-03-daily-aggregation`
- **DoD:** Tabel/CSV agregat siap dipakai BE & forecast

#### DS-04
- **Task:** Dataset intent (≥4 kelas) + augmentasi + split
- **PIC:** Fatih | **Depends:** `OPS-07` | **Suggested branch:** `feat/DS-04-intent-dataset`
- **DoD:** 150–300 contoh terlabel, split train/test 80/20 tanpa leakage

#### AI-01
- **Task:** Eksperimen intent: LinearSVC vs LogReg
- **PIC:** Raffi | **Depends:** `DS-04` | **Suggested branch:** `feat/AI-01-intent-baseline`
- **DoD:** Tabel akurasi/F1 + alasan pemilihan model

#### AI-02
- **Task:** FastAPI `/classify-intent` + docs
- **PIC:** Al-Fath | **Depends:** `AI-01`, `OPS-09` | **Suggested branch:** `feat/AI-02-classify-endpoint`
- **DoD:** Endpoint teruji (Postman / `/docs`)

#### AI-03
- **Task:** Prompt template chatbot + knowledge base FAQ
- **PIC:** Al-Fath | **Depends:** `OPS-07` | **Suggested branch:** `feat/AI-03-prompts-faq`
- **DoD:** Draf prompt gaya Sagumi + 20–30 FAQ

#### AI-04
- **Task:** Integrasi Gemini dasar via FastAPI `/chat`
- **PIC:** Al-Fath | **Depends:** `AI-03`, `OPS-09` | **Suggested branch:** `feat/AI-04-gemini-chat`
- **DoD:** Jawaban generatif jalan via `/chat`

### Sprint 2

#### BE-04
- **Task:** Upload bukti bayar ke Supabase Storage + validasi tipe/ukuran
- **PIC:** Kahar | **Depends:** `OPS-08` | **Suggested branch:** `feat/BE-04-upload-payment-proof`
- **DoD:** Endpoint upload + URL aman

#### BE-05
- **Task:** `POST /api/v1/orders` (Joi, hitung server, `reference_code`)
- **PIC:** Kahar | **Depends:** `BE-03`, `BE-04` | **Suggested branch:** `feat/BE-05-create-order`
- **DoD:** Order + `order_items` tersimpan, total dihitung ulang di server

#### BE-06
- **Task:** `GET /orders/track/:code` (field aman saja)
- **PIC:** Kahar | **Depends:** `BE-05` | **Suggested branch:** `feat/BE-06-track-order`
- **DoD:** Tracking berfungsi tanpa expose no. HP / alamat

#### FE-04
- **Task:** Form checkout + ringkasan harga + validasi client
- **PIC:** Annisa | **Depends:** `BE-05` | **Suggested branch:** `feat/FE-04-checkout-form`
- **DoD:** Form lengkap dengan state validasi

#### FE-05
- **Task:** Upload bukti bayar + state proses/berhasil/gagal
- **PIC:** Annisa | **Depends:** `BE-04` | **Suggested branch:** `feat/FE-05-payment-upload`
- **DoD:** UX upload jelas

#### FE-06
- **Task:** Halaman sukses (ID Referensi) + halaman tracking
- **PIC:** Annisa | **Depends:** `BE-06` | **Suggested branch:** `feat/FE-06-order-tracking-ui`
- **DoD:** Alur pelanggan tuntas

#### AI-05
- **Task:** Refine model intent v2 (class balance, hyperparameter)
- **PIC:** Raffi | **Depends:** `AI-02` | **Suggested branch:** `feat/AI-05-intent-v2`
- **DoD:** Model final + catatan pengaruh tuning

#### FE-10
- **Task:** Chat widget UI (state, render jawaban, error/loading)
- **PIC:** Annisa | **Depends:** `OPS-05`, `FE-02` | **Suggested branch:** `feat/FE-10-chat-widget`
- **DoD:** Widget chat terintegrasi

#### AI-06
- **Task:** Endpoint `/api/v1/chat` (Express → FastAPI) + intent routing
- **PIC:** Al-Fath | **Depends:** `AI-04`, `BE-01` | **Suggested branch:** `feat/AI-06-chat-gateway`
- **DoD:** Chat jalan end-to-end

#### AI-07
- **Task:** Guardrail refusal + uji ≥10 out-of-context
- **PIC:** Al-Fath | **Depends:** `AI-06` | **Suggested branch:** `feat/AI-07-guardrails`
- **DoD:** Laporan uji tercatat di README

#### DS-05
- **Task:** Rekomendasi bisnis awal dari data
- **PIC:** Rezki | **Depends:** `DS-02` | **Suggested branch:** `docs/DS-05-initial-insights`
- **DoD:** Ringkasan insight

#### QA-00
- **Task:** Uji integrasi katalog → checkout → tracking
- **PIC:** Annisa / Kahar | **Depends:** `FE-06`
- **DoD:** Catatan bug awal terdokumentasi

### Sprint 3

#### BE-07
- **Task:** Auth JWT login Owner + proteksi route admin
- **PIC:** Kahar | **Depends:** `BE-01` | **Suggested branch:** `feat/BE-07-owner-auth`
- **DoD:** Login & guard jalan

#### BE-08
- **Task:** Admin orders: list FIFO, filter, detail, `PATCH status` + history
- **PIC:** Kahar | **Depends:** `BE-05`, `BE-07` | **Suggested branch:** `feat/BE-08-admin-orders`
- **DoD:** Dashboard data siap

#### BE-09
- **Task:** Analytics endpoints (summary, sales-trend)
- **PIC:** Kahar | **Depends:** `DS-03` | **Suggested branch:** `feat/BE-09-analytics-api`
- **DoD:** JSON sesuai `docs/API_CONTRACT.md`

#### FE-07
- **Task:** Halaman login Owner
- **PIC:** Annisa | **Depends:** `BE-07` | **Suggested branch:** `feat/FE-07-owner-login`
- **DoD:** Login + redirect aman

#### FE-08
- **Task:** Dashboard antrian (list, detail, preview bukti, update status)
- **PIC:** Annisa | **Depends:** `BE-08` | **Suggested branch:** `feat/FE-08-owner-queue`
- **DoD:** Owner bisa kelola pesanan

#### FE-09
- **Task:** Chart Recharts + halaman analytics + filter tanggal/produk
- **PIC:** Annisa | **Depends:** `BE-09` | **Suggested branch:** `feat/FE-09-owner-analytics`
- **DoD:** Visualisasi akurat

#### AI-09
- **Task:** RAG: embedding katalog/FAQ + FAISS + integrasi `/chat`
- **PIC:** Raffi | **Depends:** `AI-06`, `AI-03` | **Suggested branch:** `feat/AI-09-rag-faiss`
- **DoD:** Jawaban grounded ke katalog/FAQ

#### AI-10
- **Task:** Deploy & hardening seluruh service FastAPI (classify + chat)
- **PIC:** Al-Fath | **Depends:** `AI-02`, `AI-06` | **Suggested branch:** `feat/AI-10-ai-hardening`
- **DoD:** Service online & tahan timeout/quota error

#### DS-06
- **Task:** Model forecast stok (MA vs regresi) + MAE/RMSE
- **PIC:** Fatih | **Depends:** `DS-03` | **Suggested branch:** `feat/DS-06-stock-forecast`
- **DoD:** Model + tabel perbandingan

#### DS-07
- **Task:** Integrasi forecast → endpoint + chart
- **PIC:** Fatih / Kahar | **Depends:** `DS-06`, `BE-09` | **Suggested branch:** `feat/DS-07-forecast-integration`
- **DoD:** Estimasi tampil di dashboard

#### DS-08
- **Task:** Analisis tren final + rekomendasi
- **PIC:** Rezki | **Depends:** `DS-05` | **Suggested branch:** `docs/DS-08-final-trends`
- **DoD:** Narasi insight final

#### OPS-11
- **Task:** Integrasi FE–BE–AI end-to-end (staging)
- **PIC:** Semua | **Depends:** All
- **DoD:** Semua alur utama tersambung

### Sprint 4

#### QA-01
- **Task:** Uji E2E sesuai checklist
- **PIC:** Semua | **Depends:** `OPS-11`
- **DoD:** Checklist terisi, bug terdokumentasi

#### QA-02
- **Task:** Uji input invalid, upload salah, AI down
- **PIC:** Kahar / Annisa | **Depends:** `QA-01`
- **DoD:** Pesan error jelas, app stabil

#### QA-03
- **Task:** Uji responsif HP & desktop
- **PIC:** Annisa | **Depends:** `QA-01`
- **DoD:** Tampilan layak di HP & desktop

#### QA-04
- **Task:** Uji relevansi chatbot + refusal
- **PIC:** Al-Fath | **Depends:** `AI-09`
- **DoD:** Laporan hasil uji

#### QA-05
- **Task:** Verifikasi angka analytics/forecast vs DB
- **PIC:** Rezki / Fatih | **Depends:** `FE-09`
- **DoD:** Angka cocok

#### BE-10
- **Task:** Hardening: rate limit chat, validasi tambahan, CORS produksi
- **PIC:** Kahar | **Depends:** `QA-02` | **Suggested branch:** `feat/BE-10-prod-hardening`
- **DoD:** Endpoint aman untuk produksi

#### OPS-12
- **Task:** Deploy final + env produksi
- **PIC:** Kahar | **Depends:** `QA-01`
- **DoD:** URL publik stabil

#### OPS-13
- **Task:** README lengkap (arsitektur, API, model, data, design rationale)
- **PIC:** Kahar (koord.), Al-Fath/Raffi (AI), Rezki/Fatih (DS) | **Depends:** All
- **DoD:** README lengkap

#### OPS-14
- **Task:** User Guide Owner
- **PIC:** Annisa | **Depends:** `FE-08` | **Suggested branch:** `docs/OPS-14-user-guide`
- **DoD:** Panduan singkat & jelas

#### OPS-15
- **Task:** Skenario demo + sesi demo UMKM + catat feedback
- **PIC:** Kahar (leader) | **Depends:** `OPS-12`
- **DoD:** Catatan feedback UMKM

#### OPS-16
- **Task:** Isi logbook Checkpoint 3
- **PIC:** Semua
- **DoD:** Terisi semua

### Optional / Side Quest

#### AI-11
- **Task:** Model sentimen keluhan (≥2 kelas)
- **PIC:** Raffi | **Depends:** `AI-05`
- **DoD:** Model + evaluasi (hanya jika Sprint 3 selesai lebih awal)

#### AI-12
- **Task:** Eksperimen SLM/LLM open-source lokal untuk generation
- **PIC:** Al-Fath | **Depends:** `AI-09`
- **DoD:** Catatan hasil + perbandingan (hanya jika Sprint 3 selesai lebih awal)
