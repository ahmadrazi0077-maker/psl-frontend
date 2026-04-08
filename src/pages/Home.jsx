import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [teamsCount, setTeamsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSupabase();
  }, []);

  const checkSupabase = async () => {
    try {
      const { count, error } = await supabase
        .from('teams')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      setTeamsCount(count || 0);
    } catch (error) {
      console.error('Supabase error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center py-20 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-green-700 mb-4">
        PSL Fan Hub
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Pakistan Super League 2026 - Live Scores, Stats & More
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <Link to="/teams" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-green-600 mb-2">Teams</h3>
          <p className="text-gray-600">6 PSL Teams</p>
        </Link>
        
        <Link to="/players" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-green-600 mb-2">Players</h3>
          <p className="text-gray-600">View all players</p>
        </Link>
        
        <Link to="/matches" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-green-600 mb-2">Schedule</h3>
          <p className="text-gray-600">PSL 2026 Schedule</p>
        </Link>
      </div>
      
      {!loading && (
        <div className="mt-8 text-gray-500">
          {teamsCount > 0 ? (
            <p>✅ Connected to Supabase - {teamsCount} teams loaded</p>
          ) : (
            <p>⚠️ Supabase connection issue - Check environment variables</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
