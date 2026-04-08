import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*, team1:team1_id(name, code), team2:team2_id(name, code)')
        .order('match_date', { ascending: true })
        .limit(10);
      
      if (error) throw error;
      setMatches(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' }}>PSL 2026 Schedule</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading matches...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {matches.map((match) => (
            <div key={match.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '20px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <strong>{match.team1?.name || match.team1_name}</strong>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 20px' }}>VS</div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <strong>{match.team2?.name || match.team2_name}</strong>
              </div>
              <div style={{ flex: 2, textAlign: 'center', marginTop: '10px' }}>
                <p style={{ color: '#4b5563' }}>{match.venue}</p>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>{new Date(match.match_date).toLocaleDateString()}</p>
                <span style={{ 
                  display: 'inline-block', 
                  backgroundColor: match.status === 'live' ? '#dc2626' : '#166534',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  marginTop: '8px'
                }}>
                  {match.status || 'Scheduled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
