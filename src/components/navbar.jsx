import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Menu, X, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scrollToTop';

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'Leadership', href: '/leadership' },
  { title: 'Students', href: '/students' },
  { title: 'Achievements', href: '/achievements' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 w-full z-[100] transition-all duration-300"
      style={{
        background: isScrolled 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <Link to="/" onClick={scrollToTopInstant} className="block">
                <h1 className="text-lg sm:text-xl font-bold text-white">11-Newton</h1>
                <p className="text-xs text-white/60 font-medium">Class of 2025</p>
              </Link>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div 
                key={link.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: Math.min(0.1 * index + 0.3, 1.0) }}
              >
                <Link
                  to={link.href}
                  onClick={scrollToTopInstant}
                  className={`group relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-white/10 ${
                    location.pathname === link.href 
                      ? 'text-white bg-white/10' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.title}
                  <span className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 transition-all duration-300 rounded-full ${
                    location.pathname === link.href 
                      ? 'w-full left-0' 
                      : 'w-0 group-hover:w-full group-hover:left-0'
                  }`}></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-lg sm:rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden glass-dark backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={link.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      // Ensure scroll to top works on mobile
                      setTimeout(() => {
                        scrollToTopInstant();
                      }, 100);
                    }}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                      location.pathname === link.href 
                        ? 'text-white bg-white/10' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-500 rounded-full transition-transform ${
                      location.pathname === link.href 
                        ? 'scale-125' 
                        : 'group-hover:scale-125'
                    }`}></div>
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;