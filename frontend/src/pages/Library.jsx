import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import WishlistItem from '../components/WishlistItem';
import './Library.css';

const Library = () => {
  const [ownedGames, setOwnedGames] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('owned'); 
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) return;

    const fetchLibraryData = async () => {
      try {
        // 1. We now destructure BOTH responses from the Promise array
        const [ownedRes, wishRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/library/owned/${user.id}`),
          axios.get(`http://localhost:5000/api/wishlist/${user.id}`)
        ]);
        
        // 2. Map the data to your respective state variables
        setOwnedGames(ownedRes.data || []);
        setWishlist(wishRes.data || []);
        
        setLoading(false);
      } catch (err) {
        console.error("Library sync failed", err);
        setLoading(false);
      }
    };

    fetchLibraryData();
  }, [user?.id]);

  const handleRemoveWishlist = async (gameId) => {
    try {
      await axios.post('http://localhost:5000/api/wishlist/toggle', {
        userId: user.id,
        gameId: gameId
      });
      setWishlist(prev => prev.filter(game => game._id !== gameId));
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  if (!user) return (
    <div className="library-container text-center py-40">
      <h2 className="text-white font-black uppercase italic text-2xl">Access_Denied</h2>
      <p className="text-slate-500 mt-4 uppercase text-xs tracking-widest text-glow">Please authorize your neural link to view assets.</p>
    </div>
  );

  return (
    <div className="library-container">
      <div className="mb-12">
        <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter mb-2">
          User_<span className="text-fuchsia-600">Inventory</span>
        </h1>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em]">
          Centralized_Asset_Management_v4.2
        </p>
      </div>

      <div className="library-tabs">
        <div 
          className={`lib-tab-item ${activeTab === 'owned' ? 'lib-tab-active' : ''}`}
          onClick={() => setActiveTab('owned')}
        >
          Owned_Assets ({ownedGames.length})
        </div>
        <div 
          className={`lib-tab-item ${activeTab === 'wishlist' ? 'lib-tab-active' : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          Priority_Wishlist ({wishlist.length})
        </div>
      </div>

      {loading ? (
        <div className="text-cyan-400 font-black animate-pulse uppercase text-xs tracking-widest">
          Syncing_Neural_Buffer...
        </div>
      ) : (
        <div className="min-h-[400px]">
          {activeTab === 'owned' ? (
            ownedGames.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {ownedGames.map(game => (
                  <GameCard key={game._id} game={game} />
                ))}
              </div>
            ) : <EmptyState message="No_Owned_Assets_Detected" />
          ) : (
            wishlist.length > 0 ? (
              <div className="flex flex-col gap-1 border-t border-white/5">
                {wishlist.map(game => (
                  <WishlistItem 
                    key={game._id} 
                    game={game} 
                    onRemove={handleRemoveWishlist} 
                  />
                ))}
              </div>
            ) : <EmptyState message="Priority_Wishlist_Buffer_Empty" />
          )}
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ message }) => (
  <div className="empty-state py-20 text-center border border-dashed border-white/5">
    <p className="text-slate-600 font-black uppercase tracking-widest text-xs">
      {message}
    </p>
  </div>
);

export default Library;