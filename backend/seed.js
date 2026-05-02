require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Game = require('./models/Game');

const results = [];

const cleanArray = (data) => {
  if (!data) return [];
  return data.replace(/[\[\]'"]/g, "").split(',').map(g => g.trim()).filter(g => g !== "");
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB for seeding..."))
  .catch(err => console.error("Connection error:", err));

// Updated path to look in the current directory
fs.createReadStream('./backloggd_games.csv')
  .pipe(csv())
  .on('data', (row) => {
    results.push({
      title: row.Title,
      genres: cleanArray(row.Genres),
      developer: cleanArray(row.Developers),
      platform: cleanArray(row.Platforms),
      release_date: row.Release_Date,
      rating: parseFloat(row.Rating) || 0,
      price: Math.floor(Math.random() * 2000) + 500,
      discount_percent: [0, 10, 20, 30, 50][Math.floor(Math.random() * 5)],
      description: row.Summary,
      thumbnail: `/images/${row.Title}.jpg`,
      banner: `/images/${row.Title}-banner.jpg`
    });
  })
  .on('end', async () => {
    try {
      // Clear existing data first so you don't get duplicates if you run it twice
      await Game.deleteMany({});
      console.log("Old data cleared.");

      await Game.insertMany(results);
      console.log(`Successfully uploaded all ${results.length} games to Atlas!`);
      process.exit(); // Closes the script automatically
    } catch (err) {
      console.error("Error inserting data:", err);
      process.exit(1);
    }
  });