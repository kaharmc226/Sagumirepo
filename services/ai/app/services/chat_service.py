"""RAG + Gemini chat service (starter AI-03 / AI-04)."""

from __future__ import annotations

import logging
from typing import Any

from fastapi import HTTPException

from app.config import settings
from app.schemas import ChatHistoryItem
from rag.retriever import KnowledgeRetriever

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(self) -> None:
        self.retriever = KnowledgeRetriever(kb_path=settings.kb_path)
        self._system_prompt: str = ""

    @property
    def is_loaded(self) -> bool:
        return self.retriever.is_loaded and bool(self._system_prompt)

    def load(self) -> None:
        self.retriever.load()
        self._system_prompt = settings.prompt_path.read_text(encoding="utf-8").strip()

    def _build_context_block(self, docs: list[dict[str, Any]]) -> str:
        if not docs:
            return "(Tidak ada dokumen FAQ/produk yang cocok.)"
        return "\n".join(f"- [{d['id']}] {d['content']}" for d in docs)

    def _fallback_answer(
        self,
        message: str,
        intent: str | None,
        docs: list[dict[str, Any]],
    ) -> str:
        if intent == "keluhan":
            return (
                "Mohon maaf atas kendala yang kakak alami. Silakan hubungi langsung Owner "
                "Sagumi dengan menyertakan kode referensi pesanan (SGM-...) agar segera dibantu."
            )
        if docs:
            top_lines = " ".join(d["content"] for d in docs[:2])
            return f"{top_lines} (Mode fallback lokal — isi GEMINI_API_KEY di .env untuk jawaban generatif.)"
        return (
            "Maaf kak, saya hanya dapat membantu pertanyaan seputar produk sagu, pemesanan, "
            "dan pelacakan pesanan UMKM Sagumi."
        )

    def generate_reply(
        self,
        message: str,
        intent: str | None = None,
        history: list[ChatHistoryItem] | None = None,
    ) -> tuple[str, list[str]]:
        docs = self.retriever.retrieve(message, top_k=4)
        sources = [d["id"] for d in docs]

        if not settings.has_gemini_key:
            return self._fallback_answer(message, intent, docs), sources

        try:
            from google import genai
            from google.genai import types

            client = genai.Client(api_key=settings.gemini_api_key)
            context_block = self._build_context_block(docs)

            contents: list[types.Content] = []
            for item in (history or [])[-6:]:
                gemini_role = "model" if item.role == "assistant" else "user"
                contents.append(
                    types.Content(
                        role=gemini_role,
                        parts=[types.Part.from_text(text=item.content)],
                    )
                )

            user_prompt = (
                f"Intent terdeteksi: {intent or 'tidak_diketahui'}\n"
                f"KONTEKS SAGUMI:\n{context_block}\n\n"
                f"Pertanyaan pelanggan: {message}"
            )
            contents.append(
                types.Content(
                    role="user",
                    parts=[types.Part.from_text(text=user_prompt)],
                )
            )

            response = client.models.generate_content(
                model=settings.gemini_model,
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=self._system_prompt,
                    temperature=0.3,
                ),
            )
            answer = (response.text or "").strip()
            if not answer:
                raise RuntimeError("Empty response from Gemini API")
            return answer, sources
        except Exception as exc:
            logger.exception("Gemini generation failed: %s", exc)
            raise HTTPException(
                status_code=503,
                detail={
                    "code": "AI_SERVICE_UNAVAILABLE",
                    "message": "Layanan AI sedang tidak tersedia, silakan coba beberapa saat lagi.",
                },
            ) from exc


chat_service = ChatService()

