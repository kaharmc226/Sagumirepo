import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  MOCK_ANALYTICS_SUMMARY,
  MOCK_PRODUCTS,
  MOCK_SALES_TREND,
  MOCK_STOCK_FORECAST,
} from '../lib/mockData';
import { formatRupiah } from '../lib/api';
import { Card } from '../components/ui';

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState('7d');
  const [selectedProduct, setSelectedProduct] = useState('all');

  const multiplier = selectedProduct === 'all' ? 1 : 0.35;
  const chartData = MOCK_SALES_TREND.points.map((pt) => ({
    ...pt,
    total_revenue: Math.round(pt.total_revenue * multiplier),
    total_orders: Math.max(1, Math.round(pt.total_orders * multiplier)),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Analytics &amp; Stock Forecast</h1>
          <p className="text-sm text-stone-500">
            Pesanan <code className="font-mono">DIBATALKAN</code> dikecualikan dari seluruh metrik.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm"
          >
            <option value="7d">7 hari terakhir</option>
            <option value="30d">30 hari terakhir</option>
          </select>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm"
          >
            <option value="all">Semua Produk</option>
            {MOCK_PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs text-stone-500">Total Pesanan ({range})</p>
          <p className="mt-1 text-2xl font-bold">{MOCK_ANALYTICS_SUMMARY.total_orders}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-stone-500">Total Omzet</p>
          <p className="mt-1 text-2xl font-bold text-sagumi-700">
            {formatRupiah(MOCK_ANALYTICS_SUMMARY.total_revenue)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-stone-500">Rata-rata Nilai Pesanan</p>
          <p className="mt-1 text-2xl font-bold">
            {formatRupiah(MOCK_ANALYTICS_SUMMARY.average_order_value)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-stone-500">Horizon Forecast</p>
          <p className="mt-1 text-2xl font-bold">{MOCK_STOCK_FORECAST.horizon_days} hari</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h2 className="font-semibold text-stone-900">Tren Omzet Harian</h2>
          <p className="mb-4 text-xs text-stone-500">
            Sumber Sprint 3: <code className="font-mono">GET /api/v1/admin/analytics/sales-trend</code>
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                />
                <Tooltip formatter={(value) => formatRupiah(value)} />
                <Area
                  type="monotone"
                  dataKey="total_revenue"
                  name="Omzet"
                  stroke="#c46628"
                  fill="#faeee0"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-3 p-5">
          <h2 className="font-semibold text-stone-900">Produk Terlaris</h2>
          <div className="space-y-3">
            {MOCK_ANALYTICS_SUMMARY.top_products.map((prod, idx) => (
              <div
                key={prod.product_id}
                className="flex items-center justify-between border-b border-stone-100 pb-2 text-sm last:border-0"
              >
                <div>
                  <p className="font-medium text-stone-900">
                    {idx + 1}. {prod.name}
                  </p>
                  <p className="text-xs text-stone-500">{prod.total_qty} terjual</p>
                </div>
                <span className="font-semibold text-sagumi-700">
                  {formatRupiah(prod.total_revenue)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 px-5 py-4">
          <div>
            <h2 className="font-semibold text-stone-900">
              Prediksi Kebutuhan Stok ({MOCK_STOCK_FORECAST.horizon_days} Hari ke Depan)
            </h2>
            <p className="text-xs text-stone-500">
              Sumber Sprint 3: <code className="font-mono">GET /api/v1/admin/analytics/stock-forecast</code>
            </p>
          </div>
          <span className="rounded bg-stone-100 px-2.5 py-1 font-mono text-xs text-stone-600">
            model: {MOCK_STOCK_FORECAST.model_used}
          </span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase text-stone-500">
            <tr>
              <th className="px-5 py-3">Produk</th>
              <th className="px-5 py-3">Rata-rata / Hari</th>
              <th className="px-5 py-3">Prediksi Permintaan</th>
              <th className="px-5 py-3">Rekomendasi Stok (+Buffer)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {MOCK_STOCK_FORECAST.items.map((item) => (
              <tr key={item.product_id} className="hover:bg-stone-50">
                <td className="px-5 py-3 font-medium text-stone-900">{item.product_name}</td>
                <td className="px-5 py-3">{item.avg_daily_sales} pcs</td>
                <td className="px-5 py-3">{item.predicted_demand} pcs</td>
                <td className="px-5 py-3 font-bold text-sagumi-700">
                  {item.recommended_stock} pcs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
