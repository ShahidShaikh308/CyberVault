const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  totalAmount: Number,
  status: { type: String, default: 'Completed' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'orders' });

module.exports = mongoose.model('Order', orderSchema);