import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import Canonical from '../components/Canonical';
const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('scheduled');

  useEffect(() => {
    fetchMatches();
  }, [statusFilter]);

  const fetchMatches = async () => {
    try {
      let query = supabase
        .from('matches')
        .select(`
          *,
          team1:team1_id (name, code),
          team2:team2_id (name, code),
          winner:winner_team_id (name)
        `)
        .order('match_date', { ascending: true });
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setMatches(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      scheduled: { background: '#166534', text: '📅 Scheduled' },
      live: { background: '#dc2626', text: '🔴 LIVE' },
      completed: { background: '#4b5563', text: '✅ Completed' }
    };
    const s = styles[status] || styles.scheduled;
    return <span style={{ backgroundColor: s.background, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{s.text}</span>;
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading matches...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>PSL 2026 Schedule</h1>
      
      {/* Filter */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {['all', 'scheduled', 'live', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
              backgroundColor: statusFilter === status ? '#166534' : '#e5e7eb',
              color: statusFilter === status ? 'white' : '#374151',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {status === 'all' ? 'All' : status}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {matches.map((match) => (
          <Link to={`/matches/${match.id}`} key={match.id} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <strong style={{ fontSize: '18px' }}>{match.team1?.name || match.team1_name}</strong>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 20px' }}>VS</div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <strong style={{ fontSize: '18px' }}>{match.team2?.name || match.team2_name}</strong>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <p style={{ color: '#4b5563' }}>{match.venue}</p>
                <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                  {new Date(match.match_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div style={{ marginTop: '12px' }}>
                  {getStatusBadge(match.status)}
                </div>
                {match.result && (
                  <p style={{ color: '#166534', marginTop: '12px', fontWeight: 'bold' }}>{match.result}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Matches;
