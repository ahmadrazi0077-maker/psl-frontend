import React, { useState, useEffect } from 'react';
import { fetchUpcomingMatches } from '../../services/matchService';
import MatchCard from './MatchCard';
import Loader from '../common/Loader';

const MatchSchedule = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const data = await fetchUpcomingMatches();
    setMatches(data);
    setLoading(false);
  };

  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true;
    return match.team1.name.toLowerCase().includes(filter) || match.team2.name.toLowerCase().includes(filter);
  });

  if (loading) return <Loader />;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Match Schedule</h2>
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            All Teams
          </button>
          <button
            onClick={() => setFilter('karachi')}
            className={`px-4 py-2 rounded ${filter === 'karachi' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Karachi Kings
          </button>
          <button
            onClick={() => setFilter('lahore')}
            className={`px-4 py-2 rounded ${filter === 'lahore' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Lahore Qalandars
          </button>
          {/* Add more team filters */}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.map(match => (
          <MatchCard key={match.id} match={match} type="upcoming" />
        ))}
      </div>
    </div>
  );
};

export default MatchSchedule;