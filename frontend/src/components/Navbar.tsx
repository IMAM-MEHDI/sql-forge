import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Database, LogOut, Menu, X, Home, Trophy, Book, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');
  
  const isAdmin = (() => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return !!payload.is_admin;
    } catch {
      return false;
    }
  })();

  const [prevPath, setPrevPath] = useState(location.pathname);

  // Close menu on route change without useEffect to avoid cascading renders
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setIsOpen(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuVariants = {
    closed: { opacity: 0, y: -20, pointerEvents: 'none' },
    open: { opacity: 1, y: 0, pointerEvents: 'auto' }
  };

  const navLinkVariants = {
    hover: { scale: 1.05, color: 'var(--text-primary)' },
    tap: { scale: 0.95 }
  };

  return (
    <nav className="nav-bar" style={{ position: 'relative', zIndex: 100, borderBottom: '1px solid var(--border)', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)' }}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="nav-logo" style={{ fontSize: '1.6rem' }}>
          <Database size={32} color="var(--accent-primary)" />
          <span style={{ fontWeight: 900 }}>SQL<span style={{ color: 'var(--accent-primary)' }}>Forge</span></span>
        </Link>
      </motion.div>
      
      {/* Desktop Navigation */}
      <div className="nav-links desktop-only">
        <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
          <Link to="/" style={{ color: location.pathname === '/' ? 'var(--accent-primary)' : 'inherit', fontWeight: 600 }}>Home</Link>
        </motion.div>
        <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
          <Link to="/leaderboard" style={{ color: location.pathname === '/leaderboard' ? 'var(--accent-primary)' : 'inherit', fontWeight: 600 }}>Leaderboard</Link>
        </motion.div>
        <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
          <Link to="/tutorials" style={{ color: location.pathname.startsWith('/tutorials') ? 'var(--accent-primary)' : 'inherit', fontWeight: 600 }}>Tutorials</Link>
        </motion.div>
        {isAuthenticated ? (
          <>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link to="/dashboard" className="btn-secondary" style={{ padding: '8px 16px' }}>Dashboard</Link>
            </motion.div>
            {isAdmin && (
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link to="/admin" className="btn-secondary" style={{ padding: '8px 16px', color: 'var(--accent-primary)' }}>Admin</Link>
              </motion.div>
            )}
            <motion.button 
              whileHover={{ scale: 1.1, color: 'var(--error)' }} 
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout} 
              className="btn-secondary" 
              style={{ padding: '8px', color: 'var(--error)', border: 'none' }} 
            >
              <LogOut size={20} />
            </motion.button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ fontWeight: 600 }}>Log In</Link>
            <Link to="/login?mode=register" className="btn-primary" style={{ padding: '10px 20px' }}>Sign Up</Link>
          </>
        )}
      </div>

      {/* Mobile Toggle */}
      <button 
        className="mobile-only" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{ 
              position: 'absolute', 
              top: '80px', 
              left: '16px', 
              right: '16px', 
              background: 'var(--bg-panel)', 
              borderRadius: '16px', 
              padding: '24px',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              zIndex: 99
            }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem', fontWeight: 500 }}>
              <Home size={20} /> Home
            </Link>
            <Link to="/leaderboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem', fontWeight: 500 }}>
              <Trophy size={20} /> Leaderboard
            </Link>
            <Link to="/tutorials" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem', fontWeight: 500 }}>
              <Book size={20} /> Tutorials
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem', fontWeight: 500 }}>
                  <LayoutDashboard size={20} /> Dashboard
                </Link>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem', fontWeight: 500, color: 'var(--error)', background: 'transparent', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}>
                  <LogOut size={20} /> Log Out
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                <Link to="/login" className="btn-secondary" style={{ width: '100%' }}>Log In</Link>
                <Link to="/login?mode=register" className="btn-primary" style={{ width: '100%' }}>Sign Up</Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
