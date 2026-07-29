import { createContext, useEffect, useMemo, useState } from 'react';
import { products } from '../assets/assets';

export const StoreContext = createContext(null);

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read('knit-cart', {}));
  const [orders, setOrders] = useState(() => read('knit-orders', []));
  const [user, setUser] = useState(() => read('knit-user', null));

  useEffect(() => localStorage.setItem('knit-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('knit-orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('knit-user', JSON.stringify(user)), [user]);

  const addToCart = (id, size) => setCart((current) => {
    const key = `${id}:${size}`;
    return { ...current, [key]: (current[key] || 0) + 1 };
  });
  const updateQuantity = (key, quantity) => setCart((current) => {
    const next = { ...current };
    if (quantity <= 0) delete next[key]; else next[key] = quantity;
    return next;
  });
  const cartItems = Object.entries(cart).map(([key, quantity]) => {
    const [id, size] = key.split(':');
    return { key, quantity, size, product: products.find((item) => item._id === id) };
  }).filter((item) => item.product);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const placeOrder = (address, payment) => {
    const order = { id: `ORD-${Date.now().toString().slice(-7)}`, date: new Date().toISOString(), items: cartItems, total: subtotal + (subtotal ? 10 : 0), address, payment, status: 'Order Placed' };
    setOrders((current) => [order, ...current]);
    setCart({});
    return order;
  };
  const value = useMemo(() => ({ products, cartItems, cartCount: cartItems.reduce((n, item) => n + item.quantity, 0), subtotal, addToCart, updateQuantity, placeOrder, orders, user, setUser }), [cartItems, subtotal, orders, user]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
