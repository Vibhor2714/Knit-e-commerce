import { Router } from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res, next) => {
  try { res.json({ orders: await Order.find({ user: req.userId }).sort({ createdAt: -1 }).lean() }); }
  catch (error) { next(error); }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!Array.isArray(items) || !items.length || !shippingAddress || !['COD', 'ONLINE'].includes(paymentMethod)) return res.status(400).json({ message: 'A valid cart, address and payment method are required.' });
    const ids = items.map((item) => item.productId);
    const products = await Product.find({ sku: { $in: ids }, isActive: true }).lean();
    if (products.length !== new Set(ids).size) return res.status(400).json({ message: 'One or more products are unavailable.' });
    const productById = new Map(products.map((product) => [product.sku, product]));
    const orderItems = items.map((item) => {
      const product = productById.get(item.productId);
      const quantity = Number(item.quantity);
      if (!product.sizes.includes(item.size) || !Number.isInteger(quantity) || quantity < 1) throw new Error('Invalid item in cart.');
      return { product: product._id, name: product.name, image: product.images[0], price: product.price, quantity, size: item.size };
    });
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal ? 10 : 0;
    const order = await Order.create({ user: req.userId, items: orderItems, shippingAddress, paymentMethod, subtotal, shippingFee, total: subtotal + shippingFee });
    await User.findByIdAndUpdate(req.userId, { $set: { cart: [] } });
    res.status(201).json({ order });
  } catch (error) { next(error); }
});

export default router;
