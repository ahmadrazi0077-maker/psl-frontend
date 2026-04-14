import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [careerStats, setCareerStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerDetails();
  }, [id]);

  const fetchPlayerDetails = async () => {
    try {
      // Fetch player details
      const { data: playerData, error: playerError } = await supabase
        .from('players')
        .select(`
          *,
          teams:team_id (name, code)
        `)
        .eq('id', id)
        .single();
      
      if (playerError) throw playerError;
      setPlayer(playerData);

      // Fetch career stats
      const { data: statsData, error: statsError } = await supabase
        .from('career_stats')
        .select('*')
        .eq('player_id', id)
        .single();
      
      if (!statsError) setCareerStats(statsData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading player details...</div>;
  if (!player) return <div style={{ textAlign: 'center', padding: '50px' }}>Player not found</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/players" style={{ color: '#166534', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← Back to Players</Link>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>{player.name}</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <p><strong>Team:</strong> {player.teams?.name || player.team_name}</p>
          <p><strong>Role:</strong> {player.role}</p>
          <p><strong>Batting Style:</strong> {player.batting_style || 'N/A'}</p>
          <p><strong>Bowling Style:</strong> {player.bowling_style || 'N/A'}</p>
          <p><strong>Jersey Number:</strong> #{player.jersey_number}</p>
          <p><strong>Nationality:</strong> {player.nationality || 'Pakistan'}</p>
        </div>

        {careerStats && (
          <>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', marginTop: '20px' }}>Career Statistics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              <div><strong>Matches:</strong> {careerStats.matches_played || 0}</div>
              <div><strong>Runs:</strong> {careerStats.runs_scored || 0}</div>
              <div><strong>Wickets:</strong> {careerStats.wickets_taken || 0}</div>
              <div><strong>Batting Average:</strong> {careerStats.batting_average || 0}</div>
              <div><strong>Strike Rate:</strong> {careerStats.strike_rate || 0}</div>
              <div><strong>Economy Rate:</strong> {careerStats.economy_rate || 0}</div>
              <div><strong>Fours:</strong> {careerStats.fours || 0}</div>
              <div><strong>Sixes:</strong> {careerStats.sixes || 0}</div>
              <div><strong>Catches:</strong> {careerStats.catches || 0}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerDetail;
