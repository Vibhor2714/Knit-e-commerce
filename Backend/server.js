import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import cartRoutes from './routes/cart.js';

const required = ['MONGODB_URI', 'JWT_SECRET'];
for (const key of required) if (!process.env[key]) throw new Error(`${key} is missing. Copy .env.example to .env and fill it in.`);

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL?.split(',').map((url) => url.trim()) || true }));
app.use(express.json({ limit: '100kb' }));
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use((_, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((error, _, res, __) => {
  console.error(error);
  if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid resource id.' });
  res.status(500).json({ message: 'Something went wrong.' });
});

const port = Number(process.env.PORT) || 5000;
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(port, () => console.log(`Knit API listening on port ${port}`))).catch((error) => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
