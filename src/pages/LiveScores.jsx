import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../components/common/Loader';
import SEO from '../components/SEO';

const LiveScores = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Your CricAPI key
  const API_KEY = '01f087aa-ed19-4c2f-a28e-1d3ed197af2a';
  const API_BASE = 'https://api.cricapi.com/v1';

  // Fetch live matches from CricAPI
  const fetchLiveMatches = useCallback(async () => {
    try {
      setError(null);
      
      // Get current matches
      const response = await fetch(`${API_BASE}/current_matches?apikey=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success' && data.data && data.data.length > 0) {
        // Filter for PSL matches
        const pslMatches = data.data.filter(match => 
          match.name?.toLowerCase().includes('psl') || 
          match.name?.toLowerCase().includes('pakistan super league') ||
          match.series_id === 'psl_2026'
        );
        
        // For each live match, fetch detailed score
        const matchesWithScores = await Promise.all(
          pslMatches.map(async (match) => {
            try {
              const scoreResponse = await fetch(`${API_BASE}/match_info?apikey=${API_KEY}&id=${match.id}`);
              const scoreData = await scoreResponse.json();
              
              if (scoreData.status === 'success' && scoreData.data) {
                const score = scoreData.data.score?.[0] || {};
                return {
                  id: match.id,
                  title: match.name,
                  team1: match.teams?.[0] || 'Team 1',
                  team2: match.teams?.[1] || 'Team 2',
                  team1Score: score.r ? `${score.r}/${score.w}` : '0/0',
                  team1Overs: score.o || 0,
                  status: match.status,
                  venue: match.venue,
                  result: match.status,
                  isLive: match.matchStarted && !match.matchEnded
                };
              }
              return null;
            } catch (err) {
              console.error('Error fetching match details:', err);
              return null;
            }
          })
        );
        
        setLiveMatches(matchesWithScores.filter(m => m !== null));
      } else {
        // Show sample/demo matches when no live matches
        setLiveMatches(getDemoMatches());
        setError('No live matches currently. Demo data shown.');
      }
      
    } catch (err) {
      console.error('API Error:', err);
      setLiveMatches(getDemoMatches());
      setError('Using demo data. Live scores will appear when matches start.');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, [API_KEY]);

  // Demo matches for when no live matches are available
  const getDemoMatches = () => {
    return [
      {
        id: 'demo1',
        title: 'Peshawar Zalmi vs Karachi Kings',
        team1: 'Peshawar Zalmi',
        team2: 'Karachi Kings',
        team1Score: '185/4',
        team1Overs: 18.2,
        status: 'Zalmi need 42 runs in 10 balls',
        venue: 'Gaddafi Stadium, Lahore',
        isLive: true
      },
      {
        id: 'demo2',
        title: 'Islamabad United vs Multan Sultans',
        team1: 'Islamabad United',
        team2: 'Multan Sultans',
        team1Score: '142/6',
        team1Overs: 15.0,
        status: 'Multan need 68 runs in 30 balls',
        venue: 'Rawalpindi Stadium',
        isLive: true
      }
    ];
  };

  useEffect(() => {
    fetchLiveMatches();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchLiveMatches();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchLiveMatches]);

  if (loading) return <Loader />;

  return (
    <>
      <SEO 
        title="PSL Live Scores 2026 - Real-time Match Updates"
        description="Watch PSL 2026 live scores, ball-by-ball updates, match commentary, and real-time statistics. Follow Pakistan Super League action live."
        keywords="PSL live scores, PSL 2026 live, Pakistan Super League live, live cricket scores"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🔴 Live Scores</h1>
            <p className="text-gray-500 text-sm mt-1">
              🟢 Live Updates - Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <button 
            onClick={fetchLiveMatches}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Refresh ↻
          </button>
        </div>
        
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <p className="text-yellow-700">{error}</p>
          </div>
        )}
        
        {liveMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveMatches.map((match, index) => (
              <div key={match.id || index} className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-black bg-opacity-50 px-4 py-2 flex justify-between items-center">
                  <span className="text-white font-bold">🔴 LIVE</span>
                  <span className="text-white text-sm">{match.venue || 'PSL 2026'}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-4 text-center">{match.title || `${match.team1} vs ${match.team2}`}</h3>
                  
                  {/* Team 1 Score */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-bold text-lg">{match.team1}</span>
                    <span className="text-white text-2xl font-bold">{match.team1Score}</span>
                  </div>
                  
                  {/* Team 2 Score */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-bold text-lg">{match.team2}</span>
                    <span className="text-white text-2xl font-bold">{match.team2Score || '0/0'}</span>
                  </div>
                  
                  {/* Match Status/Update */}
                  {match.status && (
                    <div className="text-center text-yellow-300 text-sm font-semibold mt-3">
                      {match.status}
                    </div>
                  )}
                  
                  {/* Overs Info */}
                  {match.team1Overs > 0 && (
                    <div className="text-center text-white text-xs mt-2 opacity-75">
                      Overs: {match.team1Overs}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No live matches at the moment</p>
            <p className="text-gray-400 mt-2">Check back during match hours (usually 7:30 PM PKT)</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LiveScores;
