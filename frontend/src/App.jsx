import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Library from './pages/Library';
import CartPage from './pages/Cart';
import GameDetails from './pages/GameDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] selection:bg-cyan-500 selection:text-black font-sans">
        {/* Global Scanlines */}
        <div className="scanlines"></div>
        
        {/* Fixed Navbar (Always visible) */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="pt-24 pb-12">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/library" element={<Library />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;