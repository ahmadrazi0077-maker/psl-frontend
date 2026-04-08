import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const MatchCard = ({ match, type = 'upcoming' }) => {
  // Add safety check
  if (!match || !match.team1 || !match.team2) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Match data unavailable</p>
      </div>
    );
  }

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
            <span className="text-sm text-gray-500">
              {match.match_date ? format(new Date(match.match_date), 'PPP') : 'Date TBD'}
            </span>
            {getMatchStatus()}
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="text-center flex-1">
              {match.team1?.logo_url && (
                <img src={match.team1.logo_url} alt={match.team1.name} className="w-16 h-16 mx-auto mb-2 object-contain" />
              )}
              <p className="font-semibold">{match.team1?.name || 'Team 1'}</p>
              {match.team1_score && <p className="text-sm font-bold">{match.team1_score}</p>}
              {match.team1_runs && <p className="text-sm">{match.team1_runs}/{match.team1_wickets}</p>}
            </div>
            
            <div className="text-xl font-bold mx-4">VS</div>
            
            <div className="text-center flex-1">
              {match.team2?.logo_url && (
                <img src={match.team2.logo_url} alt={match.team2.name} className="w-16 h-16 mx-auto mb-2 object-contain" />
              )}
              <p className="font-semibold">{match.team2?.name || 'Team 2'}</p>
              {match.team2_score && <p className="text-sm font-bold">{match.team2_score}</p>}
              {match.team2_runs && <p className="text-sm">{match.team2_runs}/{match.team2_wickets}</p>}
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p>{match.venue || 'Venue TBD'}</p>
            {match.result && <p className="font-semibold mt-2 text-green-600">{match.result}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
