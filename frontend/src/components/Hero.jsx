import React from 'react';
import './Hero.css';

const Hero = ({ game }) => {
  if (!game) return <div className="hero-container animate-pulse bg-gray-900"></div>;

  return (
    <section className="hero-container relative overflow-hidden">
      <div className="hero-overlay"></div>
      
      {/* 1. DYNAMIC BACKGROUND IMAGE */}
      <div 
        className="hero-bg-image absolute inset-0 bg-cover bg-center transition-opacity ease-in-out"
        style={{ 
          backgroundImage: `url(${game.banner})`,
          // We can also add a slight zoom effect here via CSS if needed
        }}
      >
        {/* Fallback text if image fails, kept at low opacity */}
        <div className="flex items-center justify-center h-full text-8xl font-black opacity-5 italic uppercase select-none">
          {game.title}
        </div>
      </div>

      <div className="hero-content relative z-10">
        <span className="text-cyan-400 font-black tracking-[0.4em] text-[10px] mb-4 uppercase">
          // Priority_Access_Active
        </span>
        
        <h1 className="glitch-text text-white font-black text-6xl uppercase italic tracking-tighter mb-4">
          {game.title}
        </h1>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md italic border-l-2 border-fuchsia-500 pl-4">
          {game.description || "System breach detected. Experience the raw data stream of this next-generation title. Optimization complete."}
        </p>

        <div className="flex gap-4">
          <button className="cyber-btn shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            Get it Now
          </button>
          <button className="px-8 py-4 border border-white/10 hover:border-white/40 text-white text-xs font-black uppercase transition-all">
            + Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;