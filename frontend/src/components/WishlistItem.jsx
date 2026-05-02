import React from 'react';
import { Link } from 'react-router-dom';
import './WishlistItem.css';

const WishlistItem = ({ game, onRemove }) => {
  const discountedPrice = Math.floor(game.price * (1 - game.discount_percent / 100));

  return (
    <div className="wishlist-item-row group">
      <Link to={`/game/${game._id}`} className="flex items-center gap-6 flex-1">
        <img src={game.thumbnail} alt={game.title} className="wishlist-item-img" />
        
        <div className="flex-1">
          <h3 className="text-xl font-black text-white uppercase italic group-hover:text-cyan-400 transition-colors">
            {game.title}
          </h3>
          <div className="flex gap-2 mt-1">
            {game.genres?.map(g => (
              <span key={g} className="text-[9px] text-slate-500 font-bold uppercase">{g}</span>
            ))}
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <div className="text-right">
          {game.discount_percent > 0 && (
            <span className="text-[10px] bg-cyan-500 text-black px-2 font-black">-{game.discount_percent}%</span>
          )}
          <p className="text-white font-black text-lg">₹{discountedPrice}</p>
        </div>

        <button 
          onClick={() => onRemove(game._id)}
          className="remove-btn"
          title="Remove from Wishlist"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;