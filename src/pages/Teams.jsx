import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    supabase.from('teams').select('*').then(({ data }) => {
      setTeams(data || []);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">PSL Teams 2026</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(team => (
          <div key={team.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">{team.name}</h3>
            <p className="text-gray-600">Captain: {team.captain_name}</p>
            <p className="text-gray-600">Coach: {team.coach_name}</p>
            <p className="text-gray-600">Home: {team.home_ground}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
