import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamDetails();
  }, [id]);

  const fetchTeamDetails = async () => {
    try {
      // Fetch team details
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('id', id)
        .single();
      
      if (teamError) throw teamError;
      setTeam(teamData);

      // Fetch players of this team
      const { data: playersData, error: playersError } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', id);
      
      if (!playersError) setPlayers(playersData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading team details...</div>;
  if (!team) return <div style={{ textAlign: 'center', padding: '50px' }}>Team not found</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/teams" style={{ color: '#166534', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← Back to Teams</Link>
      
      {/* Team Header */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', marginBottom: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#166534', marginBottom: '16px' }}>{team.name}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          <p><strong>Code:</strong> {team.code}</p>
          <p><strong>Captain:</strong> {team.captain_name}</p>
          <p><strong>Coach:</strong> {team.coach_name}</p>
          <p><strong>Home Ground:</strong> {team.home_ground}</p>
          <p><strong>City:</strong> {team.city}</p>
        </div>
      </div>

      {/* Players Section */}
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Squad</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {players.map((player) => (
          <Link to={`/players/${player.id}`} key={player.id} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1f2937' }}>{player.name}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>{player.role}</p>
              <p style={{ color: '#166534', fontSize: '12px' }}>Jersey #{player.jersey_number}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamDetail;
