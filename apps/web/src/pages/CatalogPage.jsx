import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Sparkles } from 'lucide-react';
import { api, formatRupiah } from '../lib/api';
import { MOCK_PRODUCTS } from '../lib/mockData';
import { useCart } from '../lib/CartContext';
import { Button, Card, Loader } from '../components/ui';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    let active = true;
    api
      .get('/products?available=true')
      .then((res) => {
        if (!active) return;
        setProducts(res.data?.data || []);
        setUsingMock(false);
      })
      .catch(() => {
        if (!active) return;
        setProducts(MOCK_PRODUCTS);
        setUsingMock(true);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q),
    );
  }, [products, search]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-sagumi-800 via-sagumi-700 to-sagumi-500 p-6 text-white shadow-sm sm:p-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Oleh-Oleh Khas Kendari</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">Cemilan Sagu Asli Sagumi</h1>
        <p className="mt-1.5 max-w-xl text-sm text-sagumi-50">
          Renyah, higienis, dan diproses sesuai urutan antrian (FIFO). Pesan online, unggah bukti
          transfer, dan lacak status pesanan kapan saja.
        </p>
      </section>

      {usingMock && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
          API belum aktif — menampilkan katalog mockup lokal. Jalankan{' '}
          <code className="font-mono font-semibold">npm run dev:api</code> untuk memuat data Supabase live.
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">Katalog Produk</h2>
          <p className="text-xs text-stone-500">
            {usingMock ? 'Mode mockup' : 'Terhubung ke Express API'} · {filteredProducts.length} produk
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari keripik, bagea, brownies..."
            className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-sagumi-500 focus:outline-none focus:ring-2 focus:ring-sagumi-200"
          />
        </div>
      </div>

      {loading ? (
        <Loader text="Memuat katalog produk..." />
      ) : filteredProducts.length === 0 ? (
        <Card className="p-8 text-center text-sm text-stone-500">
          Tidak ada produk yang cocok dengan pencarian &ldquo;{search}&rdquo;.
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
              <Link
                to={`/products/${product.slug}`}
                className="flex h-44 items-center justify-center bg-gradient-to-br from-sagumi-100 to-sagumi-200/70 px-4 text-center text-sagumi-800"
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold">{product.name}</span>
                )}
              </Link>

              <div className="flex flex-1 flex-col p-4">
                <Link
                  to={`/products/${product.slug}`}
                  className="text-base font-semibold text-stone-900 hover:text-sagumi-700"
                >
                  {product.name}
                </Link>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-stone-500">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-bold text-sagumi-700">
                    {formatRupiah(product.price)}
                  </span>
                  <Button size="sm" onClick={() => addItem(product, 1)}>
                    <Plus className="h-4 w-4" />
                    <span>Tambah</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
