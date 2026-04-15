import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import Loader from '../components/common/Loader';

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [news, setNews] = useState([]);
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
      
      // Fetch latest news
      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);
      
      setTeams(teamsData || []);
      setMatches(matchesData || []);
      setNews(newsData || []);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <SEO 
        title="PSL Updates Live - Pakistan Super League 2026 Live Scores"
        description="Watch PSL 2026 live scores, match schedules, team standings, player stats and latest news. Your ultimate destination for Pakistan Super League coverage."
      />
      
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl text-white text-center py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Pakistan Super League 2026</h1>
          <p className="text-xl md:text-2xl mb-8">Welcome to PSL Updates Live - Your Ultimate PSL Destination</p>
          <Link to="/matches" className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition inline-block">
            Live Scores →
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600">8</div>
            <div className="text-gray-600 mt-2">Teams</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600">44</div>
            <div className="text-gray-600 mt-2">Matches</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600">150+</div>
            <div className="text-gray-600 mt-2">Players</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600">10M+</div>
            <div className="text-gray-600 mt-2">Fans</div>
          </div>
        </div>

        {/* Teams Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">PSL Teams 2026</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teams.map((team) => (
              <Link key={team.id} to={`/teams/${team.id}`}>
                <div className="bg-white rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                  <h3 className="font-bold text-green-800">{team.name}</h3>
                  <p className="text-sm text-gray-600">{team.code}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Matches Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Matches</h2>
            <Link to="/matches" className="text-green-600 hover:text-green-700">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matches.map((match) => (
              <Link key={match.id} to={`/matches/${match.id}`}>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">
                      {new Date(match.match_date).toLocaleDateString()}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {match.status || 'Scheduled'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center flex-1">
                      <p className="font-bold">{match.team1?.name}</p>
                    </div>
                    <div className="text-xl font-bold mx-4">VS</div>
                    <div className="text-center flex-1">
                      <p className="font-bold">{match.team2?.name}</p>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-3">
                    {match.venue}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest News Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Latest News</h2>
            <Link to="/news" className="text-green-600 hover:text-green-700">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`}>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(item.published_at).toLocaleDateString()}</span>
                    <span className="text-green-600">Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
