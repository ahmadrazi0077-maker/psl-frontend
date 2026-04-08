import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*, teams(name, code)')
        .limit(20);
      
      if (error) throw error;
      setPlayers(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' }}>PSL Players 2026</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading players...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {players.map((player) => (
            <div key={player.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>{player.name}</h3>
              <p style={{ color: '#4b5563', marginBottom: '4px' }}>Team: {player.teams?.name || player.team_name}</p>
              <p style={{ color: '#4b5563', marginBottom: '4px' }}>Role: {player.role}</p>
              <p style={{ color: '#4b5563', fontSize: '14px' }}>Jersey: #{player.jersey_number}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Players;
