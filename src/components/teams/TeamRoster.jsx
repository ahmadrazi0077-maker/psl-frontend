import React, { useState, useEffect, useCallback } from 'react';
import { fetchTeamPlayers } from '../../services/teamService';
import Loader from '../common/Loader';

const TeamRoster = ({ teamId }) => {
  const [activeTab, setActiveTab] = useState('squad');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlayers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTeamPlayers(teamId);
      setPlayers(data);
    } catch (error) {
      console.error('Error loading players:', error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  // Filter players by role
  const batsmen = players.filter(p => p.role === 'Batsman' || p.role === 'Batter');
  const bowlers = players.filter(p => p.role === 'Bowler');
  const allrounders = players.filter(p => p.role === 'All-rounder' || p.role === 'Allrounder');
  const wicketKeepers = players.filter(p => p.role === 'Wicket Keeper' || p.role === 'WK');

  const PlayerCategory = ({ title, players }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold mb-3 border-b pb-2">{title}</h3>
      {players.length > 0 ? (
        <ul className="space-y-2">
          {players.map(player => (
            <li key={player.id} className="flex items-center justify-between">
              <span className="font-medium">{player.name}</span>
              {player.jersey_number && (
                <span className="text-sm text-gray-500">#{player.jersey_number}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No players listed</p>
      )}
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="team-roster">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'squad' 
              ? 'text-green-600 border-b-2 border-green-600' 
              : 'text-gray-600 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('squad')}
        >
          Full Squad
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'stats' 
              ? 'text-green-600 border-b-2 border-green-600' 
              : 'text-gray-600 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('stats')}
        >
          Team Stats
        </button>
      </div>

      {activeTab === 'squad' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PlayerCategory title="Batsmen" players={batsmen} />
          <PlayerCategory title="Bowlers" players={bowlers} />
          <PlayerCategory title="All-rounders" players={allrounders} />
          <PlayerCategory title="Wicket Keepers" players={wicketKeepers} />
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Team Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-gray-600">Total Players</p>
              <p className="text-2xl font-bold">{players.length}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-gray-600">Batsmen</p>
              <p className="text-2xl font-bold">{batsmen.length}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-gray-600">Bowlers</p>
              <p className="text-2xl font-bold">{bowlers.length}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-gray-600">All-rounders</p>
              <p className="text-2xl font-bold">{allrounders.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamRoster;
