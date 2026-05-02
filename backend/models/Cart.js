const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
}); // <--- NOTICE THE 'S' HERE to match your screenshot

module.exports = mongoose.model("Cart", cartSchema);