import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { fetchTeams } from '../services/supabaseService';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    const filtered = teams.filter(team =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.captain_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm, teams]);

  const loadTeams = async () => {
    try {
      const data = await fetchTeams();
      setTeams(data);
      setFilteredTeams(data);
    } catch (error) {
      console.error('Error loading teams:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">PSL Teams 2026</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search teams by name or captain..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Teams Grid */}
      {filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map(team => (
            <Link to={`/teams/${team.id}`} key={team.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                <div className="p-6 text-center">
                  <img 
                    src={team.logo_url || `https://via.placeholder.com/100x100?text=${team.code}`} 
                    alt={team.name}
                    className="w-32 h-32 mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                  <p className="text-gray-600">Captain: {team.captain_name}</p>
                  <p className="text-gray-600">Coach: {team.coach_name}</p>
                  <p className="text-gray-600 mt-2">{team.home_ground}</p>
                  <div className="mt-4">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {team.city}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No teams found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default Teams;
