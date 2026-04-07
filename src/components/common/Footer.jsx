import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About PSL Fan Hub</h3>
            <p className="text-gray-400">
              Your ultimate destination for Pakistan Super League live scores, stats, and updates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/matches" className="text-gray-400 hover:text-yellow-400">Live Scores</Link></li>
              <li><Link to="/teams" className="text-gray-400 hover:text-yellow-400">Teams</Link></li>
              <li><Link to="/players" className="text-gray-400 hover:text-yellow-400">Players</Link></li>
              <li><Link to="/standings" className="text-gray-400 hover:text-yellow-400">Points Table</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <FaEnvelope />
                <span>info@pslfanhub.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone />
                <span>+92 123 4567890</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-2xl">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} PSL Fan Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;