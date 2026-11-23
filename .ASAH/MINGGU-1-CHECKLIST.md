# MINGGU-1-CHECKLIST — Sagumi / A26-CS277

> **Periode resmi:** 19–25 Nov 2026. **Dibuat:** 23 Nov 2026 (sisa 3 hari: 23–25 Nov).
> **Fokus:** fondasi — kunci kontrak & data, jangan coding fitur dulu.
> **Aturan:** centang hanya jika Definition of Done (DoD) benar-benar terpenuhi.

## Gate Minggu 1 — harus selesai Rabu 25 Nov

- [ ] Repo GitHub + branch rules + README skeleton
- [ ] `API_CONTRACT.md` v1 (endpoint, request/response, error code)
- [ ] Figma 5 layar: katalog, detail, checkout, tracking, dashboard (low-fi cukup)
- [ ] Skema DB + seed 10–15 produk
- [ ] Data penjualan bersih + `data_dictionary.md` v1
- [ ] Dataset intent v1: ≥4 kelas, 150–300 contoh, split train/test + labeling guideline

**Stretch (hanya jika gate selesai):** skeleton FastAPI + `/health`, prompt + 20–30 FAQ, scaffold FE, staging deploy.

---

## Checklist per PIC

### Kahar — FS / Leader

- [ ] **Repo + branch rules + README**
  - DoD: repo `sagumi-capstone` dibuat, 6 anggota invited, branch `main` & `dev` ada, `main`/`dev` protected, README bisa dibaca.
- [ ] **Draft `API_CONTRACT.md` v1**
  - DoD: daftar endpoint publik/owner/FastAPI, contoh request/response, error code, aturan auth.
- [ ] **Freeze API contract** (bareng Al-Fath + Raffi)
  - DoD: disetujui 3 track; perubahan setelah freeze harus lewat review.
- [ ] **Supabase project + bucket `payment-proofs`**
  - DoD: project aktif, bucket privat, `.env.example` ada, akses tim diberikan.
- [ ] **Skema DB + seed katalog**
  - DoD: tabel `products`, `orders`, `order_items`, `order_status_history`, `chat_messages`, `faqs`, `owner_users`; seed 10–15 produk; migration/seed bisa dijalankan.
- [ ] **Review gate Minggu 1** (Rabu sore)
  - DoD: 6 artefak gate dicek, blocker dicatat, `KONTEKS-PROYEK.md` bagian Status di-update.

### Annisa — FS

- [ ] **Figma low-fi 5 layar** (Senin)
  - DoD: katalog, detail, checkout, tracking, dashboard; alur utama bisa dibaca.
- [ ] **Figma final core screens** (Selasa)
  - DoD: katalog + checkout + dashboard cukup detail untuk mulai coding; komponen dasar ditandai.
- [ ] **Scaffold FE** (stretch, Rabu)
  - DoD: React + Vite + Tailwind + shadcn jalan lokal, routing dasar ada.

### Rezki — DS

- [ ] **Minta data ke Owner** (Senin)
  - DoD: pesan terkirim; daftar data yang diminta jelas: rekap penjualan, katalog (nama/harga/foto), FAQ, jam operasional, info pembayaran; deadline permintaan Rabu.
- [ ] **Extract + cleaning data penjualan** (Selasa–Rabu)
  - DoD: CSV bersih, duplikasi/nilai kosong ditangani, asumsi dicatat.
- [ ] **`data_dictionary.md` v1** (Rabu)
  - DoD: nama kolom, tipe, deskripsi, satuan, sumber; pertanyaan bisnis awal (tren, produk terlaris, AOV).

### Fatih — DS

- [ ] **Labeling guideline intent** (Senin)
  - DoD: definisi ≥4 kelas (`tanya_produk`, `pemesanan`, `keluhan`, `lain_lain`), contoh per kelas, aturan ambigu.
- [ ] **Dataset intent v1** (Selasa–Rabu)
  - DoD: 150–300 contoh terlabel, split train/test 80/20, tidak ada leakage, sumber data dicatat.
- [ ] **Koordinasi spec dataset dengan Raffi**
  - DoD: format file + label + split disepakati; dataset bisa langsung dipakai training.

### Raffi — AE

- [ ] **Skeleton notebook eksperimen** (Senin)
  - DoD: notebook bisa load dataset, preprocessing TF-IDF, siap eksperimen.
- [ ] **Baseline model intent** (Rabu, setelah dataset v1)
  - DoD: TF-IDF + LinearSVC vs TF-IDF + LogReg; tabel akurasi/F1; alasan pemilihan; catatan keterbatasan.
- [ ] **Review `API_CONTRACT.md`** (Senin–Selasa)
  - DoD: endpoint `/classify-intent`, `/chat`, format request/response sesuai kebutuhan model.

### Al-Fath — AE

- [ ] **Skeleton FastAPI + `/health`** (Selasa)
  - DoD: service jalan lokal, `/docs` terbuka, struktur `services/ai/app` siap.
- [ ] **Prompt template + FAQ knowledge base draft** (Rabu)
  - DoD: prompt gaya Sagumi + few-shot; 20–30 FAQ; daftar pertanyaan out-of-context untuk uji refusal.
- [ ] **Review `API_CONTRACT.md`** (Senin–Selasa)
  - DoD: endpoint `/chat`, format history, error/timeout, dan guardrail disepakati.

---

## Timeline

### Senin 23 Nov — unblock semua orang

- [ ] Kahar: repo + branch rules + README
- [ ] Kahar: draft `API_CONTRACT.md`
- [ ] Kahar: Supabase project + bucket
- [ ] Rezki: kirim permintaan data ke Owner
- [ ] Annisa: Figma low-fi 5 layar
- [ ] Fatih: labeling guideline
- [ ] Raffi: skeleton notebook + review kontrak
- [ ] Al-Fath: review kontrak + mulai skeleton FastAPI

### Selasa 24 Nov — freeze & bangun fondasi

- [ ] Pagi: review + **freeze `API_CONTRACT.md`** (Kahar, Al-Fath, Raffi)
- [ ] Kahar: skema DB + seed 10–15 produk
- [ ] Annisa: finalisasi Figma core screens
- [ ] Rezki: extract + cleaning data
- [ ] Fatih: mulai labeling dataset intent
- [ ] Al-Fath: skeleton FastAPI + `/health`
- [ ] Raffi: siapkan pipeline eksperimen

### Rabu 25 Nov — selesaikan gate & review

- [ ] Rezki: `data_dictionary.md` v1
- [ ] Fatih: dataset intent v1 + split
- [ ] Raffi: baseline model + tabel F1
- [ ] Al-Fath: prompt + FAQ draft
- [ ] Kahar: cek 6 artefak gate; stretch: staging deploy
- [ ] Semua: standup + review 30 menit
- [ ] Kahar: update `KONTEKS-PROYEK.md` (Status & Next Actions)

---

## Mulai dari sini — setup repo (Kahar)

1. [ ] Buat repo GitHub `sagumi-capstone` (private) + README.
2. [ ] Invite 5 anggota sebagai collaborator.
3. [ ] Buat branch `dev` dari `main`.
4. [ ] Settings → Branches → protect `main` dan `dev` (require PR + 1 review).
5. [ ] Clone lokal, buat struktur awal:
   ```
   sagumi-capstone/
   ├─ apps/web/          # React + Vite (Annisa)
   ├─ apps/api/          # Express (Kahar)
   ├─ services/ai/       # FastAPI (Al-Fath + Raffi)
   ├─ docs/              # API_CONTRACT.md, README, User Guide
   ├─ .gitignore
   ├─ .env.example
   └─ README.md
   ```
6. [ ] Tambah `.gitignore` (node_modules, .env, dist, __pycache__, .venv).
7. [ ] Commit awal ke `dev`, lalu bagikan link repo ke grup.

---

## Aturan anti-rework

- API contract **freeze dulu**, baru FE/BE/AI coding.
- Skema DB dulu, baru seed dan endpoint.
- Labeling guideline dulu, baru labeling massal.
- Figma low-fi sudah cukup untuk mulai; jangan tunggu sempurna.
- Data Owner belum lengkap? Pakai data sintetis sementara + catat asumsi.

## Risiko & fallback

| Risiko | Fallback |
|---|---|
| Data Owner lambat | Pakai data sintetis sementara; Rezki/Fatih catat asumsi |
| Figma molor | FE mulai dari wireframe + komponen dasar |
| Dataset intent kurang | Training v1 pakai subset; augmentasi Minggu 2 |
| API contract molor | BE/AI pakai mock; jangan coding endpoint final |
| Anggota sibuk | Prioritaskan gate; stretch boleh geser ke Minggu 2 |

## Template standup harian (15 menit)

1. Selesai apa kemarin?
2. Lanjut apa hari ini?
3. Blocker apa yang butuh bantuan?

## Catatan

- Jangan edit Project Plan docx tanpa izin; versi final dipegang user.
- File konteks: `C:\Users\Administrator\Downloads\ASAH\KONTEKS-PROYEK.md`.
- Zip updated: `C:\Users\Administrator\Downloads\ASAH-20261123T024103Z-1-001-updated.zip`.
- Update checklist ini setiap ada perubahan nyata; jangan centang berdasarkan rencana saja.
