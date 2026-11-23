# API Contract v1 — Sagumi (A26-CS277)

> **Status:** Draft v1 (siap review & freeze bersama: Kahar [BE], Al-Fath [AE Serving], Raffi [AE Model/RAG], Annisa [FE], Fatih & Rezki [DS]).
> **Aturan perubahan:** Setelah freeze di Sprint 1, perubahan breaking pada endpoint, payload, atau error code wajib melalui review pemilik modul terkait.

---

## 1. Konvensi Umum

- **Base URL:**
  - **Express API (Publik & Admin):** `/api/v1`
  - **FastAPI AI Service (Internal, hanya dipanggil Express):** `/`
- **Content-Type:** `application/json` (kecuali upload bukti bayar: `multipart/form-data`).
- **Timestamp:** ISO 8601 UTC (`YYYY-MM-DDTHH:mm:ssZ`).
- **Mata Uang:** Integer Rupiah (`IDR`, tanpa desimal, contoh: `15000`).
- **Autentikasi Owner:** Header `Authorization: Bearer <jwt_token>`.

### Format Response Standar

**Sukses:**
```json
{
  "success": true,
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```
*(Field `meta` hanya disertakan pada endpoint dengan pagination.)*

**Gagal:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input tidak valid",
    "details": [
      { "field": "customer_phone", "message": "Nomor HP wajib diisi" }
    ]
  }
}
```

### Daftar Error Code Standar

| HTTP | Code | Keterangan |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Validasi Joi/Pydantic gagal |
| `400` | `INVALID_FILE_TYPE` | Tipe file bukan JPG/PNG/WebP |
| `400` | `INVALID_STATUS_TRANSITION` | Perubahan status pesanan tidak diizinkan |
| `401` | `UNAUTHORIZED` | Token JWT tidak ada, tidak valid, atau kedaluwarsa |
| `404` | `NOT_FOUND` | Resource (produk, order, reference code) tidak ditemukan |
| `413` | `FILE_TOO_LARGE` | Ukuran file melebihi batas 5 MB |
| `429` | `RATE_LIMITED` | Terlalu banyak permintaan (khususnya `/chat`) |
| `500` | `INTERNAL_ERROR` | Kesalahan tak terduga di server |
| `503` | `AI_SERVICE_UNAVAILABLE` | FastAPI/Gemini timeout atau kuota habis (frontend tampilkan fallback) |

---

## 2. Endpoint Publik — Express (`/api/v1`)

### 2.1 Katalog Produk

#### `GET /api/v1/products`
Mengambil daftar produk yang tersedia untuk ditampilkan di katalog.
- **Query (opsional):** `?available=true`
- **Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Keripik Sagu Original",
      "slug": "keripik-sagu-original",
      "description": "Cemilan sagu renyah khas Kendari.",
      "price": 15000,
      "image_url": "https://...",
      "is_available": true
    }
  ]
}
```

#### `GET /api/v1/products/:slug`
Mengambil detail satu produk berdasarkan `slug`.
- **Response `200`:** objek produk tunggal dalam `data`.
- **Error:** `404 NOT_FOUND` jika produk tidak ditemukan.

---

### 2.2 Upload Bukti Bayar

#### `POST /api/v1/uploads/payment-proof`
Mengunggah foto bukti transfer ke bucket privat Supabase (`payment-proofs`).
- **Request:** `multipart/form-data` dengan field `file`.
- **Aturan validasi:**
  - Format diizinkan: `image/jpeg`, `image/png`, `image/webp`.
  - Ukuran maksimal: **5 MB**.
- **Response `201`:**
```json
{
  "success": true,
  "data": {
    "file_path": "proofs/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.jpg"
  }
}
```
- **Error:** `400 INVALID_FILE_TYPE`, `413 FILE_TOO_LARGE`.

---

### 2.3 Pemesanan & Pelacakan

#### `POST /api/v1/orders`
Membuat pesanan baru. **Aturan wajib:** `subtotal`, `shipping_fee`, dan `total` **dihitung ulang di server** berdasarkan harga produk di database.
- **Request:**
```json
{
  "customer_name": "Budi Santoso",
  "customer_phone": "081234567890",
  "address": "Jl. Ahmad Yani No. 10, Kendari",
  "notes": "Tolong dibungkus rapi untuk oleh-oleh",
  "payment_proof_url": "proofs/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.jpg",
  "items": [
    { "product_id": "uuid-produk-1", "qty": 2 },
    { "product_id": "uuid-produk-2", "qty": 1 }
  ]
}
```
- **Response `201`:**
```json
{
  "success": true,
  "data": {
    "reference_code": "SGM-20261123-A1B2",
    "status": "MENUNGGU_KONFIRMASI",
    "subtotal": 45000,
    "shipping_fee": 0,
    "total": 45000,
    "created_at": "2026-11-23T04:30:00Z"
  }
}
```
- **Error:** `400 VALIDATION_ERROR` (item kosong, qty <= 0, produk tidak tersedia).

#### `GET /api/v1/orders/track/:referenceCode`
Melacak status pesanan berdasarkan `reference_code`. **Hanya mengembalikan field aman** (tanpa nomor HP atau alamat lengkap pelanggan).
- **Response `200`:**
```json
{
  "success": true,
  "data": {
    "reference_code": "SGM-20261123-A1B2",
    "status": "DIPROSES",
    "total": 45000,
    "items": [
      { "product_name": "Keripik Sagu Original", "qty": 2, "unit_price": 15000, "line_total": 30000 }
    ],
    "history": [
      { "status": "MENUNGGU_KONFIRMASI", "note": "Pesanan diterima", "created_at": "2026-11-23T04:30:00Z" },
      { "status": "DIPROSES", "note": "Pembayaran terverifikasi", "created_at": "2026-11-23T05:00:00Z" }
    ],
    "created_at": "2026-11-23T04:30:00Z",
    "updated_at": "2026-11-23T05:00:00Z"
  }
}
```
- **Error:** `404 NOT_FOUND`.

---

### 2.4 Chatbot Pelanggan

#### `POST /api/v1/chat`
Orkestrasi chatbot pelanggan:
1. Express mengambil **maksimal 6 pesan terakhir** (3 turns, urut terlama → terbaru) dari tabel `chat_messages` berdasarkan `session_id`.
2. Express memanggil FastAPI `POST /classify-intent` untuk teks `message`.
3. Jika `intent === "keluhan"` dengan `confidence >= 0.6`, Express langsung membalas template arahan menghubungi Owner (tanpa memanggil Gemini/RAG).
4. Selain itu, Express memanggil FastAPI `POST /chat` dengan `message`, `history`, dan `intent`.
5. Express menyimpan pesan `user` dan `assistant` ke tabel `chat_messages`.
- **Request:**
```json
{
  "session_id": "sess-uuid-atau-random-id",
  "message": "Yang pedas harganya berapa?"
}
```
- **Response `200`:**
```json
{
  "success": true,
  "data": {
    "answer": "Keripik Sagu Pedas harganya Rp15.000 per bungkus kak.",
    "intent": "tanya_produk",
    "sources": ["faq:harga-keripik", "product:keripik-sagu-pedas"]
  }
}
```
- **Error:** `429 RATE_LIMITED`, `503 AI_SERVICE_UNAVAILABLE` (jika FastAPI/Gemini gagal atau timeout).

---

## 3. Endpoint Owner / Admin — Express (`/api/v1`)

> Semua endpoint di bawah `/api/v1/admin/*` wajib menyertakan header `Authorization: Bearer <jwt_token>`.

### 3.1 Autentikasi

#### `POST /api/v1/auth/login`
- **Request:** `{ "email": "owner@sagumi.id", "password": "..." }`
- **Response `200`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "user": { "id": "uuid", "email": "owner@sagumi.id" }
  }
}
```
- **Error:** `401 UNAUTHORIZED`.

---

### 3.2 Manajemen Antrian Pesanan (FIFO)

**Alur Status Pesanan:**
- `MENUNGGU_KONFIRMASI` → `DIPROSES` atau `DIBATALKAN`
- `DIPROSES` → `SIAP_DIKIRIM` atau `DIBATALKAN`
- `SIAP_DIKIRIM` → `SELESAI`

#### `GET /api/v1/admin/orders`
Mengambil daftar antrian pesanan dengan urutan default **FIFO** (`created_at ASC`).
- **Query:** `?status=MENUNGGU_KONFIRMASI&page=1&limit=20`
- **Response `200`:** array ringkasan order + `meta` pagination.

#### `GET /api/v1/admin/orders/:id`
Mengambil detail lengkap pesanan untuk Owner, termasuk **Signed URL** sementara (berlaku 3600 detik) untuk melihat foto bukti transfer.
- **Response `200`:** objek order lengkap (`customer_name`, `customer_phone`, `address`, `notes`, `items`, `payment_proof_signed_url`, `history`).

#### `PATCH /api/v1/admin/orders/:id/status`
Memperbarui status pesanan dan mencatat log ke `order_status_history`.
- **Request:**
```json
{
  "status": "DIPROSES",
  "note": "Bukti transfer valid, masuk antrian produksi"
}
```
- **Response `200`:** `{ "id": "uuid", "status": "DIPROSES", "updated_at": "..." }`.
- **Error:** `400 INVALID_STATUS_TRANSITION`, `404 NOT_FOUND`.

---

### 3.3 Analytics & Stock Forecast (Dashboard Owner)

> **Aturan hitung:** Pesanan berstatus `DIBATALKAN` dikecualikan dari seluruh metrik omzet, jumlah order, tren, dan forecast.

#### `GET /api/v1/admin/analytics/summary`
- **Query (opsional):** `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&product_id=<uuid>` (default 30 hari terakhir).
- **Response `200`:**
```json
{
  "success": true,
  "data": {
    "total_orders": 120,
    "total_revenue": 5400000,
    "average_order_value": 45000,
    "pending_orders": 4,
    "top_products": [
      { "product_id": "uuid", "name": "Keripik Sagu Original", "total_qty": 180, "total_revenue": 2700000 }
    ]
  }
}
```

#### `GET /api/v1/admin/analytics/sales-trend`
- **Query (opsional):** `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&product_id=<uuid>`
- **Response `200`:**
```json
{
  "success": true,
  "data": {
    "interval": "daily",
    "points": [
      { "date": "2026-11-20", "total_orders": 5, "total_revenue": 225000, "total_qty": 15 }
    ]
  }
}
```

#### `GET /api/v1/admin/analytics/stock-forecast`
Express meneruskan permintaan ke FastAPI `GET /forecast/stock`.
- **Query (opsional):** `?days=7`
- **Response `200`:** meneruskan payload forecast dari FastAPI (lihat Bagian 4.4).

---

### 3.4 CRUD Produk (Admin)

- `GET /api/v1/admin/products` — daftar semua produk (termasuk `is_available: false`).
- `POST /api/v1/admin/products` — tambah produk (`name`, `slug`, `description`, `price`, `image_url`, `is_available`).
- `PATCH /api/v1/admin/products/:id` — ubah detail/harga/ketersediaan produk.
- `DELETE /api/v1/admin/products/:id` — hapus produk (atau nonaktifkan via `is_available: false` jika sudah memiliki riwayat order).

---

## 4. Endpoint Internal AI Service — FastAPI

> Hanya diakses secara internal oleh Express (tidak diekspos langsung ke browser). Dokumentasi interaktif otomatis tersedia di `/docs` (Swagger UI).

### 4.1 Health Check

#### `GET /health`
- **Response `200`:**
```json
{
  "status": "ok",
  "models": {
    "intent_classifier": "loaded",
    "rag_index": "loaded"
  }
}
```

### 4.2 Klasifikasi Intent (Model TF-IDF + Classifier)

#### `POST /classify-intent`
- **Request:**
```json
{
  "text": "Saya mau pesan keripik sagu 3 bungkus"
}
```
- **Response `200`:**
```json
{
  "intent": "pemesanan",
  "confidence": 0.91
}
```
- **Daftar nilai `intent` yang valid:** `tanya_produk`, `pemesanan`, `keluhan`, `lain_lain`.

### 4.3 Generatif Chatbot (RAG + Gemini + Guardrail)

#### `POST /chat`
- **Request:**
```json
{
  "message": "Yang pedas harganya berapa?",
  "intent": "tanya_produk",
  "history": [
    { "role": "user", "content": "Ada keripik sagu?" },
    { "role": "assistant", "content": "Ada kak, tersedia varian Original dan Pedas." }
  ]
}
```
*(Field `history` opsional, default `[]`, maksimal 6–10 item; `role` bernilai `"user"` atau `"assistant"`).*
- **Response `200`:**
```json
{
  "answer": "Keripik Sagu Pedas harganya Rp15.000 per bungkus kak.",
  "sources": ["faq:harga-keripik", "product:keripik-sagu-pedas"]
}
```

### 4.4 Prediksi Kebutuhan Stok

#### `GET /forecast/stock`
- **Query (opsional):** `?days=7` (default `7`, rentang `1–30`).
- **Response `200`:**
```json
{
  "horizon_days": 7,
  "model_used": "linear_regression",
  "items": [
    {
      "product_id": "uuid-produk-1",
      "product_name": "Keripik Sagu Original",
      "avg_daily_sales": 6.5,
      "predicted_demand": 46,
      "recommended_stock": 50
    }
  ]
}
```
