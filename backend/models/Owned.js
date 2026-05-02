const mongoose = require('mongoose');

const ownedSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
}, { collection: 'owned' });

module.exports = mongoose.model('Owned', ownedSchema);