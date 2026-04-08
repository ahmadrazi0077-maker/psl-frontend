import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { fetchPlayers, fetchTeams } from '../services/supabaseService';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadData();
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
      filtered = filtered.filter(p => p.team_id === teamFilter);
    }
    
    setFilteredPlayers(filtered);
  }, [searchTerm, roleFilter, teamFilter, players]);

  const loadData = async () => {
    try {
      const [playersData, teamsData] = await Promise.all([
        fetchPlayers(),
        fetchTeams()
      ]);
      setPlayers(playersData);
      setFilteredPlayers(playersData);
      setTeams(teamsData);
    } catch (error) {
      console.error('Error loading players:', error);
    } finally {
      setLoading(false);
    }
  };

  const roles = ['all', 'Batsman', 'Bowler', 'All-rounder', 'Wicket Keeper'];

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">PSL Players 2026</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Filter Players</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role === 'all' ? 'All Roles' : role}
              </option>
            ))}
          </select>
          
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="all">All Teams</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlayers.map(player => (
            <Link to={`/players/${player.id}`} key={player.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                <img 
                  src={player.image_url || `https://via.placeholder.com/300x200?text=${player.name}`} 
                  alt={player.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{player.name}</h3>
                  <p className="text-gray-600">{player.role}</p>
                  <p className="text-sm text-green-600 font-semibold mt-1">{player.team_name}</p>
                  <div className="mt-2 flex justify-between text-sm">
                    <span>🏏 {player.jersey_number || 'N/A'}</span>
                    <span>📍 {player.nationality || 'Pakistan'}</span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {player.batting_style || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
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
