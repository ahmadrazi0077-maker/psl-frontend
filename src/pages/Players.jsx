import React, { useState, useEffect } from 'react';
import PlayerCard from '../components/players/PlayerCard';
import Leaderboard from '../components/players/Leaderboard';
import Loader from '../components/common/Loader';
import { fetchPlayers } from '../services/playerService';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    let filtered = players;
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (roleFilter !== 'all') {
      filtered = filtered.filter(p => p.role === roleFilter);
    }
    
    if (teamFilter !== 'all') {
      filtered = filtered.filter(p => p.team === teamFilter);
    }
    
    setFilteredPlayers(filtered);
  }, [searchTerm, roleFilter, teamFilter, players]);

  const loadPlayers = async () => {
    const data = await fetchPlayers();
    setPlayers(data);
    setFilteredPlayers(data);
    const uniqueTeams = [...new Set(data.map(p => p.team))];
    setTeams(uniqueTeams);
    setLoading(false);
  };

  const roles = ['all', 'Batsman', 'Bowler', 'All-rounder', 'Wicket Keeper'];

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Players</h1>
      
      {/* Leaderboard Section */}
      <Leaderboard players={players.slice(0, 10)} type="runs" />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Filter Players</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
          
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Teams</option>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No players found matching your filters</p>
        </div>
      )}
    </div>
  );
};

export default Players;