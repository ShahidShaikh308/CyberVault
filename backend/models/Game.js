const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genres: [String],
  developer: [String],
  platform: [String],
  release_date: String,
  rating: Number,
  price: Number,
  discount_percent: Number,
  description: String,
  thumbnail: String,
  banner: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);