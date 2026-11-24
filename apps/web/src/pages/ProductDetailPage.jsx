import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, ShoppingBag } from 'lucide-react';
import { api, formatRupiah } from '../lib/api';
import { MOCK_PRODUCTS } from '../lib/mockData';
import { useCart } from '../lib/CartContext';
import { Button, Card, Loader } from '../components/ui';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    let active = true;
    api
      .get(`/products/${slug}`)
      .then((res) => active && setProduct(res.data?.data))
      .catch(() => {
        if (!active) return;
        setProduct(MOCK_PRODUCTS.find((p) => p.slug === slug) || null);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) return <Loader text="Memuat detail produk..." />;

  if (!product) {
    return (
      <Card className="p-8 text-center">
        <p className="text-stone-600">Produk tidak ditemukan.</p>
        <Link to="/" className="mt-3 inline-block text-sm font-medium text-sagumi-700 underline">
          Kembali ke Katalog
        </Link>
      </Card>
    );
  }

  function handleBuyNow() {
    addItem(product, qty);
    navigate('/checkout');
  }

  return (
    <div className="space-y-4">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900">
        <ArrowLeft className="h-4 w-4" />
        <span>Kembali ke Katalog</span>
      </Link>

      <Card className="grid gap-6 overflow-hidden p-6 md:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-sagumi-100 to-sagumi-200/70 p-4 text-center text-sagumi-800 md:h-80">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="h-full w-full rounded-xl object-cover" />
          ) : (
            <span className="text-base font-semibold">{product.name}</span>
          )}
        </div>

        <div className="flex flex-col justify-between space-y-4">
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
              {product.is_available ? 'Tersedia' : 'Habis'}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-stone-900">{product.name}</h1>
            <p className="mt-2 text-2xl font-bold text-sagumi-700">{formatRupiah(product.price)}</p>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">{product.description}</p>
          </div>

          <div className="space-y-3 border-t border-stone-100 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700">Jumlah</span>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 rounded-lg border border-stone-300 px-3 py-1.5 text-center text-sm"
              />
              <span className="text-sm text-stone-500">
                Subtotal: <strong className="text-stone-900">{formatRupiah(product.price * qty)}</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => addItem(product, qty)} className="flex-1">
                <Plus className="h-4 w-4" />
                <span>Tambah ke Keranjang</span>
              </Button>
              <Button variant="secondary" onClick={handleBuyNow}>
                <ShoppingBag className="h-4 w-4" />
                <span>Pesan Sekarang</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
