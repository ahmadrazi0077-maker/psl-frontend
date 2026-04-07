import React, { useState } from 'react';
import { FaCrown, FaMedal } from 'react-icons/fa';

const Leaderboard = ({ players, type = 'runs' }) => {
  const [sortBy, setSortBy] = useState(type);
  
  const sortedPlayers = [...players].sort((a, b) => {
    if (sortBy === 'runs') return b.runs - a.runs;
    if (sortBy === 'wickets') return b.wickets - a.wickets;
    if (sortBy === 'sixes') return b.sixes - a.sixes;
    return 0;
  });

  const getRankIcon = (index) => {
    if (index === 0) return <FaCrown className="text-yellow-500" />;
    if (index === 1) return <FaMedal className="text-gray-400" />;
    if (index === 2) return <FaMedal className="text-orange-600" />;
    return <span className="text-gray-500">{index + 1}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Leaderboard</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('runs')}
            className={`px-4 py-2 rounded ${sortBy === 'runs' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Most Runs
          </button>
          <button
            onClick={() => setSortBy('wickets')}
            className={`px-4 py-2 rounded ${sortBy === 'wickets' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Most Wickets
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {sortedPlayers.slice(0, 10).map((player, index) => (
          <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 text-center">{getRankIcon(index)}</div>
              <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-semibold">{player.name}</p>
                <p className="text-sm text-gray-600">{player.team}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">{sortBy === 'runs' ? player.runs : player.wickets}</p>
              <p className="text-sm text-gray-600">{sortBy === 'runs' ? 'Runs' : 'Wickets'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;