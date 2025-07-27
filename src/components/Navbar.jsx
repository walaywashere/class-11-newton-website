import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Menu, X } from 'lucide-react';

const navLinks = [
  { title: 'Home', href: '#home' },
  { title: 'Leadership', href: '#leadership' },
  { title: 'Classmates', href: '#classmates' },
  { title: 'Timeline', href: '#achievements' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="ml-3 font-bold text-xl text-gray-800">11-Newton</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <motion.div key={link.title} whileTap={{ scale: 0.95 }}>
                <a
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  {link.title}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-gray-600 hover:text-indigo-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3"
        >
          {navLinks.map((link) => (
            <motion.div key={link.title} whileTap={{ scale: 0.98 }}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                {link.title}
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;