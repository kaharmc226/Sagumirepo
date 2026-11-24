from fastapi import APIRouter, HTTPException

from app.schemas import ClassifyIntentRequest, ClassifyIntentResponse
from app.services.intent_service import intent_service

router = APIRouter(tags=["Intent"])


@router.post("/classify-intent", response_model=ClassifyIntentResponse)
def classify_intent(payload: ClassifyIntentRequest) -> ClassifyIntentResponse:
    if not intent_service.is_loaded:
        raise HTTPException(
            status_code=503,
            detail={"code": "AI_SERVICE_UNAVAILABLE", "message": "Intent model belum siap"},
        )
    intent, confidence = intent_service.predict(payload.text)
    return ClassifyIntentResponse(intent=intent, confidence=confidence)

