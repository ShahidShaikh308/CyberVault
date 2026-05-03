import React from 'react';
import axios from 'axios';
import './GameCard.css';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  const hasDiscount = game.discount_percent > 0;
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const handleWishlist = async (e) => {
  e.preventDefault(); // Stop the card from navigating to the details page
  e.stopPropagation(); // Stop the event from bubbling up

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return alert("Please login to wishlist games!");

  try {
    const res = await axios.post(`${API_BASE_URL}/api/wishlist/toggle`, {
      userId: user.id,
      gameId: game._id
    });
    alert(res.data.msg); // You can replace this with a nice Toast notification later
  } catch (err) {
    console.error("Wishlist sync failed", err);
  }
};

  return (
    /* We change the outer <div> to a <Link> and point it to the details route */
    <Link to={`/game/${game._id}`} className="card-container group">
      <div className="card-image-wrapper">
        <div className="card-badge">BASE GAME</div>
        
        {/* Directly using the public/images path from your DB */}
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-all duration-500"
          onError={(e) => {
            // Fallback if image doesn't exist in public folder
            e.target.style.display = 'none';
          }}
        />

        {/* Placeholder logic if thumbnail string is empty */}
        {!game.thumbnail && (
          <div className="card-image-placeholder">{game.title}</div>
        )}
        
        {/* Wishlist Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-2">
          {/* Prevent card click when clicking the plus button */}
        <button 
          onClick={handleWishlist} 
          className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all"
        >
          +
        </button>
        </div>
      </div>

      <div className="card-info">
        {/* GENRE ROW */}
        <div className="flex flex-wrap gap-2 mb-1">
          {game.genres?.slice(0, 2).map((genre, index) => (
            <span key={index} className="card-genre">
              {genre}{index === 0 && game.genres.length > 1 ? "," : ""}
            </span>
          ))}
        </div>

        <h4 className="card-title">{game.title}</h4>
        
        <div className="card-price-row">
          {hasDiscount && <span className="discount-tag">-{game.discount_percent}%</span>}
          <span className={`price-tag ${hasDiscount ? 'text-slate-500 line-through text-[10px]' : ''}`}>
            ₹{game.price}
          </span>
          {hasDiscount && (
            <span className="price-tag text-cyan-400">
              ₹{Math.floor(game.price * (1 - game.discount_percent / 100))}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GameCard;