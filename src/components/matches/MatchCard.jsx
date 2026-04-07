import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const MatchCard = ({ match, type = 'upcoming' }) => {
  const getMatchStatus = () => {
    if (match.status === 'live') {
      return <span className="bg-red-600 text-white px-2 py-1 rounded text-xs animate-pulse">LIVE</span>;
    } else if (match.status === 'completed') {
      return <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">Completed</span>;
    } else {
      return <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Upcoming</span>;
    }
  };

  return (
    <Link to={`/matches/${match.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">{format(new Date(match.date), 'PPP')}</span>
            {getMatchStatus()}
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="text-center flex-1">
              <img src={match.team1.logo} alt={match.team1.name} className="w-16 h-16 mx-auto mb-2" />
              <p className="font-semibold">{match.team1.name}</p>
              {match.team1.score && <p className="text-sm">{match.team1.score}</p>}
            </div>
            
            <div className="text-xl font-bold mx-4">VS</div>
            
            <div className="text-center flex-1">
              <img src={match.team2.logo} alt={match.team2.name} className="w-16 h-16 mx-auto mb-2" />
              <p className="font-semibold">{match.team2.name}</p>
              {match.team2.score && <p className="text-sm">{match.team2.score}</p>}
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p>{match.venue}</p>
            {match.result && <p className="font-semibold mt-2">{match.result}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;