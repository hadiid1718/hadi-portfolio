import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link } from './Link';
import { tokenStorage } from '../../services/apiService';
import { motion } from "framer-motion";


export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'user' or 'admin'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status
  const checkAuthStatus = () => {
    const userToken = tokenStorage.getUserToken();
    const adminToken = tokenStorage.getAdminToken();

    if (userToken) {
      setIsLoggedIn(true);
      setUserType('user');
    } else if (adminToken) {
      setIsLoggedIn(true);
      setUserType('admin');
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  };

  useEffect(() => {
    // Check on mount
    checkAuthStatus();

    // Listen for storage changes (when login/logout happens)
    const handleStorageChange = (e) => {
      if (e.key === 'userToken' || e.key === 'adminToken' || e.key === 'userData' || e.key === 'adminData') {
        checkAuthStatus();
      }
    };

    // Also check periodically to catch changes
    const interval = setInterval(checkAuthStatus, 1000);

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const baseNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Contact', path: '/contact' },
    { name: 'Resume', path: '/resume' },
  ];

  // Get dashboard link based on user type
  const getDashboardPath = () => {
    if (userType === 'admin') return '/admin-dashboard';
    if (userType === 'user') return '/user-dashboard';
    return null;
  };

  // Add Courses link and Dashboard link only if user is logged in
  const navLinks = isLoggedIn
    ? [...baseNavLinks, { path: '/courses' }]
    : baseNavLinks;

  const handleLogout = () => {
    if (userType === 'user') {
      tokenStorage.removeUserToken();
      tokenStorage.removeUserData();
    } else if (userType === 'admin') {
      tokenStorage.removeAdminToken();
      tokenStorage.removeAdminData();
    }
    setIsLoggedIn(false);
    setUserType(null);
    window.location.hash = '#/';
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}

        className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white flex justify-center items-center gap-3">
            Hadeed
            <span className="text-blue-400"> .</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link to={getDashboardPath()} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (<></>)}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 bg-gray-900 text-white px-3 py-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link to={getDashboardPath()} className="block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center transition-colors duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-center transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : ( <></>)}
          </div>
        )}
      </motion.div>
    </nav>
  );
};