import { NavLink, Outlet } from 'react-router-dom';
import { BarChart3, ClipboardList, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const tabClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-sagumi-600 text-white shadow-sm'
        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
    }`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/admin" end className={tabClass}>
            <ClipboardList className="h-4 w-4" />
            <span>Antrian FIFO</span>
          </NavLink>
          <NavLink to="/admin/analytics" className={tabClass}>
            <BarChart3 className="h-4 w-4" />
            <span>Analytics &amp; Forecast</span>
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
            Mockup UI · Sprint 1
          </span>
          <NavLink
            to="/admin/login"
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Keluar</span>
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
