"""Pydantic schemas aligned with docs/API_CONTRACT.md Section 4."""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field

IntentLabel = Literal["tanya_produk", "pemesanan", "keluhan", "lain_lain"]


class ModelsHealth(BaseModel):
    intent_classifier: Literal["loaded", "not_loaded"]
    rag_index: Literal["loaded", "not_loaded"]


class HealthResponse(BaseModel):
    status: Literal["ok", "degraded"]
    models: ModelsHealth


class ClassifyIntentRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=1000)


class ClassifyIntentResponse(BaseModel):
    intent: IntentLabel
    confidence: float = Field(..., ge=0.0, le=1.0)


class ChatHistoryItem(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=2000)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    intent: IntentLabel | None = None
    history: list[ChatHistoryItem] = Field(default_factory=list, max_length=10)


class ChatResponse(BaseModel):
    answer: str
    sources: list[str] = Field(default_factory=list)


class ForecastItem(BaseModel):
    product_id: str
    product_name: str
    avg_daily_sales: float
    predicted_demand: int
    recommended_stock: int


class StockForecastResponse(BaseModel):
    horizon_days: int
    model_used: str
    items: list[ForecastItem]

