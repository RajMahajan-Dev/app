import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" data-testid="navbar-logo">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Ticket className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              CouponDeck
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium hover:text-blue-600 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700'
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium hover:text-blue-600 ${
                isActive('/about') ? 'text-blue-600' : 'text-gray-700'
              }`}
              data-testid="nav-about"
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium hover:text-blue-600 ${
                isActive('/contact') ? 'text-blue-600' : 'text-gray-700'
              }`}
              data-testid="nav-contact"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;