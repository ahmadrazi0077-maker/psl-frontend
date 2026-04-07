import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { FaUsers, FaTrophy, FaCalendar, FaEye } from 'react-icons/fa';
import { getDashboardStats } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalTeams: 0,
    totalPlayers: 0,
    totalUsers: 0,
    liveMatches: 0,
    upcomingMatches: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
  };

  const statCards = [
    { title: 'Total Matches', value: stats.totalMatches, icon: FaTrophy, color: 'bg-blue-500' },
    { title: 'Total Teams', value: stats.totalTeams, icon: FaUsers, color: 'bg-green-500' },
    { title: 'Total Players', value: stats.totalPlayers, icon: FaUsers, color: 'bg-purple-500' },
    { title: 'Total Users', value: stats.totalUsers, icon: FaEye, color: 'bg-yellow-500' },
    { title: 'Live Matches', value: stats.liveMatches, icon: FaCalendar, color: 'bg-red-500' },
    { title: 'Upcoming', value: stats.upcomingMatches, icon: FaCalendar, color: 'bg-orange-500' },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-full text-white`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-3">
                <p className="text-sm text-gray-600">2 hours ago</p>
                <p className="font-semibold">Match updated: Karachi vs Lahore</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="text-sm text-gray-600">5 hours ago</p>
                <p className="font-semibold">New player added: Babar Azam</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-3">
                <p className="text-sm text-gray-600">1 day ago</p>
                <p className="font-semibold">Points table updated</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/admin/matches" className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700">
                Update Match
              </Link>
              <Link to="/admin/teams" className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700">
                Manage Teams
              </Link>
              <Link to="/admin/players" className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700">
                Manage Players
              </Link>
              <Link to="/admin/schedule" className="bg-orange-600 text-white p-4 rounded-lg text-center hover:bg-orange-700">
                Create Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
