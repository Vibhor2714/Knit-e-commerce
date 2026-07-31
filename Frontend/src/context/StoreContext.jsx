import { createContext, useEffect, useMemo, useState } from 'react';
import { products } from '../assets/assets';

export const StoreContext = createContext(null);
const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read('knit-cart', {}));
  const [orders, setOrders] = useState(() => read('knit-orders', []));
  const [user, setUser] = useState(() => read('knit-user', null));
  const [token, setToken] = useState(() => localStorage.getItem('knit-token'));

  useEffect(() => localStorage.setItem('knit-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('knit-orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('knit-user', JSON.stringify(user)), [user]);
  useEffect(() => token ? localStorage.setItem('knit-token', token) : localStorage.removeItem('knit-token'), [token]);

  const request = async (path, options = {}) => {
    if (!apiUrl) throw new Error('Backend is not configured. Add VITE_API_URL to Frontend/.env.local.');
    const response = await fetch(`${apiUrl}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Request failed.');
    return data;
  };

  useEffect(() => {
    if (!apiUrl || !token) return;
    request('/auth/me').then(({ user: account }) => setUser(account)).catch(() => { setToken(null); setUser(null); });
  // Load once whenever the saved session changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!apiUrl || !token) return;
    request('/orders').then(({ orders: savedOrders }) => setOrders(savedOrders.map((order) => ({
      id: order._id,
      date: order.createdAt,
      total: order.total,
      status: order.status,
      items: order.items.map((item) => ({ key: `${item.product}:${item.size}`, quantity: item.quantity, size: item.size, product: products.find((product) => product._id === item.product) || { name: item.name, price: item.price, image: item.image ? [item.image] : [] } }))
    })))).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!apiUrl || !token) return;
    const serverCart = Object.entries(cart).map(([key, quantity]) => { const [productId, size] = key.split(':'); return { productId, size, quantity }; });
    request('/cart', { method: 'PUT', body: JSON.stringify({ cart: serverCart }) }).catch(() => {});
  // Sync authenticated carts without blocking the storefront.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, token]);

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
  const placeOrder = async (address, payment) => {
    if (token && apiUrl) {
      const { order } = await request('/orders', { method: 'POST', body: JSON.stringify({ items: cartItems.map(({ product, quantity, size }) => ({ productId: product._id, quantity, size })), shippingAddress: address, paymentMethod: payment }) });
      setCart({});
      setOrders((current) => [{ id: order._id, date: order.createdAt, total: order.total, status: order.status, items: order.items.map((item) => ({ key: `${item.product}:${item.size}`, quantity: item.quantity, size: item.size, product: products.find((product) => product._id === item.product) || { name: item.name, price: item.price, image: item.image ? [item.image] : [] } })) }, ...current]);
      return order;
    }
    const order = { id: `ORD-${Date.now().toString().slice(-7)}`, date: new Date().toISOString(), items: cartItems, total: subtotal + (subtotal ? 10 : 0), address, payment, status: 'Order Placed' };
    setOrders((current) => [order, ...current]);
    setCart({});
    return order;
  };
  const authenticate = async (mode, credentials) => {
    const data = await request(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(credentials) });
    setToken(data.token); setUser(data.user); return data.user;
  };
  const logout = () => { setToken(null); setUser(null); };
  const value = useMemo(() => ({ products, cartItems, cartCount: cartItems.reduce((n, item) => n + item.quantity, 0), subtotal, addToCart, updateQuantity, placeOrder, orders, user, authenticate, logout, backendConfigured: Boolean(apiUrl) }), [cartItems, subtotal, orders, user, token]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
