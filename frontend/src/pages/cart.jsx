import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for redirect
import axios from 'axios';
import WishlistItem from '../components/WishlistItem';
import PaymentModal from '../components/PaymentModal'; // Import the new modal
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false); // State for payment modal
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
      setCartItems(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Cart sync failed", err);
      setLoading(false);
    }
  };

  const removeFromCart = async (gameId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${user.id}/${gameId}`);
      setCartItems(prev => prev.filter(item => item._id !== gameId));
    } catch (err) {
      console.error("Remove failed");
    }
  };

  // --- NEW: THE CHECKOUT PROCESS ---
  const handleFinalCheckout = async () => {
    try {
      await axios.post('http://localhost:5000/api/library/checkout', {
        userId: user.id,
        gameIds: cartItems.map(g => g._id),
        totalAmount: calculateTotal()
      });
      
      // Redirect to Library after successful "Binding"
      navigate('/library');
    } catch (err) {
      alert("TRANSACTION_FAILED: Neural link unstable.");
      setShowPayment(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, game) => {
      const price = game.discount_percent > 0 
        ? Math.floor(game.price * (1 - game.discount_percent / 100)) 
        : game.price;
      return acc + price;
    }, 0);
  };

  if (loading) return <div className="p-20 text-cyan-400 font-black italic animate-pulse">SYNCING_CART_BUFFER...</div>;

  return (
    <div className="cart-container">
      <div className="mb-12">
        <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter">
          Transaction_<span className="text-cyan-400">Queue</span>
        </h1>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] mt-2">
          Awaiting_Final_Authorization_v1.0
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT: ITEM LIST */}
        <div className="flex-1 space-y-2">
          {cartItems.length > 0 ? (
            cartItems.map(game => (
              <WishlistItem key={game._id} game={game} onRemove={removeFromCart} />
            ))
          ) : (
            <div className="py-20 border border-dashed border-white/10 text-center">
              <p className="text-slate-600 font-black uppercase text-xs tracking-widest">No_Assets_In_Queue</p>
            </div>
          )}
        </div>

        {/* RIGHT: SUMMARY CARD */}
        <div className="lg:w-80 h-fit bg-white/5 border border-white/10 p-8 sticky top-24">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 pb-2 border-b border-white/5">
            Checkout_Summary
          </h2>
          
          <div className="flex justify-between text-slate-400 mb-2 text-sm">
            <span>Items:</span>
            <span>{cartItems.length}</span>
          </div>
          
          <div className="flex justify-between text-white font-black text-xl mb-8">
            <span>Total:</span>
            <span className="text-cyan-400 italic">₹{calculateTotal()}</span>
          </div>

          <button 
            onClick={() => setShowPayment(true)}
            disabled={cartItems.length === 0}
            className={`w-full py-4 font-black uppercase text-sm transition-all ${
              cartItems.length > 0 
                ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]" 
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirm_Order
          </button>
          
          <p className="text-[9px] text-slate-600 mt-6 uppercase leading-tight text-center">
            Encryption_Enabled • Secure_Link_Established
          </p>
        </div>
      </div>

      {/* --- PAYMENT MODAL OVERLAY --- */}
      {showPayment && (
        <PaymentModal 
          total={calculateTotal()} 
          onConfirm={handleFinalCheckout} 
          onCancel={() => setShowPayment(false)} 
        />
      )}
    </div>
  );
};

export default Cart;