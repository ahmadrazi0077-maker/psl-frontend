import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MatchCard from '../components/matches/MatchCard';
import PointsTable from '../components/standings/PointsTable';
import NewsCard from '../components/news/NewsCard';
import Loader from '../components/common/Loader';
import { supabase } from '../lib/supabase';
import { FaTrophy, FaUsers, FaChartLine } from 'react-icons/fa';
import { GiCricketBat } from "react-icons/gi";

const Home = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalTeams: 6,
    totalPlayers: 0,
    totalFans: '10M+'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      
      // Fetch live matches
      const { data: liveData, error: liveError } = await supabase
        .from('matches')
        .select(`
          *,
          team1:team1_id(name, code, logo_url),
          team2:team2_id(name, code, logo_url)
        `)
        .eq('status', 'live')
        .order('match_date', { ascending: true });
      
      if (liveError) throw liveError;
      setLiveMatches(liveData || []);
      
      // Fetch upcoming matches
      const { data: upcomingData, error: upcomingError } = await supabase
        .from('matches')
        .select(`
          *,
          team1:team1_id(name, code, logo_url),
          team2:team2_id(name, code, logo_url)
        `)
        .eq('status', 'scheduled')
        .gte('match_date', new Date().toISOString())
        .order('match_date', { ascending: true })
        .limit(3);
      
      if (upcomingError) throw upcomingError;
      setUpcomingMatches(upcomingData || []);
      
      // Fetch latest news
      const { data: newsData, error: newsError } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (newsError) throw newsError;
      setLatestNews(newsData || []);
      
      // Fetch total players count
      const { count: playersCount, error: playersError } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true });
      
      if (!playersError) {
        setStats(prev => ({ ...prev, totalPlayers: playersCount || 0 }));
      }
      
      // Fetch total matches count
      const { count: matchesCount, error: matchesError } = await supabase
        .from('matches')
        .select('*', { count: 'exact', head: true });
      
      if (!matchesError) {
        setStats(prev => ({ ...prev, totalMatches: matchesCount || 0 }));
      }
      
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to PSL Fan Hub</h1>
          <p className="text-xl md:text-2xl mb-8">Your ultimate destination for Pakistan Super League 2026 action</p>
          <Link to="/matches" className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
            Live Scores →
          </Link>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
          <GiCricketBat className="text-4xl text-green-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold">{stats.totalMatches}</h3>
          <p className="text-gray-600">Total Matches</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
          <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold">{stats.totalTeams}</h3>
          <p className="text-gray-600">Teams</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
          <FaUsers className="text-4xl text-blue-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold">{stats.totalPlayers}+</h3>
          <p className="text-gray-600">Players</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
          <FaChartLine className="text-4xl text-purple-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold">{stats.totalFans}</h3>
          <p className="text-gray-600">Fans Worldwide</p>
        </div>
      </section>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">🔥 Live Matches</h2>
            <Link to="/matches" className="text-green-600 hover:text-green-700">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveMatches.map(match => (
              <MatchCard key={match.id} match={match} type="live" />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Matches */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📅 Upcoming Matches</h2>
          <Link to="/matches" className="text-green-600 hover:text-green-700">View All →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map(match => (
              <MatchCard key={match.id} match={match} type="upcoming" />
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
          {latestNews.length > 0 ? (
            latestNews.map(news => (
              <NewsCard key={news.id} news={news} />
            ))
          ) : (
            <div className="col-span-3 text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No news available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
