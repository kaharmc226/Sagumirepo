import { Link, NavLink, Outlet } from 'react-router-dom';
import { ShoppingBag, Search, LayoutDashboard, Store } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { Toast } from './ui';
import ChatWidget from './ChatWidget';

export default function Layout() {
  const { totalItems, toast } = useCart();

  const navClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-sagumi-100 text-sagumi-900' : 'text-stone-600 hover:bg-stone-100'
    }`;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-sagumi-800">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sagumi-600 text-white shadow-sm">
              S
            </span>
            <span className="text-lg tracking-tight">Sagumi</span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink to="/" end className={navClass}>
              <Store className="h-4 w-4" />
              <span>Katalog</span>
            </NavLink>
            <NavLink to="/track" className={navClass}>
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Lacak Pesanan</span>
              <span className="sm:hidden">Lacak</span>
            </NavLink>
            <NavLink to="/checkout" className={navClass}>
              <ShoppingBag className="h-4 w-4" />
              <span>Keranjang</span>
              {totalItems > 0 && (
                <span className="rounded-full bg-sagumi-600 px-1.5 py-0.5 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </NavLink>
            <NavLink to="/admin" className={navClass}>
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Owner</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        Sagumi — Cemilan &amp; Oleh-Oleh Sagu Khas Kendari · Capstone A26-CS277
      </footer>

      <Toast message={toast} />
      <ChatWidget />
    </div>
  );
}
