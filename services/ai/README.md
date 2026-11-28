# Sagumi AI Service (`services/ai`)

Internal FastAPI service called by Express (`apps/api`) for:
1. **Intent Classification** (`POST /classify-intent`) — TF-IDF (word + char n-grams) + calibrated classifier across `tanya_produk`, `pemesanan`, `keluhan`, `lain_lain`.
2. **RAG + Gemini Chatbot** (`POST /chat`) — starter FAQ/product retriever + Gemini (`google-genai`), with grounded fallback when `GEMINI_API_KEY` is not set.
3. **Stock Forecast** (`GET /forecast/stock`) — baseline stub matching `docs/API_CONTRACT.md` §4.4 (to be replaced by `DS-06` / `DS-07`).

## Local Setup (Python 3.11+)

```bash
cd services/ai
python -m venv .venv

# Windows (PowerShell)
.venv\Scripts\Activate.ps1
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
```

## Run the Server

```bash
uvicorn app.main:app --reload --port 8000
```

Open Swagger UI: http://localhost:8000/docs

> **Auto-training on first boot:** `models/*.joblib` files are gitignored. If `models/intent_v0.joblib` is missing locally, FastAPI automatically trains the v0 baseline from `data/processed/intent_synthetic_v0.csv` on startup (~1 second).

## Knowledge Base (`rag/faqs_seed.json`)

- 25 FAQs (5 original + 20 added for `AI-03`) plus 12 product entries mirroring `apps/api/db/seed.sql`.
- Product names and prices are kept in sync with `seed.sql` (verified 12/12).
- Retrieval uses TF-IDF word bigrams + cosine similarity (`top_k=4`, `min_score=0.08`).

### FAQs pending Owner confirmation (`OPS-07`)

These entries answer with "belum tersedia" and redirect the customer to the Owner until real data arrives:

| FAQ ID | Missing detail |
|---|---|
| `faq:metode-pembayaran` | Bank account number and account holder |
| `faq:ongkir` | Shipping tariff per destination |
| `faq:estimasi-pengiriman` | Courier and delivery SLA |
| `faq:minimal-order` | Minimum purchase |
| `faq:masa-simpan` | Official shelf life / expiry date |
| `faq:bebas-gluten` | Full ingredient and allergen statement |
| `faq:pembatalan-pesanan` | Cancellation cut-off |
| `faq:kebijakan-retur` | Return and exchange policy |
| `faq:catatan-pesanan` | Confirmation flow for special requests |
| `faq:pesanan-jumlah-besar` | Bulk order lead time |

## Verification Log

### `OPS-09` — FastAPI skeleton

- `GET /health` → `{"status":"ok","models":{"intent_classifier":"loaded","rag_index":"loaded"}}`
- `GET /docs` → `200`; `GET /openapi.json` lists `/health`, `/classify-intent`, `/chat`, `/forecast/stock`.

### `AI-02` — `POST /classify-intent` (Postman, 2026-11-28)

- 26 assertions over 10 cases; 25 passed.
- Winning baseline model: `calibrated_linear_svc`, macro-F1 `0.72` (100-row synthetic dataset).
- Known limitation: gibberish input yields near-uniform probabilities (`0.32/0.31/0.20/0.16`), so `argmax` may pick `keluhan`. The real fix is the labeled dataset from `AI-01` / `DS-04`.
- Validation: empty `text` and `text` longer than 1000 characters both return `422`.

### `AI-03` — prompt template and knowledge base

- 25 FAQs + 12 products; JSON shape unchanged (`id`, `category`, `title`, `content`).
- Retrieval check: 23/23 queries returned the expected entry within `top_k=4`.
- `prompts/system_prompt.txt` defines identity, tone, grounding rules, per-intent behaviour, and refusal/escalation rules.
- Live `/chat` checks after the expansion (ongkir, order status, shelf life) returned grounded answers with the matching `sources` and did not invent tariffs or expiry dates.

### `AI-04` — `POST /chat` (Postman, 2026-11-28)

- 12 assertions passed: non-empty answer, `sources` returned, out-of-topic refusal, complaint escalation, and multi-turn `history`.
- `GEMINI_MODEL` from `.env` confirmed working with `google-genai`.
- The local fallback path (no `GEMINI_API_KEY`) is implemented in `chat_service.py` but has not been exercised yet.

## Train / Evaluate Manually

```bash
python -m training.train_intent
```

This compares `LogisticRegression` vs `CalibratedClassifierCV(LinearSVC)` via 5-fold Stratified CV (macro-F1) and writes the winning bundle to `models/intent_v0.joblib`.

## External Training (Colab / Kaggle)

- Keep datasets in CSV format with columns `text,intent` (valid intents: `tanya_produk`, `pemesanan`, `keluhan`, `lain_lain`).
- Put cleaned, anonymized datasets in `data/processed/` (never commit `data/raw/`).
- If exporting `.joblib` from Colab/Kaggle, match the `scikit-learn` major/minor version installed here, or drop the updated CSV into `data/processed/` and re-run `python -m training.train_intent`.

