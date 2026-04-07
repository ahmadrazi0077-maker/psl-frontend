import React from 'react';
import { Link } from 'react-router-dom';

const PlayerCard = ({ player }) => {
  return (
    <Link to={`/players/${player.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        <img 
          src={player.image || '/default-player.jpg'} 
          alt={player.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{player.name}</h3>
          <p className="text-gray-600">{player.role}</p>
          <div className="mt-2 flex justify-between text-sm">
            <span>🏏 {player.matches}</span>
            <span>🏃 {player.runs}</span>
            <span>🎯 {player.wickets}</span>
          </div>
          <div className="mt-3">
            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              {player.team}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;