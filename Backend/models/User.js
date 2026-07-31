import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true, select: false },
  cart: [{ productId: { type: String, required: true }, size: { type: String, required: true }, quantity: { type: Number, required: true, min: 1 } }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
