require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Game = require('./models/Game');

const app = express();

// --- 1. MIDDLEWARE (CRITICAL: MUST BE BEFORE ROUTES) ---
app.use(cors()); 
app.use(express.json()); 

// --- 2. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- 3. ROUTES ---
// Corrected 'game' to 'games' to match your filename
app.use('/api/games', require('./routes/game')); 
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/library', require('./routes/library'));
app.use('/api/auth', require('./routes/auth'));

// --- 4. FALLBACK & SPECIFIC ROUTES ---
app.get('/api/games/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Asset_Not_Found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: "Neural_Link_Failure", details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('CyberVault Server is Online.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});