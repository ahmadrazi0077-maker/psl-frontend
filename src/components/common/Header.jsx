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
  FaCricket
} from 'react-icons/fa';

const Navbar = () => {
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

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={{
      backgroundColor: '#166534',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}>
            <FaCricket style={{ fontSize: '28px', color: '#fbbf24' }} />
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '1px'
            }}>
              PSL Updates Live
            </span>
          </Link>

          {/* Desktop Menu */}
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: isActive(link.path) ? 'bold' : 'normal',
                  backgroundColor: isActive(link.path) ? '#15803d' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.path)) {
                    e.target.style.backgroundColor = '#15803d';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.path)) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {link.icon}
                <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              '@media (max-width: 768px)': {
                display: 'block'
              }
            }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{
            display: 'none',
            padding: '20px 0',
            borderTop: '1px solid #15803d',
            '@media (max-width: 768px)': {
              display: 'block'
            }
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: isActive(link.path) ? '#15803d' : 'transparent',
                  marginBottom: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
