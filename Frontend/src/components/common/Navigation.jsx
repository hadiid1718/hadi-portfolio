import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from './Link';
import { motion } from "framer-motion";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Contact', path: '/contact' },
    { name: 'Resume', path: '/resume' },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/80 backdrop-blur-md shadow-lg border border-slate-700/50'
            : 'bg-slate-900/40 backdrop-blur-sm border border-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-1">
            Hadeed
            <span className="text-blue-400">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, -1).map(link => (
              <Link key={link.path} to={link.path} className="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium text-sm">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              to="/resume"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full text-sm transition-colors duration-200"
            >
              Resume
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mx-2 mb-2 rounded-2xl space-y-4 bg-slate-900 text-white px-4 py-4">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </nav>
  );
};