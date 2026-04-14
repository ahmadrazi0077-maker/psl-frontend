import React from 'react';
import { Link } from 'react-router-dom';

const MatchCard = ({ match }) => {
  return (
    <Link to={`/matches/${match.id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">{new Date(match.match_date).toLocaleDateString()}</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{match.status || 'Scheduled'}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="font-bold">{match.team1?.name}</p>
          </div>
          <div className="text-xl font-bold mx-4">VS</div>
          <div className="text-center flex-1">
            <p className="font-bold">{match.team2?.name}</p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-3">
          {match.venue}
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
