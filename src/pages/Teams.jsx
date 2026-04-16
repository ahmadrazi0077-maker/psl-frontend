import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
const Teams = () => {
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
        .order('name');
      
      if (error) throw error;
      setTeams(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading teams...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' }}>PSL Teams 2026</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {teams.map((team) => (
          <Link to={`/teams/${team.id}`} key={team.id} style={{ textDecoration: 'none' }}>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '24px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
              cursor: 'pointer'
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;
