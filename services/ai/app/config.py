"""Configuration loader for Sagumi AI Service (reads root .env first)."""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

SERVICE_ROOT = Path(__file__).resolve().parent.parent
REPO_ROOT = SERVICE_ROOT.parent.parent

# Load monorepo root .env first, then optional services/ai/.env override
load_dotenv(REPO_ROOT / ".env")
load_dotenv(SERVICE_ROOT / ".env", override=True)

_PLACEHOLDER_KEYS = {"", "your-gemini-api-key", "change-me"}


@dataclass(frozen=True)
class Settings:
    ai_port: int = int(os.getenv("AI_PORT", "8000"))
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "").strip()
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-3.8-flash").strip()
    intent_confidence_threshold: float = float(
        os.getenv("INTENT_CONFIDENCE_THRESHOLD", "0.6")
    )
    model_path: Path = SERVICE_ROOT / "models" / "intent_v0.joblib"
    dataset_path: Path = SERVICE_ROOT / "data" / "processed" / "intent_synthetic_v0.csv"
    prompt_path: Path = SERVICE_ROOT / "prompts" / "system_prompt.txt"
    kb_path: Path = SERVICE_ROOT / "rag" / "faqs_seed.json"

    @property
    def has_gemini_key(self) -> bool:
        return self.gemini_api_key.lower() not in _PLACEHOLDER_KEYS


settings = Settings()

