import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import GameCard from '../components/GameCard';
import './Home.css';

const Home = () => {
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/games`)
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  // --- AUTOMATED CIRCULATION LOGIC ---
  // Inside your Home component...

useEffect(() => {
  if (games.length === 0) return;

  // We determine the rotation limit (5 or the total games if less than 5)
  const rotationLimit = Math.min(games.length, 5);

  const timer = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rotationLimit);
  }, 5000);

  return () => clearInterval(timer);
}, [games]);

  return (
    <>
      <div className="scanlines"></div>

      {/* Pass the CURRENTLY indexed game to the Hero */}
      {games.length > 0 ? (
        <Hero game={games[currentIndex]} />
      ) : (
        <div className="hero-placeholder h-[500px] w-full bg-gray-900 flex items-center justify-center border border-white/5">
          <span className="text-cyan-500 font-black animate-pulse">BOOTING_SYSTEM...</span>
        </div>
      )}

      {/* Section Header */}
      <h3 className="text-white font-bold uppercase tracking-widest mb-8 flex items-center gap-3 mt-12">
        <span className="w-1 h-6 bg-cyan-400"></span> 
        Trending Downloads
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6">
  {games.slice(0, 20).map((game) => (
    <GameCard key={game._id} game={game} />
  ))}
</div>
    </>
  );
};

export default Home;