import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaUserCircle, 
  FaCalendarAlt, 
  FaTrophy, 
  FaNewspaper, 
  FaBars, 
  FaTimes,
  FaBaseballBall  // Changed from FaCricket to FaBaseballBall
} from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';  // Alternative cricket icon

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Home', icon: <FaHome /> },
    { path: '/teams', name: 'Teams', icon: <FaUsers /> },
    { path: '/players', name: 'Players', icon: <FaUserCircle /> },
    { path: '/matches', name: 'Matches', icon: <FaCalendarAlt /> },
    { path: '/standings', name: 'Standings', icon: <FaTrophy /> },
    { path: '/news', name: 'News', icon: <FaNewspaper /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-green-800 to-green-600 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-white">
            <GiCricketBat className="text-2xl text-yellow-400" />
            <span className="text-xl font-bold">PSL Updates Live</span>
          </Link>

          <div className="hidden md:flex gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-green-700 font-bold'
                    : 'hover:bg-green-700'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                  isActive(link.path) ? 'bg-green-700' : 'hover:bg-green-700'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
