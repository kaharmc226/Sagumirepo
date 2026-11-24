"""FastAPI entry point for Sagumi Internal AI Service (OPS-09)."""

from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.routers import chat, forecast, health, intent
from app.services.chat_service import chat_service
from app.services.intent_service import intent_service


@asynccontextmanager
async def lifespan(_app: FastAPI):
    intent_service.load_or_train()
    chat_service.load()
    yield


app = FastAPI(
    title="Sagumi AI Service",
    description="Internal AI microservice for intent classification, RAG + Gemini chat, and stock forecasting (A26-CS277).",
    version="0.1.0",
    lifespan=lifespan,
)

app.include_router(health.router)
app.include_router(intent.router)
app.include_router(chat.router)
app.include_router(forecast.router)

