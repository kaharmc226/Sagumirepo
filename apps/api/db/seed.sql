-- ============================================================================
-- Sagumi (A26-CS277) — Initial Seed Data (Katalog Produk & FAQ Awal)
-- CATATAN: Data di bawah adalah data sintetis/placeholder awal untuk
-- pengembangan Minggu 1 sambil menunggu konfirmasi final harga & foto dari
-- Owner Sagumi (Ibu Hajar).
-- ============================================================================

INSERT INTO products (name, slug, description, price, image_url, is_available)
VALUES
  ('Keripik Sagu Original', 'keripik-sagu-original', 'Cemilan keripik sagu renyah rasa original khas Kendari.', 15000, NULL, TRUE),
  ('Keripik Sagu Pedas', 'keripik-sagu-pedas', 'Keripik sagu renyah dengan balutan bumbu pedas gurih.', 16000, NULL, TRUE),
  ('Keripik Sagu Keju', 'keripik-sagu-keju', 'Keripik sagu dengan taburan keju gurih.', 18000, NULL, TRUE),
  ('Bagea Sagu Klasik', 'bagea-sagu-klasik', 'Kue bagea tradisional berbahan sagu khas Sulawesi Tenggara.', 20000, NULL, TRUE),
  ('Bagea Sagu Kenari', 'bagea-sagu-kenari', 'Bagea sagu panggang dengan campuran kacang kenari.', 25000, NULL, TRUE),
  ('Bagea Sagu Cokelat', 'bagea-sagu-cokelat', 'Varian modern kue bagea sagu dengan rasa cokelat.', 24000, NULL, TRUE),
  ('Kue Sagu Keju Toples', 'kue-sagu-keju-toples', 'Kue kering sagu keju lumer kemasan toples.', 45000, NULL, TRUE),
  ('Stick Sagu Balado', 'stick-sagu-balado', 'Stik sagu goreng renyah rasa balado.', 15000, NULL, TRUE),
  ('Stick Sagu Rumput Laut', 'stick-sagu-rumput-laut', 'Stik sagu renyah dengan taburan rumput laut.', 17000, NULL, TRUE),
  ('Brownies Sagu Panggang', 'brownies-sagu-panggang', 'Brownies panggang bebas gluten berbahan dasar tepung sagu.', 35000, NULL, TRUE),
  ('Kue Bangkit Sagu Pandan', 'kue-bangkit-sagu-pandan', 'Kue bangkit sagu aroma pandan wangi.', 22000, NULL, TRUE),
  ('Paket Oleh-Oleh Sagumi Hemat', 'paket-oleh-oleh-sagumi-hemat', 'Paket bundling isi 3 varian cemilan sagu pilihan.', 50000, NULL, TRUE)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO faqs (question, answer, category)
VALUES
  ('Jam operasional Sagumi buka jam berapa?', 'Sagumi melayani pemesanan online setiap hari pukul 08.00–20.00 WITA.', 'operasional'),
  ('Bagaimana cara memesan produk Sagumi?', 'Pilih produk di katalog, isi formulir pemesanan, unggah bukti transfer, lalu simpan ID Referensi untuk melacak status pesanan.', 'pemesanan'),
  ('Bagaimana cara melacak status pesanan?', 'Masukkan ID Referensi (contoh: SGM-20261123-A1B2) pada halaman Lacak Pesanan.', 'pemesanan'),
  ('Apakah produk Sagumi aman dikirim ke luar kota?', 'Ya, produk dikemas rapat sehingga aman untuk pengiriman dalam maupun luar kota Kendari.', 'pengiriman'),
  ('Berapa lama pesanan diproses setelah pembayaran?', 'Pesanan diverifikasi dan diproses sesuai urutan antrian (FIFO) pada hari yang sama atau maksimal H+1 kerja.', 'pemesanan');
