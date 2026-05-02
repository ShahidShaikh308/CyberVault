const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- REGISTER ---
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already synchronized." });

    // 2. Hash Password (The SPOS way: Encryption)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save User
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "Neural link established. User registered." });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// --- LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials." });

    // 2. Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

    // 3. Create JWT Token (Your "Access Key")
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    // 1. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 2. Update the user document
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ msg: "Security Key recalibrated successfully." });
  } catch (err) {
    res.status(500).send("System Error during recalibration.");
  }
});

module.exports = router;