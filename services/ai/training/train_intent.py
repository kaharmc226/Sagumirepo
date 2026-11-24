"""Train and evaluate the Sagumi intent classifier (AI-01 / AI-02 baseline).

Compares LogisticRegression vs CalibratedClassifierCV(LinearSVC) using
5-fold Stratified CV (macro-F1) over word + char_wb TF-IDF features,
then saves the winning bundle to services/ai/models/intent_v0.joblib.
"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import sklearn
from sklearn.calibration import CalibratedClassifierCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, f1_score
from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.pipeline import FeatureUnion, Pipeline
from sklearn.svm import LinearSVC

from training.preprocess import normalize_indonesian_text

SERVICE_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DATASET_PATH = SERVICE_ROOT / "data" / "processed" / "intent_synthetic_v0.csv"
DEFAULT_MODEL_PATH = SERVICE_ROOT / "models" / "intent_v0.joblib"
VALID_INTENTS = {"tanya_produk", "pemesanan", "keluhan", "lain_lain"}


def load_dataset(dataset_path: Path) -> tuple[list[str], list[str]]:
    texts: list[str] = []
    labels: list[str] = []
    with dataset_path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            text = (row.get("text") or "").strip()
            intent = (row.get("intent") or "").strip()
            if not text or intent not in VALID_INTENTS:
                continue
            texts.append(normalize_indonesian_text(text))
            labels.append(intent)
    if len(texts) < 12:
        raise ValueError(f"Dataset too small ({len(texts)} valid rows) in {dataset_path}")
    return texts, labels


def build_vectorizer() -> FeatureUnion:
    return FeatureUnion(
        [
            (
                "word",
                TfidfVectorizer(
                    analyzer="word",
                    ngram_range=(1, 2),
                    sublinear_tf=True,
                    min_df=1,
                ),
            ),
            (
                "char",
                TfidfVectorizer(
                    analyzer="char_wb",
                    ngram_range=(3, 5),
                    sublinear_tf=True,
                    min_df=2,
                ),
            ),
        ]
    )


def build_candidates() -> dict[str, Pipeline]:
    return {
        "logistic_regression": Pipeline(
            [
                ("features", build_vectorizer()),
                (
                    "clf",
                    LogisticRegression(
                        class_weight="balanced",
                        C=2.0,
                        max_iter=1000,
                        random_state=42,
                    ),
                ),
            ]
        ),
        "calibrated_linear_svc": Pipeline(
            [
                ("features", build_vectorizer()),
                (
                    "clf",
                    CalibratedClassifierCV(
                        estimator=LinearSVC(class_weight="balanced", C=1.0, random_state=42),
                        cv=3,
                        method="sigmoid",
                    ),
                ),
            ]
        ),
    }


def train_and_save_intent_model(
    dataset_path: Path = DEFAULT_DATASET_PATH,
    model_path: Path = DEFAULT_MODEL_PATH,
    verbose: bool = True,
) -> dict[str, Any]:
    texts, labels = load_dataset(dataset_path)
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    results: dict[str, dict[str, Any]] = {}
    best_name = ""
    best_score = -1.0
    best_pipeline: Pipeline | None = None

    for name, pipeline in build_candidates().items():
        preds = cross_val_predict(pipeline, texts, labels, cv=cv)
        macro_f1 = float(f1_score(labels, preds, average="macro"))
        results[name] = {
            "macro_f1": round(macro_f1, 4),
            "report": classification_report(labels, preds, digits=3),
        }
        if macro_f1 > best_score:
            best_score = macro_f1
            best_name = name
            best_pipeline = pipeline

    assert best_pipeline is not None
    best_pipeline.fit(texts, labels)

    model_path.parent.mkdir(parents=True, exist_ok=True)
    bundle = {
        "pipeline": best_pipeline,
        "model_name": best_name,
        "macro_f1": round(best_score, 4),
        "labels": sorted(VALID_INTENTS),
        "dataset_rows": len(texts),
        "sklearn_version": sklearn.__version__,
        "comparison": {k: v["macro_f1"] for k, v in results.items()},
    }
    joblib.dump(bundle, model_path)

    if verbose:
        print(f"Dataset: {dataset_path.name} ({len(texts)} samples)")
        for name, info in results.items():
            print(f"  - {name}: macro-F1 = {info['macro_f1']:.4f}")
        print(f"\nSelected model: {best_name} (macro-F1 = {best_score:.4f})")
        print(results[best_name]["report"])
        print(f"Saved model bundle to {model_path}")

    return bundle


def main() -> None:
    parser = argparse.ArgumentParser(description="Train Sagumi intent classifier")
    parser.add_argument("--data", type=Path, default=DEFAULT_DATASET_PATH)
    parser.add_argument("--out", type=Path, default=DEFAULT_MODEL_PATH)
    args = parser.parse_args()
    train_and_save_intent_model(dataset_path=args.data, model_path=args.out, verbose=True)


if __name__ == "__main__":
    main()

