import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStandings();
  }, []);

  const fetchStandings = async () => {
    try {
      const { data, error } = await supabase
        .from('points_table')
        .select(`
          *,
          teams:team_id (name, logo_url)
        `)
        .eq('season', '2026')
        .order('points', { ascending: false })
        .order('net_run_rate', { ascending: false });
      
      if (error) throw error;
      setStandings(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading standings...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' }}>PSL Points Table 2026</h1>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <thead style={{ backgroundColor: '#166534', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>#</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Team</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>P</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>W</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>L</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>NR</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Pts</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>NRR</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr key={team.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{index + 1}</td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#166534' }}>{team.team_name}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{team.played}</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#16a34a' }}>{team.won}</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#dc2626' }}>{team.lost}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{team.no_result || 0}</td>
                <td style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>{team.points}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{team.net_run_rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standings;
