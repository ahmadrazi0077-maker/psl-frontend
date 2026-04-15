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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [teamsRes, matchesRes, newsRes] = await Promise.all([
        supabase.from('teams').select('*').limit(6),
        supabase.from('matches').select('*, team1:team1_id(name), team2:team2_id(name)').eq('status', 'scheduled').limit(3),
        supabase.from('news').select('*').eq('is_published', true).order('published_at', { ascending: false }).limit(3)
      ]);
      
      setTeams(teamsRes.data || []);
      setMatches(matchesRes.data || []);
      setNews(newsRes.data || []);
    } catch (error) {
      console.error('Error:', error);
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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl text-white text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Pakistan Super League 2026</h1>
        <p className="text-xl mb-8">Welcome to PSL Updates Live - Your Ultimate PSL Destination</p>
        <Link to="/matches" className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
          Live Scores →
        </Link>
      </section>

      {/* Teams Section */}
      <section>
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
      </section>

      {/* Upcoming Matches */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Upcoming Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Points Table Preview */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Points Table</h2>
          <Link to="/standings" className="text-green-600 hover:text-green-700">View Full →</Link>
        </div>
        <PointsTable preview={true} />
      </section>

      {/* Latest News */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
