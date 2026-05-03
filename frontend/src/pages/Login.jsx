import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      
      // Store the JWT Token and User data in LocalStorage (The Session logic)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      navigate('/'); // Redirect to home on success
      window.location.reload(); // Refresh to update Navbar state
    } catch (err) {
      setError(err.response?.data?.msg || "Authentication Failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="text-3xl font-black italic text-white mb-2 uppercase tracking-tighter">
          Login_<span className="text-cyan-400">System</span>
        </h2>
        <p className="text-xs text-slate-500 font-bold mb-10 tracking-widest uppercase">
          Neural link authorization required
        </p>

        {error && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-black uppercase">
          Error: {error}
        </div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-label">Email_Address</label>
            <input 
              type="email" 
              className="auth-input" 
              placeholder="user@cybervault.net"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Access_Key</label>
            <input 
              type="password" 
              className="auth-input" 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Authorize_Access
          </button>
        </form>

        <p className="mt-8 text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">
          Don't have a link? <Link to="/register" className="text-fuchsia-500 hover:text-fuchsia-400">Register_New_Citizen</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;