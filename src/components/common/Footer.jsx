import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PSL Updates Live</h3>
            <p className="text-gray-400">Your ultimate destination for Pakistan Super League 2026 updates.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/teams" className="text-gray-400 hover:text-yellow-400">Teams</Link></li>
              <li><Link to="/players" className="text-gray-400 hover:text-yellow-400">Players</Link></li>
              <li><Link to="/standings" className="text-gray-400 hover:text-yellow-400">Points Table</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-yellow-400">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Email: info@pslupdateslive.online</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
<div className="flex space-x-4">
  <a 
    href="https://www.facebook.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-yellow-400 text-2xl"
  >
    <FaFacebook />
  </a>

  <a 
    href="https://twitter.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-yellow-400 text-2xl"
  >
    <FaTwitter />
  </a>

  <a 
    href="https://www.instagram.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-yellow-400 text-2xl"
  >
    <FaInstagram />
  </a>

  <a 
    href="https://www.youtube.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-yellow-400 text-2xl"
  >
    <FaYoutube />
  </a>
</div>

          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 PSL Updates Live. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
