import React, { useState } from 'react';

const PaymentModal = ({ total, onConfirm, onCancel }) => {
  const [processing, setProcessing] = useState(false);

  const handleProcess = () => {
    setProcessing(true);
    // Simulate network delay for "Cyber" feel
    setTimeout(() => {
      onConfirm();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-xl">
      <div className="w-full max-w-lg border border-cyan-500/30 bg-[#0a0a0a] p-10 relative overflow-hidden">
        {/* Animated Scanning Line */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.2)_50%,transparent_100%)] bg-size-[100%_4px] animate-scan"></div>

        <h2 className="text-2xl font-black text-white uppercase italic mb-2">Secure_Payment_Gateway</h2>
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] mb-8">Node_ID: {Math.random().toString(36).substring(7)}</p>

        <div className="space-y-6 mb-10">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-slate-400 uppercase text-xs">Authorization_Total</span>
            <span className="text-cyan-400 font-black text-xl">₹{total}</span>
          </div>
          
          <div className="p-4 bg-white/5 border border-white/10">
             <label className="block text-[9px] text-slate-500 uppercase font-black mb-2">Virtual_Card_Token</label>
             <input 
              type="text" 
              disabled 
              value="**** **** **** 8842" 
              className="w-full bg-transparent text-white font-mono tracking-[0.3em] outline-none" 
             />
          </div>
        </div>

        {processing ? (
          <div className="text-center py-4">
            <div className="text-cyan-400 font-black animate-pulse text-xs tracking-widest uppercase">
              Verifying_Neural_Signature...
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleProcess}
              className="w-full py-4 bg-cyan-500 text-black font-black uppercase text-sm hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
            >
              Authorize_Transfer
            </button>
            <button 
              onClick={onCancel}
              className="text-[9px] text-slate-600 hover:text-white uppercase tracking-widest transition-colors"
            >
              [ Abort_Transaction ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;