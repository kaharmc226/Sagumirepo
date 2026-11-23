# KONTEKS PROYEK — Sagumi / A26-CS277

> File ini adalah "memori kerja" untuk diskusi dengan AI. Update bagian **Status** dan **Next Actions** setiap minggu. Jangan taruh password, API key, atau data pribadi pelanggan di sini.

## 1. Identitas proyek

- **Program:** Asah 2026 (Dicoding x GoTo), Capstone Project
- **ID Tim:** A26-CS277
- **UMKM:** Sagumi — FnB (cemilan/oleh-oleh berbahan sagu), Kendari, berdiri 2016
- **Owner/PIC UMKM:** Ibu Hajar
- **Judul use case:** Optimalisasi Layanan Informasi Produk dan Pengelolaan Antrian Pesanan Pelanggan pada UMKM Sagumi
- **Stack final:** React (Vite) + Express + FastAPI + Supabase + Gemini API (Next.js tidak dipakai)
- **Periode pengembangan:** 19 Nov – 16 Des 2026 (4 minggu)

## 2. Tim & peran (versi final setelah tukar peran AE)

| Anggota | LP | Peran utama |
|---|---|---|
| Kahar Munajat | FS | Backend, REST API, integrasi, deployment; leader tim |
| Annisa Nur Fitriani | FS | Frontend, UI/UX, chat widget, User Guide |
| Fatih M. Bintang Possumah | DS | Preprocessing dataset, pelatihan/fine tuning model, forecast stok |
| Rezki Alya Pasrun | DS | Data wrangling, EDA, analisis tren & visualisasi bisnis |
| Mochammad Raffi Fadhillah | AE | Model intent (`training/`, `models/`), evaluasi model, RAG |
| M. Al-Fath Nazriel Rajab | AE | Chatbot generatif/Gemini, prompt & guardrail, FastAPI serving/deploy |

**Batas kepemilikan AE:**
- Al-Fath: `routers/classify.py`, `routers/chat.py`, `main.py`, config, deploy, `prompts/`, guardrail.
- Raffi: `training/`, `models/`, `rag/`.
- Kontrak API internal: Al-Fath + Raffi + Kahar.
- Satu modul satu pemilik; perubahan modul orang lain lewat review pemiliknya.

## 3. Sumber acuan (source of truth)

Urutan prioritas saat ada konflik:

1. **Project Plan final (docx)** — versi final dipegang user; jangan diedit tanpa izin.
2. **Notes** di `C:\Users\Administrator\Downloads\ASAH\ASAH\Notes\`:
   - `00-INDEX.md` — indeks & deadline
   - `01-ringkasan-proyek-dan-use-case.md` — masalah, scope, tim
   - `02-stack-dan-arsitektur.md` — stack, arsitektur, DB, API, AI
   - `03-project-plan-siap-salin.md` — isi siap-salin Project Plan
   - `04-pemetaan-tech-stack-quest.md` — Main/Side Quest → fitur
   - `05-sprint-plan.md` — task per sprint + PIC
   - `06-backlog-moscow.md` — prioritas Must/Should/Could/Won't
3. **Resource** di `...\ASAH\Resource Capstone - *` dan `...\ASAH\Resource Meeting\` (transkrip, briefing, checklist).
4. **Zip updated:** `C:\Users\Administrator\Downloads\ASAH-20261123T024103Z-1-001-updated.zip` (zip asli tidak diubah).

## 4. Status per 23 Nov 2026

- Notes sudah disinkronkan dengan Project Plan, termasuk tukar peran AE (Raffi ↔ Al-Fath).
- PIC DS, tabel risiko, rencana pengujian, dan tanggal sudah disesuaikan.
- Project Plan docx: sudah diperbaiki user; tidak perlu diganti.
- Zip updated sudah dibuat; isi Notes di dalamnya sudah versi terbaru.
- Sprint 0 (fondasi) selesai/sebagian besar; Sprint 1 dimulai 19–25 Nov.
- **Fokus sekarang:** eksekusi Minggu 1 — setup repo, kontrak API, desain UI/UX, skema DB + seed, pembersihan data, pelabelan intent.

## 5. Jadwal 4 minggu (sesuai Project Plan)

| Minggu | Fokus | Milestone |
|---|---|---|
| 1 (19–25 Nov) | Repo & kontrak API, desain UI/UX, skema DB + seed, bersihkan data, pelabelan intent | Fondasi siap; dataset intent v1 & data dictionary |
| 2 (26 Nov–2 Des) | Katalog/detail, checkout + upload bukti, list order + ID, tracking, endpoint admin dasar, training intent v1, skeleton FastAPI | Alur pelanggan end-to-end; model intent v1 |
| 3 (3–9 Des) | Login owner, dashboard FIFO + update status, analytics, chatbot + RAG, forecast, integrasi FE–BE–AI | Seluruh alur utama terhubung |
| 4 (10–16 Des) | Uji E2E, bug fixing, responsif, deploy publik, README + User Guide, demo UMKM | Ter-deploy, teruji, terdokumentasi |

Checkpoint 2: 16 Des. Checkpoint 3: 22 Des.

## 6. Cara berdiskusi dengan AI (protokol)

1. **Sebut konteks:** "Baca `KONTEKS-PROYEK.md`" atau "Proyek Sagumi, minggu 1".
2. **Satu sesi = satu keputusan:** jangan campur planning, review arsitektur, dan update file.
3. **Beri state:** apa yang sudah selesai, apa yang macet, kapasitas orang, deadline.
4. **Minta output spesifik:** tabel task + PIC + dependency + DoD, bukan jawaban umum.
5. **Minta opsi + rekomendasi:** "Beri 2 opsi, lalu rekomendasikan yang paling aman."
6. **Akhiri dengan aksi:** "Update `05-sprint-plan.md`" atau "Buat checklist minggu 1".
7. **Minta saya menandai inkonsistensi** antara notes, docx, dan transkrip.

## 7. Template prompt

```
Konteks: Proyek Sagumi A26-CS277, [minggu/tanggal]. Baca KONTEKS-PROYEK.md.
Tujuan: [keputusan yang mau diambil].
Kondisi saat ini: [sudah selesai / macet / kapasitas tim].
Batasan: [waktu, peran, tool, deadline].
Output yang saya mau: [tabel task + PIC + dependency + DoD / opsi + rekomendasi / draft note].
```

Contoh:

```
Konteks: Proyek Sagumi, Minggu 1 (19-25 Nov). Baca KONTEKS-PROYEK.md.
Tujuan: bagi tugas minggu 1 per orang.
Kondisi: repo belum dibuat, data penjualan belum lengkap, 2 AE baru tukar peran.
Batasan: 6 orang, deadline Minggu 2, alur utama prioritas.
Output: tabel task, PIC, dependency, DoD, dan 3 risiko utama.
```

## 8. Ritme mingguan

- **Awal minggu (planning):** target, task, PIC, dependency, risiko.
- **Tengah minggu (check):** progres vs rencana, blocker, geser task jika perlu.
- **Akhir minggu (review):** rencana vs realisasi, update `05-sprint-plan.md` dan `06-backlog-moscow.md`, siapkan bukti logbook.

## 9. Aturan keputusan

- Main Quest dulu, baru Side Quest, baru fitur tambahan.
- Alur utama tidak boleh dikorbankan: pesan → tracking → dashboard → deploy.
- Kalau waktu mepet: hentikan Could, pangkas Should yang tidak memengaruhi demo.
- Jangan mengarang data UMKM; gunakan data yang tersedia atau sintetis yang diberi label jelas.
- Jangan menaruh API key/password di notes, kode, atau dokumen yang di-submit.

## 10. Next Actions

- [ ] Finalisasi repo + `API_CONTRACT.md` (Kahar, Al-Fath, Raffi).
- [ ] Desain Figma katalog, checkout, tracking, dashboard (Annisa).
- [ ] Skema DB + seed katalog (Kahar).
- [ ] Pembersihan data penjualan + data dictionary (Rezki, Fatih).
- [ ] Dataset intent v1 + split (Fatih; model oleh Raffi).
- [ ] Prompt & knowledge base FAQ awal (Al-Fath).
- [ ] Cek ulang tanggal & PIC di notes setiap ada perubahan Project Plan.
