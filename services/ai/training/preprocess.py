"""Shared Indonesian chat text normalization for intent training and serving."""

from __future__ import annotations

import re

SLANG_MAP: dict[str, str] = {
    "brp": "berapa",
    "brapa": "berapa",
    "hrg": "harga",
    "hrga": "harga",
    "yg": "yang",
    "gmn": "bagaimana",
    "gimana": "bagaimana",
    "pesen": "pesan",
    "psn": "pesan",
    "ongkir": "ongkos kirim",
    "gak": "tidak",
    "ga": "tidak",
    "nggak": "tidak",
    "ngga": "tidak",
    "tdk": "tidak",
    "blm": "belum",
    "sdh": "sudah",
    "udah": "sudah",
    "udh": "sudah",
    "msh": "masih",
    "aja": "saja",
    "bgt": "banget",
    "bs": "bisa",
    "dgn": "dengan",
    "utk": "untuk",
    "buat": "untuk",
    "klo": "kalau",
    "klu": "kalau",
    "sy": "saya",
    "aku": "saya",
    "min": "admin",
    "makasih": "terima kasih",
    "mksh": "terima kasih",
    "thx": "terima kasih",
    "tf": "transfer",
    "trf": "transfer",
    "kerpik": "keripik",
    "origianl": "original",
}

_URL_RE = re.compile(r"https?://\S+|www\.\S+")
_NON_WORD_RE = re.compile(r"[^a-z0-9\s]")
_REPEAT_CHAR_RE = re.compile(r"(.)\1{2,}")
_MULTISPACE_RE = re.compile(r"\s+")


def normalize_indonesian_text(text: str) -> str:
    """Normalize Indonesian customer chat text for TF-IDF vectorization."""
    cleaned = (text or "").lower().strip()
    cleaned = _URL_RE.sub(" ", cleaned)
    cleaned = _NON_WORD_RE.sub(" ", cleaned)
    cleaned = _REPEAT_CHAR_RE.sub(r"\1\1", cleaned)
    tokens = [SLANG_MAP.get(tok, tok) for tok in cleaned.split()]
    return _MULTISPACE_RE.sub(" ", " ".join(tokens)).strip()

