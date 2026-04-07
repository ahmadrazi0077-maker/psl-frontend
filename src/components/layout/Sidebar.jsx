
// ... rest of the code
import React from 'react';

import { NavLink } from 'react-router-dom';
import { FaHome, FaTrophy, FaUsers, FaUserCircle, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/admin' },
    { icon: <FaTrophy />, label: 'Matches', path: '/admin/matches' },
    { icon: <FaUsers />, label: 'Teams', path: '/admin/teams' },
    { icon: <FaUserCircle />, label: 'Players', path: '/admin/players' },
    { icon: <FaCalendarAlt />, label: 'Schedule', path: '/admin/schedule' },
    { icon: <FaChartLine />, label: 'Statistics', path: '/admin/stats' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen sticky top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded transition-colors duration-200 ${
                  isActive ? 'bg-green-600' : 'hover:bg-gray-700'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;