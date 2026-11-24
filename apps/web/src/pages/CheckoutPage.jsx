import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Copy, Trash2, Upload } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { formatRupiah } from '../lib/api';
import { Button, Card, Input, Textarea } from '../components/ui';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_BYTES = 5 * 1024 * 1024;

export default function CheckoutPage() {
  const { items, subtotal, updateQty, clearCart, showToast } = useCart();
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    address: '',
    notes: '',
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const [submittedRef, setSubmittedRef] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    setFileError('');
    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setFileError('Format file harus JPG, PNG, atau WebP.');
      return;
    }
    if (selected.size > MAX_FILE_BYTES) {
      setFileError('Ukuran file maksimal 5 MB.');
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setFileError('Mohon unggah foto bukti transfer terlebih dahulu.');
      return;
    }
    const hex = Math.random().toString(16).slice(2, 6).toUpperCase().padEnd(4, '0');
    const today = new Date().toISOString().slice(0, 10).replaceAll('-', '');
    setSubmittedRef(`SGM-${today}-${hex}`);
    clearCart();
  }

  function copyReference() {
    navigator.clipboard?.writeText(submittedRef);
    showToast('Kode referensi disalin');
  }

  if (submittedRef) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h1 className="mt-3 text-xl font-bold">Pesanan Diterima (Mockup)</h1>
        <p className="mt-1 text-sm text-stone-600">
          Simpan ID Referensi berikut untuk melacak status pesanan Anda di antrian FIFO Sagumi:
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-sagumi-50 px-4 py-3">
          <span className="font-mono text-lg font-bold text-sagumi-800">{submittedRef}</span>
          <button
            type="button"
            onClick={copyReference}
            aria-label="Salin kode"
            className="rounded-lg p-1.5 text-sagumi-700 hover:bg-sagumi-100"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-xs text-stone-500">
          Status awal: <strong>MENUNGGU KONFIRMASI</strong>
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to={`/track?code=${encodeURIComponent(submittedRef)}`}>
            <Button>Lacak Pesanan</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Kembali ke Katalog</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
          Mockup UI · Sprint 1
        </span>
      </div>

      {items.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-stone-600">Keranjang belanja masih kosong.</p>
          <Link to="/" className="mt-3 inline-block text-sm font-medium text-sagumi-700 underline">
            Pilih produk di Katalog
          </Link>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <Card className="space-y-4 p-5 lg:col-span-2">
            <h2 className="font-semibold text-stone-900">Data Pemesan</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="customer-name"
                name="customer_name"
                autoComplete="name"
                label="Nama Lengkap"
                required
                placeholder="Budi Santoso"
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              />
              <Input
                id="customer-phone"
                name="customer_phone"
                autoComplete="tel"
                label="Nomor WhatsApp / HP"
                required
                placeholder="081234567890"
                value={form.customer_phone}
                onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
              />
            </div>
            <Textarea
              id="customer-address"
              name="address"
              autoComplete="street-address"
              label="Alamat Pengiriman"
              required
              rows={2}
              placeholder="Jl. Ahmad Yani No. 10, Kendari"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <Input
              id="order-notes"
              name="notes"
              label="Catatan (opsional)"
              placeholder="Tolong dibungkus rapi untuk oleh-oleh"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <div className="space-y-2 border-t border-stone-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-700">
                  Bukti Transfer (JPG/PNG/WebP, maks 5 MB)
                </span>
                {file && (
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      if (previewUrl) URL.revokeObjectURL(previewUrl);
                      setPreviewUrl('');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Hapus</span>
                  </button>
                )}
              </div>

              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-sm text-stone-600 hover:bg-stone-100">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview bukti transfer"
                    className="max-h-48 rounded-lg border border-stone-200 object-contain"
                  />
                ) : (
                  <>
                    <Upload className="h-5 w-5 text-sagumi-600" />
                    <span>Klik untuk memilih foto bukti transfer</span>
                  </>
                )}
                {file && <span className="text-xs text-stone-500">{file.name}</span>}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {fileError && <p className="text-xs text-red-600">{fileError}</p>}
            </div>
          </Card>

          <Card className="flex flex-col justify-between space-y-4 p-5">
            <div className="space-y-3">
              <h2 className="font-semibold text-stone-900">Ringkasan Pesanan</h2>
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
                  <div>
                    <p className="font-medium text-stone-900">{item.name}</p>
                    <p className="text-xs text-stone-500">{formatRupiah(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="h-6 w-6 rounded border border-stone-300 text-xs hover:bg-stone-100"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-xs">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="h-6 w-6 rounded border border-stone-300 text-xs hover:bg-stone-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-stone-200 pt-4">
              <div className="flex justify-between text-sm text-stone-600">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-600">
                <span>Ongkir (estimasi)</span>
                <span>Rp0</span>
              </div>
              <div className="flex justify-between border-t border-stone-100 pt-2 font-bold">
                <span>Total</span>
                <span className="text-sagumi-700">{formatRupiah(subtotal)}</span>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Buat Pesanan
              </Button>
            </div>
          </Card>
        </form>
      )}
    </div>
  );
}
