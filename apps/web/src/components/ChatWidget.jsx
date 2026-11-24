import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: 'Halo kak! Saya Asisten AI Sagumi. Ada yang bisa dibantu soal produk sagu, harga, atau cara pesan?',
    intent: null,
  },
];

const QUICK_PROMPTS = [
  'Keripik sagu pedas harganya berapa?',
  'Bagaimana cara memesan?',
  'Pesanan saya belum sampai',
];

function mockReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes('belum') || lower.includes('rusak') || lower.includes('komplain') || lower.includes('keluh')) {
    return {
      intent: 'keluhan',
      text: 'Mohon maaf atas ketidaknyamanannya kak. Untuk penanganan cepat, silakan hubungi langsung Owner Sagumi melalui WhatsApp resmi dengan menyertakan kode referensi pesanan.',
    };
  }
  if (lower.includes('pesan') || lower.includes('order') || lower.includes('beli')) {
    return {
      intent: 'pemesanan',
      text: 'Cara pesan mudah kak: pilih produk di Katalog, buka Keranjang/Checkout, isi alamat, unggah bukti transfer, lalu simpan kode referensi (SGM-...) untuk melacak pesanan.',
    };
  }
  if (lower.includes('harga') || lower.includes('pedas') || lower.includes('produk') || lower.includes('sagu')) {
    return {
      intent: 'tanya_produk',
      text: 'Keripik Sagu Original Rp15.000, Keripik Sagu Pedas Rp16.000, dan Bagea Sagu Kenari Rp25.000 kak. Semua varian lengkap bisa dilihat di halaman Katalog.',
    };
  }
  return {
    intent: 'lain_lain',
    text: 'Ini balasan mockup (Sprint 1). Di Sprint 2 widget ini terhubung ke POST /api/v1/chat (Intent Classifier + RAG + Gemini).',
  };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  function sendText(rawText) {
    const text = rawText.trim();
    if (!text) return;
    const reply = mockReply(text);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text, intent: null },
      { role: 'assistant', text: reply.text, intent: reply.intent },
    ]);
    setInput('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendText(input);
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open ? (
        <div className="flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl sm:w-96">
          <div className="flex items-center justify-between bg-sagumi-600 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Asisten Sagumi</p>
              <p className="text-[11px] text-sagumi-100">Mockup UI · Sprint 1</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup chat"
              className="rounded p-1 hover:bg-sagumi-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto p-3 text-sm">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 ${
                    m.role === 'user'
                      ? 'bg-sagumi-600 text-white'
                      : 'bg-stone-100 text-stone-800'
                  }`}
                >
                  {m.text}
                </div>
                {m.intent && (
                  <span className="mt-1 px-1 text-[10px] font-mono text-stone-400">
                    intent: {m.intent}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-stone-100 bg-stone-50 px-3 py-2">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendText(q)}
                className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-[11px] text-stone-600 hover:border-sagumi-300 hover:text-sagumi-700"
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-stone-200 p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya harga atau cara pesan..."
              className="flex-1 rounded-lg border border-stone-300 px-3 py-1.5 text-sm focus:border-sagumi-500 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Kirim"
              className="rounded-lg bg-sagumi-600 p-2 text-white hover:bg-sagumi-700"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-sagumi-600 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-sagumi-700"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Tanya Sagumi</span>
        </button>
      )}
    </div>
  );
}
