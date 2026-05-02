const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Cart = require('../models/Cart');
const Owned = require('../models/Owned'); // New Import
const Order = require('../models/Order'); // New Import

// --- 1. FETCH OWNED ASSETS ---
router.get('/owned/:userId', async (req, res) => {
  try {
    const assetLibrary = await Owned.findOne({ user: req.params.userId }).populate('games');
    if (!assetLibrary) return res.json([]);
    res.json(assetLibrary.games);
  } catch (err) {
    res.status(500).send("Error fetching owned assets");
  }
});

// --- 2. CHECKOUT LOGIC (The Migration) ---
router.post('/checkout', async (req, res) => {
  const { userId, gameIds, totalAmount } = req.body;

  try {
    // A. Record the Transaction in Orders
    const newOrder = new Order({ user: userId, games: gameIds, totalAmount });
    await newOrder.save();

    // B. Add games to the Owned collection
    let userLibrary = await Owned.findOne({ user: userId });
    
    if (!userLibrary) {
      userLibrary = new Owned({ user: userId, games: gameIds });
    } else {
      // Add only games the user doesn't already own
      gameIds.forEach(id => {
        if (!userLibrary.games.includes(id)) {
          userLibrary.games.push(id);
        }
      });
    }
    await userLibrary.save();

    // C. Clear the Cart
    await Cart.findOneAndDelete({ user: userId });

    res.json({ msg: "ASSETS_SECURED: Order processed and bound to ID.", success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Checkout failed", error: err.message });
  }
});

module.exports = router;