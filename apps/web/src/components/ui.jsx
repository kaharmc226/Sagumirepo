export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-sagumi-600 text-white hover:bg-sagumi-700 disabled:bg-sagumi-300',
    secondary: 'bg-sagumi-100 text-sagumi-900 hover:bg-sagumi-200',
    outline: 'border border-stone-300 bg-white text-stone-700 hover:bg-stone-50',
    danger: 'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100',
    ghost: 'text-stone-600 hover:bg-stone-100',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-stone-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm font-medium text-stone-700">{label}</span>}
      <input
        className={`w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-sagumi-500 focus:outline-none focus:ring-2 focus:ring-sagumi-200 ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm font-medium text-stone-700">{label}</span>}
      <textarea
        className={`w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-sagumi-500 focus:outline-none focus:ring-2 focus:ring-sagumi-200 ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

const STATUS_STYLES = {
  MENUNGGU_KONFIRMASI: 'bg-amber-100 text-amber-800 border-amber-200',
  DIPROSES: 'bg-blue-100 text-blue-800 border-blue-200',
  SIAP_DIKIRIM: 'bg-purple-100 text-purple-800 border-purple-200',
  SELESAI: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  DIBATALKAN: 'bg-red-100 text-red-800 border-red-200',
};

export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-stone-100 text-stone-700 border-stone-200';
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {status.replaceAll('_', ' ')}
    </span>
  );
}

export function Loader({ text = 'Memuat...' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-sm text-stone-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-sagumi-600 border-t-transparent" />
      <span>{text}</span>
    </div>
  );
}

export function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white shadow-lg sm:bottom-6">
      {message}
    </div>
  );
}
