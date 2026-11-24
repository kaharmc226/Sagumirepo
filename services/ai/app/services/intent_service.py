"""Intent classifier loader and inference service."""

from __future__ import annotations

import logging
from typing import Any

import joblib
import sklearn

from app.config import settings
from training.preprocess import normalize_indonesian_text
from training.train_intent import train_and_save_intent_model

logger = logging.getLogger(__name__)


class IntentService:
    def __init__(self) -> None:
        self._bundle: dict[str, Any] | None = None

    @property
    def is_loaded(self) -> bool:
        return self._bundle is not None and "pipeline" in self._bundle

    def load_or_train(self) -> None:
        model_path = settings.model_path
        if model_path.exists():
            try:
                bundle = joblib.load(model_path)
                saved_ver = bundle.get("sklearn_version")
                if saved_ver == sklearn.__version__ and "pipeline" in bundle:
                    self._bundle = bundle
                    logger.info(
                        "Loaded intent model '%s' (macro-F1=%s)",
                        bundle.get("model_name"),
                        bundle.get("macro_f1"),
                    )
                    return
                logger.warning(
                    "Intent model sklearn version mismatch (saved=%s, local=%s); retraining.",
                    saved_ver,
                    sklearn.__version__,
                )
            except Exception as exc:  # pragma: no cover - defensive fallback
                logger.warning("Failed to load %s (%s); retraining baseline.", model_path, exc)

        logger.info("Training baseline intent model from %s", settings.dataset_path)
        self._bundle = train_and_save_intent_model(
            dataset_path=settings.dataset_path,
            model_path=model_path,
            verbose=False,
        )

    def predict(self, text: str) -> tuple[str, float]:
        if not self.is_loaded or self._bundle is None:
            raise RuntimeError("Intent model is not loaded")

        pipeline = self._bundle["pipeline"]
        normalized = normalize_indonesian_text(text)
        if not normalized:
            return "lain_lain", 0.5

        probs = pipeline.predict_proba([normalized])[0]
        best_idx = int(probs.argmax())
        label = str(pipeline.classes_[best_idx])
        confidence = round(float(probs[best_idx]), 4)
        return label, confidence


intent_service = IntentService()

