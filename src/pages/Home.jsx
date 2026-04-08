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

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)', 
        borderRadius: '16px', 
        padding: '60px 40px', 
        textAlign: 'center',
        color: 'white',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Pakistan Super League 2026</h1>
        <p style={{ fontSize: '20px', marginBottom: '24px', opacity: 0.95 }}>Welcome to PSL Updates Live - Your Ultimate PSL Destination</p>
        <button style={{ 
          backgroundColor: '#fbbf24', 
          color: '#1f2937', 
          border: 'none', 
          padding: '12px 24px', 
          fontSize: '16px', 
          fontWeight: 'bold',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Live Scores →
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#166534' }}>6</div>
          <div style={{ color: '#4b5563', marginTop: '8px' }}>Teams</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#166534' }}>34</div>
          <div style={{ color: '#4b5563', marginTop: '8px' }}>Matches</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#166534' }}>150+</div>
          <div style={{ color: '#4b5563', marginTop: '8px' }}>Players</div>
        </div>
      </div>

      {/* Teams Section */}
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>PSL Teams 2026</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading teams...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {teams.map((team) => (
            <div key={team.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>{team.name}</h3>
              <p style={{ color: '#4b5563', marginBottom: '4px' }}>Captain: {team.captain_name}</p>
              <p style={{ color: '#4b5563', marginBottom: '4px' }}>Coach: {team.coach_name}</p>
              <p style={{ color: '#4b5563', fontSize: '14px' }}>Home: {team.home_ground}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
