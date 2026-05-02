import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import './Browse.css';

const Browse = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  // Unique list of genres from your data
  const genres = ["All", "Brawler", "RPG", "Adventure", "Strategy", "Shooter", "Indie"];

  // Logic to filter by BOTH search and genre
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = activeGenre === "All" || game.genres.includes(activeGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-8">
      <div className="browse-layout">
        
        {/* LEFT SIDE: THE GAMES */}
        <div className="games-grid-container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black italic uppercase text-white">
              {activeGenre === "All" ? "All Games" : activeGenre}
              <span className="text-slate-500 text-sm ml-4 font-normal not-italic tracking-widest">
                ({filteredGames.length} Results)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filteredGames.map(game => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: THE FILTERS */}
        <aside className="filter-sidebar">
          {/* Search Bar */}
          <div>
            <span className="filter-section-title">Search System</span>
            <input 
              type="text" 
              placeholder="Keywords..."
              className="w-full bg-gray-900 border border-white/10 p-3 text-xs text-white focus:border-cyan-500 outline-none italic"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Genre Filters */}
          <div>
            <span className="filter-section-title">Genre Archive</span>
            <ul className="space-y-1">
              {genres.map(genre => (
                <li 
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`category-item ${activeGenre === genre ? 'category-active' : 'text-slate-500'}`}
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>

          {/* Neural Link Info Box */}
          <div className="p-4 bg-gray-900 border border-white/5 rounded-sm">
            <p className="text-[10px] font-black text-fuchsia-500 uppercase mb-2 animate-pulse">Filter_Protocol_v4.0</p>
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase">
              Sorting through 100 encrypted entries in local buffer.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Browse;