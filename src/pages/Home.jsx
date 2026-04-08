import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .limit(6);
      
      if (error) throw error;
      setTeams(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading PSL 2026 Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl text-white p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Pakistan Super League 2026
        </h1>
        <p className="text-xl mb-6">Welcome to PSL Fan Hub - Your Ultimate PSL Destination</p>
        <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
          Live Scores →
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600">{teams.length}</div>
          <div className="text-gray-600 mt-2">Teams</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600">34</div>
          <div className="text-gray-600 mt-2">Matches</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600">150+</div>
          <div className="text-gray-600 mt-2">Players</div>
        </div>
      </div>

      {/* Teams Preview */}
      <div>
        <h2 className="text-2xl font-bold mb-4">PSL Teams 2026</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-2">🏏</div>
              <div className="font-semibold">{team.name}</div>
              <div className="text-sm text-gray-500">{team.code}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
