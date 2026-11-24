"""Lightweight TF-IDF knowledge base retriever (Week 1 baseline before FAISS in AI-09)."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from training.preprocess import normalize_indonesian_text

DEFAULT_KB_PATH = Path(__file__).resolve().parent / "faqs_seed.json"


class KnowledgeRetriever:
    """In-memory TF-IDF retriever over starter FAQs and catalog descriptions."""

    def __init__(self, kb_path: Path = DEFAULT_KB_PATH) -> None:
        self.kb_path = kb_path
        self.documents: list[dict[str, Any]] = []
        self._vectorizer: TfidfVectorizer | None = None
        self._matrix = None

    @property
    def is_loaded(self) -> bool:
        return bool(self.documents) and self._matrix is not None

    def load(self) -> None:
        with self.kb_path.open("r", encoding="utf-8") as handle:
            self.documents = json.load(handle)

        corpus = [
            normalize_indonesian_text(f"{doc.get('title', '')} {doc.get('content', '')}")
            for doc in self.documents
        ]
        self._vectorizer = TfidfVectorizer(ngram_range=(1, 2), sublinear_tf=True)
        self._matrix = self._vectorizer.fit_transform(corpus)

    def retrieve(self, query: str, top_k: int = 4, min_score: float = 0.08) -> list[dict[str, Any]]:
        if not self.is_loaded or self._vectorizer is None:
            return []

        norm_query = normalize_indonesian_text(query)
        if not norm_query:
            return []

        q_vec = self._vectorizer.transform([norm_query])
        scores = cosine_similarity(q_vec, self._matrix).ravel()
        top_indices = np.argsort(scores)[::-1][:top_k]

        results: list[dict[str, Any]] = []
        for idx in top_indices:
            score = float(scores[idx])
            if score < min_score:
                continue
            doc = self.documents[int(idx)]
            results.append({**doc, "score": round(score, 4)})
        return results

