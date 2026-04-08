import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MatchCard from '../components/matches/MatchCard';
import PointsTable from '../components/standings/PointsTable';
import NewsCard from '../components/news/NewsCard';
import Loader from '../components/common/Loader';
import { fetchLiveMatches, fetchUpcomingMatches, fetchNews, fetchStats } from '../services/supabaseService';
import { FaTrophy, FaUsers, FaChartLine, FaCricket } from 'react-icons/fa';
import { GiCricketBat } from "react-icons/gi";

const Home = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalTeams: 0,
    totalPlayers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      
      const [live, upcoming, news, statsData] = await Promise.all([
        fetchLiveMatches(),
        fetchUpcomingMatches(),
        fetchNews(3),
        fetchStats()
      ]);
      
      setLiveMatches(live);
      setUpcomingMatches(upcoming.slice(0, 3));
      setLatestNews(news);
      setStats(statsData);
      
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
          <Link to="/matches" className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition transform hover:scale-105">
            Live Scores →
          </Link>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
          <GiCricketBat className="text-4xl text-green-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold">{stats.totalMatches}</h3>
          <p className="text-gray-600">Total Matches</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
          <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold">{stats.totalTeams}</h3>
          <p className="text-gray-600">Teams</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
          <FaUsers className="text-4xl text-blue-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold">{stats.totalPlayers}+</h3>
          <p className="text-gray-600">Players</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
          <FaChartLine className="text-4xl text-purple-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold">10M+</h3>
          <p className="text-gray-600">Fans Worldwide</p>
        </div>
      </section>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <section className="animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">🔥 Live Matches</h2>
            <Link to="/matches" className="text-green-600 hover:text-green-700 font-semibold">View All →</Link>
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
          <Link to="/matches" className="text-green-600 hover:text-green-700 font-semibold">View All →</Link>
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
          <Link to="/standings" className="text-green-600 hover:text-green-700 font-semibold">Full Table →</Link>
        </div>
        <PointsTable preview={true} />
      </section>

      {/* Latest News */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📰 Latest News</h2>
          <Link to="/news" className="text-green-600 hover:text-green-700 font-semibold">All News →</Link>
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
