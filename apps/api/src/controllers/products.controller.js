import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/AppError.js';

export async function listProducts(req, res, next) {
  try {
    let query = supabase
      .from('products')
      .select('id, name, slug, description, price, image_url, is_available')
      .order('created_at', { ascending: true });

    if (req.query.available === 'true') {
      query = query.eq('is_available', true);
    }

    const { data, error } = await query;
    if (error) {
      throw new AppError(500, 'INTERNAL_ERROR', 'Gagal mengambil daftar produk');
    }

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    return next(err);
  }
}

export async function getProductBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, description, price, image_url, is_available')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      throw new AppError(500, 'INTERNAL_ERROR', 'Gagal mengambil detail produk');
    }

    if (!data) {
      throw new AppError(404, 'NOT_FOUND', 'Produk tidak ditemukan');
    }

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    return next(err);
  }
}
