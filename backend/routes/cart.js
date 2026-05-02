const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// --- 1. ADD TO CART ---
router.post('/add', async (req, res) => {
  const { userId, gameId } = req.body;
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, games: [gameId] });
      await cart.save();
      return res.json({ msg: "Asset successfully cached in Cart.", status: "added" });
    }

    if (cart.games.includes(gameId)) {
      return res.status(400).json({ msg: "Asset already exists in Cart buffer." });
    }

    cart.games.push(gameId);
    await cart.save();
    res.json({ msg: "Asset successfully cached in Cart.", status: "added" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Cart synchronization error.");
  }
});

// --- 2. FETCH CART (The Missing Route Fix) ---
// This handles the GET request from Navbar.jsx and Cart.jsx
router.get('/:userId', async (req, res) => {
  try {
    // We find the cart and "populate" the games so we get titles/prices instead of just IDs
    const cart = await Cart.findOne({ user: req.params.userId }).populate('games');
    
    if (!cart) return res.json([]);
    
    res.json(cart.games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cart data.");
  }
});

// --- 3. REMOVE FROM CART ---
router.delete('/:userId/:gameId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (cart) {
      cart.games = cart.games.filter(id => id.toString() !== req.params.gameId);
      await cart.save();
    }
    res.json({ msg: "Asset purged from buffer." });
  } catch (err) {
    res.status(500).send("Removal failed.");
  }
});

module.exports = router;