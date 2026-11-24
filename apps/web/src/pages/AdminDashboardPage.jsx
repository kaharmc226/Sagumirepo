import { useMemo, useState } from 'react';
import { Eye, X } from 'lucide-react';
import { MOCK_FIFO_QUEUE } from '../lib/mockData';
import { formatDateTime, formatRupiah } from '../lib/api';
import { Button, Card, StatusBadge } from '../components/ui';

const NEXT_STATUS = {
  MENUNGGU_KONFIRMASI: 'DIPROSES',
  DIPROSES: 'SIAP_DIKIRIM',
  SIAP_DIKIRIM: 'SELESAI',
};

const CAN_CANCEL = new Set(['MENUNGGU_KONFIRMASI', 'DIPROSES']);

const FILTER_OPTIONS = [
  'ALL',
  'MENUNGGU_KONFIRMASI',
  'DIPROSES',
  'SIAP_DIKIRIM',
  'SELESAI',
  'DIBATALKAN',
];

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState(MOCK_FIFO_QUEUE);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const visibleOrders = useMemo(() => {
    const filtered =
      statusFilter === 'ALL' ? orders : orders.filter((o) => o.status === statusFilter);
    return [...filtered].sort((a, b) => a.created_at.localeCompare(b.created_at));
  }, [orders, statusFilter]);

  function updateStatus(id, nextStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o)));
    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
  }

  const pendingCount = orders.filter((o) => o.status === 'MENUNGGU_KONFIRMASI').length;
  const activeCount = orders.filter(
    (o) => o.status !== 'SELESAI' && o.status !== 'DIBATALKAN',
  ).length;
  const nonCancelledRevenue = orders
    .filter((o) => o.status !== 'DIBATALKAN')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Antrian Pesanan (FIFO)</h1>
        <p className="text-sm text-stone-500">
          Pesanan diurutkan dari waktu masuk paling awal (<code className="font-mono">created_at ASC</code>).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs text-stone-500">Menunggu Konfirmasi</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">{pendingCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-stone-500">Antrian Aktif</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{activeCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-stone-500">Nilai Antrian (Non-Batal)</p>
          <p className="mt-1 text-2xl font-bold text-sagumi-700">
            {formatRupiah(nonCancelledRevenue)}
          </p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setStatusFilter(opt)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              statusFilter === opt
                ? 'bg-sagumi-600 text-white'
                : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            {opt === 'ALL' ? 'Semua' : opt.replaceAll('_', ' ')}
          </button>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase text-stone-500">
            <tr>
              <th className="px-4 py-3">Waktu Masuk</th>
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Pelanggan</th>
              <th className="px-4 py-3">Ringkasan Item</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {visibleOrders.map((order) => (
              <tr key={order.id} className="hover:bg-stone-50">
                <td className="whitespace-nowrap px-4 py-3 text-xs text-stone-500">
                  {formatDateTime(order.created_at)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono font-medium">
                  {order.reference_code}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-stone-900">{order.customer_name}</p>
                  <p className="text-xs text-stone-500">{order.customer_phone}</p>
                </td>
                <td className="px-4 py-3 text-stone-600">
                  {order.items.map((i) => `${i.qty}x ${i.product_name}`).join(', ')}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-medium">
                  {formatRupiah(order.total)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                      <Eye className="h-3.5 w-3.5" />
                      <span>Detail</span>
                    </Button>
                    {NEXT_STATUS[order.status] && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => updateStatus(order.id, NEXT_STATUS[order.status])}
                      >
                        → {NEXT_STATUS[order.status].replaceAll('_', ' ')}
                      </Button>
                    )}
                    {CAN_CANCEL.has(order.status) && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => updateStatus(order.id, 'DIBATALKAN')}
                      >
                        Batal
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {visibleOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-stone-500">
                  Tidak ada pesanan pada filter status ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg space-y-4 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-sm font-bold text-sagumi-700">
                  {selectedOrder.reference_code}
                </p>
                <h2 className="text-lg font-bold text-stone-900">{selectedOrder.customer_name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded p-1 text-stone-500 hover:bg-stone-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1 text-sm text-stone-600">
              <p>
                <strong>HP/WA:</strong> {selectedOrder.customer_phone}
              </p>
              <p>
                <strong>Alamat:</strong> {selectedOrder.address}
              </p>
              {selectedOrder.notes && (
                <p>
                  <strong>Catatan:</strong> {selectedOrder.notes}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4 text-center">
              <p className="text-xs font-medium uppercase text-stone-500">
                Preview Bukti Transfer (Signed URL Placeholder)
              </p>
              <p className="mt-1 font-mono text-sm text-stone-700">
                payment-proofs/{selectedOrder.payment_proof_label}
              </p>
              <p className="mt-1 text-[11px] text-stone-400">
                Sprint 3 menampilkan gambar dari signed URL Supabase (berlaku 3600 detik).
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-3">
              <StatusBadge status={selectedOrder.status} />
              <div className="flex gap-2">
                {NEXT_STATUS[selectedOrder.status] && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(selectedOrder.id, NEXT_STATUS[selectedOrder.status])}
                  >
                    Ubah ke {NEXT_STATUS[selectedOrder.status].replaceAll('_', ' ')}
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => setSelectedOrder(null)}>
                  Tutup
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
