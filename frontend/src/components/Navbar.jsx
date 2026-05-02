import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Added for fetching cart count
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0); // State for the badge
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchCartCount(parsedUser.id);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [location.pathname]); // Re-fetch on navigation to update count

  const fetchCartCount = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCartCount(res.data.length);
    } catch (err) {
      console.error("Cart sync failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <nav className="navbar-container">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="nav-logo-box">
            <span className="text-black font-black" style={{ transform: 'skewX(15deg)' }}>V</span>
          </div>
          <h1 className="text-2xl font-black italic text-white uppercase tracking-tighter">
            CYBER<span className="text-fuchsia-500">VAULT</span>
          </h1>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex gap-10">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}
          >
            Discover
          </Link>
          <Link 
            to="/browse" 
            className={`nav-link ${location.pathname === '/browse' ? 'nav-link-active' : ''}`}
          >
            Browse
          </Link>
          
          {user && (
            <Link 
              to="/library" 
              className={`nav-link text-fuchsia-500 font-black ${location.pathname === '/library' ? 'opacity-100' : 'opacity-70'}`}
            >
              Library
            </Link>
          )}
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-6 relative" ref={dropdownRef}>
          {user ? (
            <div className="flex items-center gap-6">
              {/* --- NEW CART ICON --- */}
              <Link to="/cart" className="relative group p-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  className={`w-6 h-6 transition-all duration-300 ${location.pathname === '/cart' ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`}
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-fuchsia-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(192,38,211,0.5)]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile Section */}
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black uppercase bg-gray-900 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                >
                  {user.username[0]}
                </button>

                {showDropdown && (
                  <div className="profile-dropdown">
                    <div className="px-3 py-2">
                      <p className="text-[9px] text-slate-500 font-bold uppercase">Authorized_Citizen</p>
                      <p className="text-xs font-black text-white truncate">{user.username}</p>
                    </div>
                    
                    <div className="dropdown-divider"></div>

                    <div className="dropdown-item group">
                      <span className="text-fuchsia-500">ID:</span> 
                      <span className="truncate">{user.id}</span>
                    </div>

                    <Link to="/reset-password" underline="none" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                      Reset_Security_Key
                    </Link>

                    <div className="dropdown-divider"></div>

                    <button 
                      onClick={handleLogout} 
                      className="dropdown-item text-red-500 hover:bg-red-500/10 transition-colors w-full text-left"
                    >
                      Terminate_Session
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-link nav-link-active">
              Login_Access
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;