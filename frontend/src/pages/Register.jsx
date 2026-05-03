import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Reusing the same CSS for consistency

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
      setSuccess(true);
      setError("");
      // Redirect to login after 2 seconds so they can see the success message
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="text-3xl font-black italic text-white mb-2 uppercase tracking-tighter">
          Create_<span className="text-fuchsia-500">Citizen</span>
        </h2>
        <p className="text-xs text-slate-500 font-bold mb-10 tracking-widest uppercase">
          New neural link registration
        </p>

        {error && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-black uppercase">
          Error: {error}
        </div>}

        {success && <div className="mb-6 p-3 bg-green-500/10 border border-green-500/50 text-green-400 text-[10px] font-black uppercase">
          Success: Neural link established. Redirecting...
        </div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-label">Citizen_Name</label>
            <input 
              type="text" 
              className="auth-input" 
              placeholder="Neon_Samurai"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

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
            <label className="auth-label">Security_Phrase</label>
            <input 
              type="password" 
              className="auth-input" 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn bg-fuchsia-600! text-white! hover:bg-fuchsia-500!">
            Establish_Link
          </button>
        </form>

        <p className="mt-8 text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">
          Already a citizen? <Link to="/login" className="text-cyan-400 hover:text-cyan-300">Authorize_Existing_Link</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;