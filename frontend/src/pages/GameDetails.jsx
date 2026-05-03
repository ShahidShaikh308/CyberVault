import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';
import PaymentModal from '../components/PaymentModal'; // Added PaymentModal
import './GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [game, setGame] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false); // Added for Buy Now flow
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const user = JSON.parse(localStorage.getItem('user')); // Moved to top level for access in all functions

  const handleAddToCart = async () => {
    if (!user) return navigate('/login');
    try {
      await axios.post(`${API_BASE_URL}/api/cart/add`, {
        userId: user.id,
        gameId: game._id
      });
      alert("ASSET_CACHED: Game added to cart buffer.");
      setIsPurchaseModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyNow = () => {
    if (!user) return navigate('/login');
    setIsPurchaseModalOpen(false); // Close the choice tab
    setShowPayment(true);          // Open the payment terminal directly
  };

  const handleDirectCheckout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/library/checkout`, {
        userId: user.id,
        gameIds: [game._id], // Single game array
        totalAmount: Math.floor(game.price * (1 - game.discount_percent / 100))
      });
      
      navigate('/library'); // Teleport to library on success
    } catch (err) {
      alert("TRANSACTION_FAILED: Signal lost.");
      setShowPayment(false);
    }
  };

  const handleWishlistClick = async () => {
    if (!user) return navigate('/login');
    try {
      const res = await axios.post(`${API_BASE_URL}/api/wishlist/toggle`, {
        userId: user.id,
        gameId: game._id
      });
      alert(res.data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/games/${id}`)
      .then(res => setGame(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!game) return <div className="h-screen flex items-center justify-center text-cyan-400 font-black animate-pulse uppercase">Syncing_Neural_Data...</div>;

  const discountedPrice = Math.floor(game.price * (1 - game.discount_percent / 100));

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* 1. CINEMATIC BANNER */}
      <div className="details-banner">
        <img src={game.banner} className="details-banner-img" alt="Hero Banner" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="details-content">
        {/* LEFT: PRIMARY INFO */}
        <div className="lg:col-span-2 flex flex-col justify-end pb-10">
          <div className="flex gap-2 mb-6">
            {game.genres?.map(g => (
              <span key={g} className="text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 text-slate-400 px-3 py-1 rounded-full">
                {g}
              </span>
            ))}
          </div>

          <h1 className="game-title-giant">{game.title}</h1>

          <div className="flex items-center gap-8 mb-12">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">User_Rating</span>
              <span className="text-cyan-400 text-2xl font-black italic">★ {game.rating}</span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Release_Cycle</span>
              <span className="text-white text-lg font-bold">{game.release_date}</span>
            </div>
          </div>

          <div className="relative mb-16">
            <span className="absolute -left-6 top-0 bottom-0 w-1 bg-fuchsia-600"></span>
            <p className="description-text">{game.description}</p>
          </div>

          <div className="vertical-info-list">
            <div className="vertical-info-item">
              <span className="info-block-label">Developer_Core</span>
              <p className="text-xl text-white font-black tracking-tight">{game.developer?.join(" & ")}</p>
            </div>
            <div className="vertical-info-item">
              <span className="info-block-label">Platform_Support</span>
              <p className="text-sm text-slate-300 font-bold uppercase tracking-wider leading-relaxed max-w-md">{game.platform?.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: CALL TO ACTION */}
        <div className="action-card">
          <img src={game.thumbnail} className="w-full aspect-3/4 object-cover mb-6 rounded-sm border border-white/10" alt="box art" />
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <span className="bg-cyan-500 text-black text-xs font-black px-2 py-1 rounded-sm">-{game.discount_percent}%</span>
              <span className="text-slate-500 line-through font-bold">₹{game.price}</span>
            </div>
            <h3 className="text-4xl font-black text-white">₹{discountedPrice}</h3>
          </div>

          <button onClick={() => setIsPurchaseModalOpen(true)} className="w-full py-4 bg-white text-black font-black uppercase italic hover:bg-cyan-400 transition-colors">
            Authorize_Purchase
          </button>

          <button onClick={handleWishlistClick} className="wishlist-btn">
            + To Wishlist
          </button>
        </div>
      </div>

      {/* SELECTION MODAL (Add to Cart vs Buy Now) */}
      {isPurchaseModalOpen && (
        <div 
          onClick={(e) => e.target === e.currentTarget && setIsPurchaseModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 cursor-pointer"
        >
          <div className="w-full max-w-5xl bg-[#121212] border border-white/10 flex flex-col md:flex-row shadow-2xl overflow-hidden cursor-default animate-in fade-in zoom-in duration-200">
            <div className="md:w-3/5 p-10 bg-black/40">
              <div className="flex gap-10 items-start">
                <img src={game.thumbnail} className="w-48 h-64 object-cover shadow-2xl border border-white/10" alt={game.title} />
                <div className="flex-1">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-none">{game.title}</h2>
                  <p className="text-slate-300 text-base leading-relaxed mb-4">{game.description}</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 p-10 bg-[#1a1a1a] border-l border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.4em] mb-10 border-b border-white/10 pb-4">Order_Summary</h3>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-white text-xl font-bold">Total Price</span>
                  <span className="text-cyan-400 text-5xl font-black italic tracking-tighter">₹{discountedPrice}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border-l-2 border-slate-700">
                  <p className="text-[11px] text-slate-500 uppercase">Non-refundable digital asset.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <button onClick={handleAddToCart} className="w-full py-5 border-2 border-white/20 text-white font-black uppercase text-sm hover:bg-white hover:text-black transition-all">
                  Add_to_Cart
                </button>
                <button onClick={handleBuyNow} className="w-full py-5 bg-fuchsia-600 text-white font-black uppercase text-sm hover:bg-fuchsia-500 shadow-[0_0_20px_rgba(192,38,211,0.3)]">
                  Buy_Now_Direct
                </button>
                <button onClick={() => setIsPurchaseModalOpen(false)} className="text-[9px] text-slate-600 uppercase font-bold tracking-[0.2em]">
                  Back to Store
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIRECT PAYMENT MODAL */}
      {showPayment && (
        <PaymentModal 
          total={discountedPrice} 
          onConfirm={handleDirectCheckout} 
          onCancel={() => setShowPayment(false)} 
        />
      )}
    </div>
  );
};

export default GameDetails;