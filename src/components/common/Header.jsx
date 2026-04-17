import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/live-scores', name: 'Live Scores' },
    { path: '/teams', name: 'Teams' },
    { path: '/players', name: 'Players' },
    { path: '/matches', name: 'Matches' },
    { path: '/standings', name: 'Standings' }, 
    { path: '/news', name: 'News' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-green-800 to-green-600 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white text-xl font-bold">
            🏏 PSL Updates Live
          </Link>
          <div className="hidden md:flex gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition ${
                  isActive(link.path) ? 'bg-green-700 font-bold' : 'hover:bg-green-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg mb-2 ${
                  isActive(link.path) ? 'bg-green-700' : 'hover:bg-green-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
