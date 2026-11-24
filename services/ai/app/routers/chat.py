from fastapi import APIRouter

from app.schemas import ChatRequest, ChatResponse
from app.services.chat_service import chat_service

router = APIRouter(tags=["Chat"])


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    answer, sources = chat_service.generate_reply(
        message=payload.message,
        intent=payload.intent,
        history=payload.history,
    )
    return ChatResponse(answer=answer, sources=sources)

