import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = ({ team }) => {
  return (
    <Link to={`/teams/${team.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6 text-center">
          <img src={team.logo} alt={team.name} className="w-32 h-32 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">{team.name}</h3>
          <p className="text-gray-600">Captain: {team.captain}</p>
          <p className="text-gray-600">Coach: {team.coach}</p>
          <div className="mt-4">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {team.matchesPlayed} Matches
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;