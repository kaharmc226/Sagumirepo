# services/ai/data

Datasets for intent classification, analytics and stock forecasting.

| Folder | In Git? | Contents |
|---|---|---|
| `raw/` | ❌ **No** (gitignored) | Original data from the Owner (sales exports, chat logs). May contain customer names/phone numbers. |
| `interim/` | ❌ No (gitignored) | Temporary cleaning outputs. |
| `processed/` | ✅ Yes | Cleaned, **anonymized** datasets used for training (e.g. `intent_v1.csv`, `daily_sales.csv`). |

## Rules

- Never commit raw Owner data or anything containing customer personal data (name, phone, address).
- Share raw files through the team drive; put the link in the team chat, not here.
- Synthetic data must be clearly labeled (e.g. `intent_synthetic_v1.csv`).
- Keep processed files small (< 5 MB). Document every column in the data dictionary (DS-02).
