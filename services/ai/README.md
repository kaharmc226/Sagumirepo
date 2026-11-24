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

## Train / Evaluate Manually

```bash
python -m training.train_intent
```

This compares `LogisticRegression` vs `CalibratedClassifierCV(LinearSVC)` via 5-fold Stratified CV (macro-F1) and writes the winning bundle to `models/intent_v0.joblib`.

## External Training (Colab / Kaggle)

- Keep datasets in CSV format with columns `text,intent` (valid intents: `tanya_produk`, `pemesanan`, `keluhan`, `lain_lain`).
- Put cleaned, anonymized datasets in `data/processed/` (never commit `data/raw/`).
- If exporting `.joblib` from Colab/Kaggle, match the `scikit-learn` major/minor version installed here, or drop the updated CSV into `data/processed/` and re-run `python -m training.train_intent`.

