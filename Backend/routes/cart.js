import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).lean();
    res.json({ cart: user?.cart || [] });
  } catch (error) { next(error); }
});

router.put('/', requireAuth, async (req, res, next) => {
  try {
    const { cart } = req.body;
    if (!Array.isArray(cart) || cart.some((item) => !item.productId || !item.size || !Number.isInteger(item.quantity) || item.quantity < 1)) return res.status(400).json({ message: 'Invalid cart.' });
    await User.findByIdAndUpdate(req.userId, { $set: { cart } });
    res.json({ cart });
  } catch (error) { next(error); }
});

export default router;
