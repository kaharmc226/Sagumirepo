-- ============================================================================
-- Sagumi (A26-CS277) — Supabase PostgreSQL Schema
-- Jalankan file ini di Supabase Dashboard -> SQL Editor
-- ============================================================================

-- Ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. products
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price INTEGER NOT NULL CHECK (price >= 0),
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_available ON products (is_available);

-- ----------------------------------------------------------------------------
-- 2. orders
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  subtotal INTEGER NOT NULL CHECK (subtotal >= 0),
  shipping_fee INTEGER NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
  total INTEGER NOT NULL CHECK (total >= 0),
  payment_proof_url TEXT,
  status TEXT NOT NULL DEFAULT 'MENUNGGU_KONFIRMASI'
    CHECK (status IN (
      'MENUNGGU_KONFIRMASI',
      'DIPROSES',
      'SIAP_DIKIRIM',
      'SELESAI',
      'DIBATALKAN'
    )),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index untuk antrian FIFO (created_at ASC) dan tracking
CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders (status, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_orders_reference_code ON orders (reference_code);

-- ----------------------------------------------------------------------------
-- 3. order_items
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id UUID REFERENCES products (id) ON DELETE SET NULL,
  product_name_snapshot TEXT NOT NULL,
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_price INTEGER NOT NULL CHECK (unit_price >= 0),
  line_total INTEGER NOT NULL CHECK (line_total >= 0)
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items (product_id);

-- ----------------------------------------------------------------------------
-- 4. order_status_history
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN (
    'MENUNGGU_KONFIRMASI',
    'DIPROSES',
    'SIAP_DIKIRIM',
    'SELESAI',
    'DIBATALKAN'
  )),
  note TEXT,
  changed_by TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id
  ON order_status_history (order_id, created_at ASC);

-- ----------------------------------------------------------------------------
-- 5. chat_messages (riwayat chatbot & sliding window history)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  message TEXT NOT NULL,
  intent TEXT,
  sources JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_created
  ON chat_messages (session_id, created_at ASC);

-- ----------------------------------------------------------------------------
-- 6. faqs (knowledge base untuk RAG)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'umum',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. owner_users (autentikasi dashboard Owner)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS owner_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT 'Owner Sagumi',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- Trigger otomatis untuk update kolom updated_at
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_orders_updated_at ON orders;
CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
