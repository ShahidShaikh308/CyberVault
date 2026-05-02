const express = require('express');
const router = express.Router();
const Game = require('../models/Game'); // Note: '..' goes up one folder to find models

// GET all games for the Browse/Discover pages
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Error fetching games archive", error: err.message });
  }
});

module.exports = router;