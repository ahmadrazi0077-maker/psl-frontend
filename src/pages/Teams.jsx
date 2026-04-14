import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      // Check if supabase is configured
      if (!process.env.REACT_APP_SUPABASE_URL) {
        // Use mock data if Supabase is not configured
        setTeams([
          { id: 1, name: 'Karachi Kings', code: 'KK', captain_name: 'Babar Azam', coach_name: 'Phil Simmons', home_ground: 'National Stadium, Karachi', city: 'Karachi' },
          { id: 2, name: 'Lahore Qalandars', code: 'LQ', captain_name: 'Shaheen Afridi', coach_name: 'Aaqib Javed', home_ground: 'Gaddafi Stadium, Lahore', city: 'Lahore' },
          { id: 3, name: 'Islamabad United', code: 'IU', captain_name: 'Shadab Khan', coach_name: 'Azhar Mahmood', home_ground: 'Rawalpindi Stadium', city: 'Rawalpindi' },
          { id: 4, name: 'Peshawar Zalmi', code: 'PZ', captain_name: 'Mohammad Haris', coach_name: 'Daren Sammy', home_ground: 'Arbab Niaz Stadium', city: 'Peshawar' },
          { id: 5, name: 'Quetta Gladiators', code: 'QG', captain_name: 'Sarfaraz Ahmed', coach_name: 'Shane Watson', home_ground: 'Bugti Stadium', city: 'Quetta' },
          { id: 6, name: 'Multan Sultans', code: 'MS', captain_name: 'Mohammad Rizwan', coach_name: 'Andy Flower', home_ground: 'Multan Stadium', city: 'Multan' }
        ]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setTeams(data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <p>Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>Error loading teams: {error}</p>
        <p>Showing mock data instead.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginTop: '20px' }}>
          {teams.map((team) => (
            <div key={team.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>{team.name}</h2>
              <p><strong>Captain:</strong> {team.captain_name}</p>
              <p><strong>Coach:</strong> {team.coach_name}</p>
              <p><strong>Home Ground:</strong> {team.home_ground}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' }}>PSL Teams 2026</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {teams.map((team) => (
          <div key={team.id} style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            padding: '24px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534', marginBottom: '16px' }}>{team.name}</h2>
            <div style={{ marginBottom: '12px' }}>
              <p><strong>Code:</strong> {team.code}</p>
              <p><strong>Captain:</strong> {team.captain_name}</p>
              <p><strong>Coach:</strong> {team.coach_name}</p>
              <p><strong>Home Ground:</strong> {team.home_ground}</p>
              <p><strong>City:</strong> {team.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
