from fastapi import APIRouter

from app.schemas import HealthResponse, ModelsHealth
from app.services.chat_service import chat_service
from app.services.intent_service import intent_service

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    intent_ok = intent_service.is_loaded
    rag_ok = chat_service.is_loaded
    return HealthResponse(
        status="ok" if (intent_ok and rag_ok) else "degraded",
        models=ModelsHealth(
            intent_classifier="loaded" if intent_ok else "not_loaded",
            rag_index="loaded" if rag_ok else "not_loaded",
        ),
    )

