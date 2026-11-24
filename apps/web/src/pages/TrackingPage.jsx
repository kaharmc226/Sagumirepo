import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { MOCK_TRACK_ORDERS } from '../lib/mockData';
import { formatDateTime, formatRupiah } from '../lib/api';
import { Button, Card, Input, StatusBadge } from '../components/ui';

const ORDER_STEPS = ['MENUNGGU_KONFIRMASI', 'DIPROSES', 'SIAP_DIKIRIM', 'SELESAI'];

export default function TrackingPage() {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || 'SGM-20261124-A1B2';
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState(
    MOCK_TRACK_ORDERS[initialCode] || {
      ...MOCK_TRACK_ORDERS['SGM-20261124-A1B2'],
      reference_code: initialCode,
    },
  );

  function lookup(targetCode) {
    const normalized = targetCode.trim().toUpperCase();
    if (!normalized) return;
    setCode(normalized);
    setResult(
      MOCK_TRACK_ORDERS[normalized] || {
        ...MOCK_TRACK_ORDERS['SGM-20261124-A1B2'],
        reference_code: normalized,
      },
    );
  }

  function handleSearch(e) {
    e.preventDefault();
    lookup(code);
  }

  const activeStepIndex = ORDER_STEPS.indexOf(result?.status);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Lacak Pesanan</h1>
          <p className="text-xs text-stone-500">
            Menampilkan status &amp; ringkasan item aman (tanpa data HP/alamat pribadi).
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
          Mockup UI · Sprint 1
        </span>
      </div>

      <Card className="space-y-3 p-5">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Masukkan kode referensi, mis. SGM-20261124-A1B2"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <Button type="submit">
            <Search className="h-4 w-4" />
            <span>Cari</span>
          </Button>
        </form>
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span>Contoh kode:</span>
          {Object.keys(MOCK_TRACK_ORDERS).map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => lookup(sample)}
              className="rounded border border-stone-200 bg-stone-50 px-2 py-0.5 font-mono hover:border-sagumi-400 hover:text-sagumi-700"
            >
              {sample}
            </button>
          ))}
        </div>
      </Card>

      {result && (
        <Card className="space-y-6 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <p className="text-xs text-stone-500">Kode Referensi</p>
              <p className="font-mono text-lg font-bold">{result.reference_code}</p>
            </div>
            <StatusBadge status={result.status} />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ORDER_STEPS.map((step, idx) => {
              const reached = activeStepIndex >= idx;
              return (
                <div
                  key={step}
                  className={`rounded-lg border px-2.5 py-2 text-center text-[11px] font-medium ${
                    reached
                      ? 'border-sagumi-300 bg-sagumi-50 text-sagumi-800'
                      : 'border-stone-200 bg-stone-50 text-stone-400'
                  }`}
                >
                  {idx + 1}. {step.replaceAll('_', ' ')}
                </div>
              );
            })}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-stone-700">Item Pesanan</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {result.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {item.qty}x {item.product_name}
                  </span>
                  <span className="font-medium">{formatRupiah(item.line_total)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-stone-100 pt-2 font-bold">
              <span>Total</span>
              <span className="text-sagumi-700">{formatRupiah(result.total)}</span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-stone-700">Riwayat Status</h2>
            <ol className="mt-2 space-y-3 border-l-2 border-sagumi-200 pl-4 text-sm">
              {result.history.map((h, idx) => (
                <li key={idx}>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <p className="font-medium text-stone-900">{h.status.replaceAll('_', ' ')}</p>
                    <span className="text-xs text-stone-400">{formatDateTime(h.created_at)}</span>
                  </div>
                  <p className="text-xs text-stone-500">{h.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </Card>
      )}
    </div>
  );
}
