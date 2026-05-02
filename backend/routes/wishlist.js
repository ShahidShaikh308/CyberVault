// backend/routes/wishlist.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist'); // Your separate Wishlist model

router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate('games');
    if (!wishlist) return res.json([]);
    res.json(wishlist.games); 
  } catch (err) {
    res.status(500).send("Error fetching wishlist");
  }
});

router.post('/toggle', async (req, res) => {
  const { userId, gameId } = req.body;

  try {
    // Look for the user's specific wishlist document
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      // System initialization: Create the table entry if it's the user's first time
      wishlist = new Wishlist({ user: userId, games: [gameId] });
      await wishlist.save();
      return res.json({ msg: "Asset Link Established: Added to Wishlist" });
    }

    const index = wishlist.games.indexOf(gameId);
    if (index === -1) {
      wishlist.games.push(gameId);
      await wishlist.save();
      res.json({ msg: "Added to Priority_Wishlist" });
    } else {
      wishlist.games.splice(index, 1);
      await wishlist.save();
      res.json({ msg: "Removed from Priority_Wishlist" });
    }
  } catch (err) {
    res.status(500).send("Database recalibration failed.");
  }
});

module.exports = router;