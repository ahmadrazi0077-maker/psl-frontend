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
  FaCricket,
  FaChevronDown,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  
  // For demo - check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

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
    <nav className="bg-gradient-to-r from-green-900 to-green-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white no-underline hover:scale-105 transition-transform">
            <FaCricket className="text-2xl text-yellow-400 animate-pulse" />
            <span className="text-xl font-bold tracking-wide">PSL Updates Live</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'bg-green-600 font-bold shadow-md' 
                    : 'hover:bg-green-600 hover:shadow-md'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {/* User Dropdown */}
            {isLoggedIn ? (
              <div className="relative ml-4">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-500 transition"
                >
                  <FaUserCircle className="text-xl" />
                  <span>Account</span>
                  <FaChevronDown className={`text-sm transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                    {userRole === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-t-lg">
                        <FaCog /> Admin Panel
                      </Link>
                    )}
                    <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 w-full rounded-b-lg">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="ml-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-600">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white mb-2 transition-all duration-300 ${
                  isActive(link.path) ? 'bg-green-600' : 'hover:bg-green-600'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            {isLoggedIn ? (
              <>
                {userRole === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-green-600">
                    <FaCog /> Admin Panel
                  </Link>
                )}
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-green-600 w-full">
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-yellow-500 text-gray-900 font-semibold">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
