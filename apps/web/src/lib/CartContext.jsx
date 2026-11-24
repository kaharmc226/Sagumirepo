import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(null);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(window.__sagumiToastTimer);
    window.__sagumiToastTimer = window.setTimeout(() => setToast(null), 2400);
  }

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...product, qty }];
    });
    showToast(`${qty}x ${product.name} ditambahkan ke keranjang`);
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, clearCart, totalItems, subtotal, toast, showToast }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
