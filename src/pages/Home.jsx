import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Loader from '../components/common/Loader';
import MatchCard from '../components/matches/MatchCard';
import NewsCard from '../components/news/NewsCard';
import PointsTable from '../components/standings/PointsTable';
import SEO from '../components/SEO';

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [news, setNews] = useState([]);
  const [stats, setStats] = useState({
    totalTeams: 0,
    totalMatches: 0,
    totalPlayers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      // Fetch teams
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select('*')
        .limit(8);
      
      if (teamsError) throw teamsError;
      
      // Fetch upcoming matches
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('*, team1:team1_id(name, code), team2:team2_id(name, code)')
        .eq('status', 'scheduled')
        .order('match_date', { ascending: true })
        .limit(3);
      
      if (matchesError) throw matchesError;
      
      // Fetch latest news
      const { data: newsData, error: newsError } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (newsError) throw newsError;
      
      // Fetch stats
      const { count: teamsCount } = await supabase
        .from('teams')
        .select('*', { count: 'exact', head: true });
      
      const { count: playersCount } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true });
      
      const { count: matchesCount } = await supabase
        .from('matches')
        .select('*', { count: 'exact', head: true });
      
      setTeams(teamsData || []);
      setMatches(matchesData || []);
      setNews(newsData || []);
      setStats({
        totalTeams: teamsCount || 8,
        totalMatches: matchesCount || 44,
        totalPlayers: playersCount || 150
      });
      
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
        title="PSL Updates Live - Pakistan Super League 2026 Live Scores & Updates"
        description="Watch PSL 2026 live scores, match schedules, team standings, player statistics and latest news. Your ultimate destination for Pakistan Super League coverage."
        keywords="PSL, PSL 2026, Pakistan Super League, Cricket Live Scores, PSL Teams, PSL Players, PSL Schedule"
        url="https://pslupdateslive.online"
      />
      
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl text-white text-center py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Pakistan Super League 2026</h1>
          <p className="text-xl md:text-2xl mb-8">Welcome to PSL Updates Live - Your Ultimate PSL Destination</p>
          <Link 
            to="/matches" 
            className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition inline-block"
          >
            Live Scores →
          </Link>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="text-3xl font-bold text-green-600">{stats.totalTeams}</div>
            <div className="text-gray-600 mt-2">Teams</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="text-3xl font-bold text-green-600">{stats.totalMatches}</div>
            <div className="text-gray-600 mt-2">Matches</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="text-3xl font-bold text-green-600">{stats.totalPlayers}+</div>
            <div className="text-gray-600 mt-2">Players</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="text-3xl font-bold text-green-600">10M+</div>
            <div className="text-gray-600 mt-2">Fans</div>
          </div>
        </section>

        {/* Teams Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">PSL Teams 2026</h2>
            <Link to="/teams" className="text-green-600 hover:text-green-700">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <Link key={team.id} to={`/teams/${team.id}`}>
                <div className="bg-white rounded-lg p-4 text-center shadow hover:shadow-lg transition hover:-translate-y-1">
                  <h3 className="font-bold text-green-800">{team.name}</h3>
                  <p className="text-sm text-gray-600">{team.code}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming Matches */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📅 Upcoming Matches</h2>
            <Link to="/matches" className="text-green-600 hover:text-green-700">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matches.length > 0 ? (
              matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No upcoming matches scheduled</p>
              </div>
            )}
          </div>
        </section>

        {/* Points Table Preview */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📊 Points Table</h2>
            <Link to="/standings" className="text-green-600 hover:text-green-700">Full Table →</Link>
          </div>
          <PointsTable preview={true} />
        </section>

        {/* Latest News */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📰 Latest News</h2>
            <Link to="/news" className="text-green-600 hover:text-green-700">All News →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.length > 0 ? (
              news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No news available</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
