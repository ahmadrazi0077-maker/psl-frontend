import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TeamStats = ({ teamStats }) => {
  const data = [
    { name: 'Won', value: teamStats.won },
    { name: 'Lost', value: teamStats.lost },
    { name: 'NR', value: teamStats.nr },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Team Statistics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded">
          <p className="text-gray-600">Matches Played</p>
          <p className="text-3xl font-bold text-green-600">{teamStats.played}</p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded">
          <p className="text-gray-600">Win Rate</p>
          <p className="text-3xl font-bold text-blue-600">{teamStats.winRate}%</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded">
          <p className="text-gray-600">Points</p>
          <p className="text-3xl font-bold text-purple-600">{teamStats.points}</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#00A859" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamStats;