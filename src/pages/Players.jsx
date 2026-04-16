import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchPlayers();
  }, [roleFilter]);

  const fetchPlayers = async () => {
    try {
      let query = supabase
        .from('players')
        .select(`
          *,
          teams:team_id (name, code)
        `);
      
      if (roleFilter !== 'all') {
        query = query.eq('role', roleFilter);
      }
      
      const { data, error } = await query.limit(50);
      
      if (error) throw error;
      setPlayers(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const roles = ['all', 'Batsman', 'Bowler', 'All-rounder', 'Wicket Keeper'];

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading players...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>PSL Players 2026</h1>
      
      {/* Filter */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            style={{
              backgroundColor: roleFilter === role ? '#166534' : '#e5e7eb',
              color: roleFilter === role ? 'white' : '#374151',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {role === 'all' ? 'All' : role}
          </button>
        ))}
      </div>

      {/* Players Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {players.map((player) => (
          <Link to={`/players/${player.id}`} key={player.id} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{player.name}</h3>
              <p style={{ color: '#166534', fontSize: '14px', marginTop: '4px' }}>{player.teams?.name || player.team_name}</p>
              <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>{player.role}</p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '10px', fontSize: '12px', color: '#6b7280' }}>
                <span>🏏 {player.batting_style || 'N/A'}</span>
                {player.bowling_style && <span>🎯 {player.bowling_style}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Players;
