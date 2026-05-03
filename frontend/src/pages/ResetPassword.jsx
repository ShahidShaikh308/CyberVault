import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setMessage("Keys do not match.");
    }

    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        return setMessage("ERROR: No active neural session found.");
      }
      const user = JSON.parse(userData);
      await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        userId: user.id,
        newPassword
      });

      setMessage("RECALIBRATION_COMPLETE. Redirecting...");
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage("RECALIBRATION_FAILED. Check system logs.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="text-3xl font-black italic text-white mb-2 uppercase tracking-tighter">
          Recalibrate_<span className="text-cyan-400">Key</span>
        </h2>
        <p className="text-xs text-slate-500 font-bold mb-10 tracking-widest uppercase">
          Neural link security update
        </p>

        {message && (
          <div className="mb-6 p-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-[10px] font-black uppercase">
            {message}
          </div>
        )}

        <form onSubmit={handleReset}>
          <div className="auth-input-group">
            <label className="auth-label">New_Access_Key</label>
            <input 
              type="password" 
              className="auth-input" 
              placeholder="••••••••"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Confirm_Access_Key</label>
            <input 
              type="password" 
              className="auth-input" 
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn bg-cyan-500! hover:bg-cyan-400!">
            Apply_Recalibration
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;