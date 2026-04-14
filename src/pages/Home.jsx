import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      // Fetch teams
      const { data: teamsData } = await supabase
        .from('teams')
        .select('*')
        .limit(6);
      
      // Fetch latest news
      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);
      
      // Fetch upcoming matches
      const { data: matchesData } = await supabase
        .from('matches')
        .select(`
          *,
          team1:team1_id(name, code),
          team2:team2_id(name, code)
        `)
        .eq('status', 'scheduled')
        .order('match_date', { ascending: true })
        .limit(3);
      
      setTeams(teamsData || []);
      setLatestNews(newsData || []);
      setUpcomingMatches(matchesData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

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
        <p style={{ fontSize: '20px', marginBottom: '24px' }}>Welcome to PSL Updates Live</p>
        <Link to="/matches">
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
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#166534' }}>6</div>
          <div>Teams</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#166534' }}>34</div>
          <div>Matches</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#166534' }}>150+</div>
          <div>Players</div>
        </div>
      </div>

      {/* Teams Section */}
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>PSL Teams 2026</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {teams.map((team) => (
          <Link to={`/teams/${team.id}`} key={team.id} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#166534' }}>{team.name}</h3>
              <p style={{ color: '#4b5563' }}>Captain: {team.captain_name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Upcoming Matches */}
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Upcoming Matches</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
        {upcomingMatches.map((match) => (
          <div key={match.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}>
              <div style={{ flex: 1 }}><strong>{match.team1?.name}</strong></div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 20px' }}>VS</div>
              <div style={{ flex: 1 }}><strong>{match.team2?.name}</strong></div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '12px', color: '#6b7280' }}>
              {match.venue} | {new Date(match.match_date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Latest News */}
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Latest News</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {latestNews.map((news) => (
          <Link to={`/news/${news.id}`} key={news.id} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{news.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>{news.excerpt}</p>
              <p style={{ color: '#166534', fontSize: '12px', marginTop: '12px' }}>{new Date(news.published_at).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
