export const MOCK_PRODUCTS = [
  {
    id: 'mock-1',
    name: 'Keripik Sagu Original',
    slug: 'keripik-sagu-original',
    description: 'Cemilan keripik sagu renyah rasa original khas Kendari.',
    price: 15000,
    image_url: null,
    is_available: true,
  },
  {
    id: 'mock-2',
    name: 'Keripik Sagu Pedas',
    slug: 'keripik-sagu-pedas',
    description: 'Keripik sagu renyah dengan balutan bumbu pedas gurih.',
    price: 16000,
    image_url: null,
    is_available: true,
  },
  {
    id: 'mock-3',
    name: 'Bagea Sagu Kenari',
    slug: 'bagea-sagu-kenari',
    description: 'Bagea sagu panggang dengan campuran kacang kenari.',
    price: 25000,
    image_url: null,
    is_available: true,
  },
  {
    id: 'mock-4',
    name: 'Kue Sagu Keju Toples',
    slug: 'kue-sagu-keju-toples',
    description: 'Kue kering sagu keju lumer kemasan toples.',
    price: 45000,
    image_url: null,
    is_available: true,
  },
  {
    id: 'mock-5',
    name: 'Brownies Sagu Panggang',
    slug: 'brownies-sagu-panggang',
    description: 'Brownies panggang bebas gluten berbahan dasar tepung sagu.',
    price: 35000,
    image_url: null,
    is_available: true,
  },
  {
    id: 'mock-6',
    name: 'Paket Oleh-Oleh Sagumi Hemat',
    slug: 'paket-oleh-oleh-sagumi-hemat',
    description: 'Paket bundling isi 3 varian cemilan sagu pilihan.',
    price: 50000,
    image_url: null,
    is_available: true,
  },
];

export const MOCK_TRACK_ORDERS = {
  'SGM-20261124-A1B2': {
    reference_code: 'SGM-20261124-A1B2',
    status: 'DIPROSES',
    total: 46000,
    items: [
      { product_name: 'Keripik Sagu Original', qty: 2, unit_price: 15000, line_total: 30000 },
      { product_name: 'Keripik Sagu Pedas', qty: 1, unit_price: 16000, line_total: 16000 },
    ],
    history: [
      {
        status: 'MENUNGGU_KONFIRMASI',
        note: 'Pesanan diterima, menunggu verifikasi bukti transfer',
        created_at: '2026-11-24T01:15:00Z',
      },
      {
        status: 'DIPROSES',
        note: 'Pembayaran terverifikasi, masuk antrian produksi FIFO',
        created_at: '2026-11-24T01:40:00Z',
      },
    ],
    created_at: '2026-11-24T01:15:00Z',
    updated_at: '2026-11-24T01:40:00Z',
  },
  'SGM-20261124-9F3C': {
    reference_code: 'SGM-20261124-9F3C',
    status: 'MENUNGGU_KONFIRMASI',
    total: 55000,
    items: [
      { product_name: 'Keripik Sagu Original', qty: 2, unit_price: 15000, line_total: 30000 },
      { product_name: 'Bagea Sagu Kenari', qty: 1, unit_price: 25000, line_total: 25000 },
    ],
    history: [
      {
        status: 'MENUNGGU_KONFIRMASI',
        note: 'Pesanan diterima, menunggu verifikasi Owner',
        created_at: '2026-11-24T01:05:00Z',
      },
    ],
    created_at: '2026-11-24T01:05:00Z',
    updated_at: '2026-11-24T01:05:00Z',
  },
};

export const MOCK_FIFO_QUEUE = [
  {
    id: 'ord-3',
    reference_code: 'SGM-20261124-7D10',
    customer_name: 'Dewi Lestari',
    customer_phone: '081344556677',
    address: 'Jl. MT Haryono No. 22, Kendari',
    notes: 'Kirim sebelum jam 5 sore',
    items: [{ product_name: 'Brownies Sagu Panggang', qty: 1, unit_price: 35000, line_total: 35000 }],
    total: 35000,
    status: 'SIAP_DIKIRIM',
    payment_proof_label: 'transfer-bri-dewi.jpg',
    created_at: '2026-11-24T00:45:00Z',
  },
  {
    id: 'ord-1',
    reference_code: 'SGM-20261124-9F3C',
    customer_name: 'Siti Rahma',
    customer_phone: '082199887766',
    address: 'Jl. Diponegoro No. 4, Kendari',
    notes: 'Mohon dipacking dus',
    items: [
      { product_name: 'Keripik Sagu Original', qty: 2, unit_price: 15000, line_total: 30000 },
      { product_name: 'Bagea Sagu Kenari', qty: 1, unit_price: 25000, line_total: 25000 },
    ],
    total: 55000,
    status: 'MENUNGGU_KONFIRMASI',
    payment_proof_label: 'transfer-bca-siti.jpg',
    created_at: '2026-11-24T01:05:00Z',
  },
  {
    id: 'ord-2',
    reference_code: 'SGM-20261124-A1B2',
    customer_name: 'Budi Santoso',
    customer_phone: '081234567890',
    address: 'Jl. Ahmad Yani No. 10, Kendari',
    notes: 'Tolong dibungkus rapi untuk oleh-oleh',
    items: [
      { product_name: 'Keripik Sagu Original', qty: 2, unit_price: 15000, line_total: 30000 },
      { product_name: 'Keripik Sagu Pedas', qty: 1, unit_price: 16000, line_total: 16000 },
    ],
    total: 46000,
    status: 'DIPROSES',
    payment_proof_label: 'transfer-mandiri-budi.png',
    created_at: '2026-11-24T01:15:00Z',
  },
  {
    id: 'ord-4',
    reference_code: 'SGM-20261124-C4E8',
    customer_name: 'Arif Pratama',
    customer_phone: '085211223344',
    address: 'Jl. Malaka No. 8, Anduonohu, Kendari',
    notes: '',
    items: [
      { product_name: 'Paket Oleh-Oleh Sagumi Hemat', qty: 2, unit_price: 50000, line_total: 100000 },
    ],
    total: 100000,
    status: 'MENUNGGU_KONFIRMASI',
    payment_proof_label: 'qris-arif.webp',
    created_at: '2026-11-24T01:35:00Z',
  },
];

export const MOCK_ANALYTICS_SUMMARY = {
  total_orders: 120,
  total_revenue: 5400000,
  average_order_value: 45000,
  pending_orders: 2,
  top_products: [
    { product_id: 'mock-1', name: 'Keripik Sagu Original', total_qty: 180, total_revenue: 2700000 },
    { product_id: 'mock-2', name: 'Keripik Sagu Pedas', total_qty: 115, total_revenue: 1840000 },
    { product_id: 'mock-3', name: 'Bagea Sagu Kenari', total_qty: 68, total_revenue: 1700000 },
    { product_id: 'mock-5', name: 'Brownies Sagu Panggang', total_qty: 42, total_revenue: 1470000 },
  ],
};

export const MOCK_SALES_TREND = {
  interval: 'daily',
  points: [
    { date: '18 Nov', total_orders: 12, total_revenue: 520000, total_qty: 28 },
    { date: '19 Nov', total_orders: 15, total_revenue: 675000, total_qty: 34 },
    { date: '20 Nov', total_orders: 11, total_revenue: 495000, total_qty: 25 },
    { date: '21 Nov', total_orders: 19, total_revenue: 860000, total_qty: 43 },
    { date: '22 Nov', total_orders: 24, total_revenue: 1120000, total_qty: 56 },
    { date: '23 Nov', total_orders: 21, total_revenue: 945000, total_qty: 48 },
    { date: '24 Nov', total_orders: 18, total_revenue: 785000, total_qty: 40 },
  ],
};

export const MOCK_STOCK_FORECAST = {
  horizon_days: 7,
  model_used: 'moving_average_baseline',
  items: [
    {
      product_id: 'mock-1',
      product_name: 'Keripik Sagu Original',
      avg_daily_sales: 6.5,
      predicted_demand: 46,
      recommended_stock: 52,
    },
    {
      product_id: 'mock-2',
      product_name: 'Keripik Sagu Pedas',
      avg_daily_sales: 4.8,
      predicted_demand: 34,
      recommended_stock: 40,
    },
    {
      product_id: 'mock-3',
      product_name: 'Bagea Sagu Kenari',
      avg_daily_sales: 3.1,
      predicted_demand: 22,
      recommended_stock: 26,
    },
    {
      product_id: 'mock-5',
      product_name: 'Brownies Sagu Panggang',
      avg_daily_sales: 2.2,
      predicted_demand: 16,
      recommended_stock: 20,
    },
  ],
};
