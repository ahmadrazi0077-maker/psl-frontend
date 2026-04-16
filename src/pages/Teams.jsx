import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import Loader from '../components/common/Loader';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data } = await supabase.from('teams').select('*').order('name');
    setTeams(data || []);
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <>
      <SEO 
        title="All PSL Teams 2026 - Squads, Captains, Coaches"
        description="Complete list of all 8 PSL 2026 teams including Karachi Kings, Lahore Qalandars, Islamabad United, Peshawar Zalmi, Quetta Gladiators, Multan Sultans, Hyderabad Kingsmen, and Rawalpindiz."
        keywords="PSL teams 2026, PSL squads, Karachi Kings, Lahore Qalandars, Islamabad United"
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">PSL Teams 2026</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Link key={team.id} to={`/teams/${team.id}`}>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <h2 className="text-xl font-bold text-green-700 mb-2">{team.name}</h2>
                <p className="text-gray-600">Captain: {team.captain_name}</p>
                <p className="text-gray-600">Coach: {team.coach_name}</p>
                <p className="text-gray-600">Home: {team.home_ground}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Teams;
