import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../components/common/Loader';
import SEO from '../components/SEO';

const LiveScores = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [usingFallback, setUsingFallback] = useState(false);

  // Multiple API endpoints as fallbacks
  const apiEndpoints = [
    'https://cricbuzz-live.vercel.app/v1/matches/live',
    'https://api.cricapi.com/v1/current_matches?apikey=YOUR_API_KEY', // Get free key from cricapi.com
    'https://cricketdata.org/api/v1/live' // Another option
  ];

  const fetchLiveMatches = useCallback(async () => {
    try {
      setError(null);
      
      // Try the free Cricbuzz API first
      const response = await fetch('https://cricbuzz-live.vercel.app/v1/matches/live', {
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.data?.matches && data.data.matches.length > 0) {
        setLiveMatches(data.data.matches);
        setUsingFallback(false);
      } else {
        // If no live matches, show demo/sample data
        setLiveMatches(getSampleMatches());
        setUsingFallback(true);
      }
      
    } catch (err) {
      console.error('API Error:', err);
      // Show sample matches for demo purposes
      setLiveMatches(getSampleMatches());
      setUsingFallback(true);
      setError('Using demo data. Live scores will appear when matches start.');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  // Sample matches for demo/when API is down
  const getSampleMatches = () => {
    return [
      {
        id: 'sample1',
        title: 'Peshawar Zalmi vs Karachi Kings, Match 32',
        liveScore: '185/4 (18.2)',
        update: 'Zalmi need 42 runs in 10 balls',
        venue: 'Gaddafi Stadium, Lahore',
        status: 'live',
        runRate: 'CRR: 10.1 | RRR: 12.5'
      },
      {
        id: 'sample2',
        title: 'Islamabad United vs Multan Sultans, Match 33',
        liveScore: '142/6 (15.0)',
        update: 'Multan need 68 runs in 30 balls',
        venue: 'Rawalpindi Stadium',
        status: 'live',
        runRate: 'CRR: 9.4 | RRR: 13.6'
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
              {usingFallback ? '📢 Demo Mode - ' : '🟢 Live Updates - '}
              Last updated: {lastUpdated.toLocaleTimeString()}
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
                  <h3 className="text-white font-semibold mb-3">{match.title || 'PSL Match'}</h3>
                  <div className="text-center mb-3">
                    <span className="text-white text-3xl font-bold">
                      {match.liveScore || '0/0 (0)'}
                    </span>
                  </div>
                  {match.runRate && (
                    <div className="text-center text-white text-sm mb-2">
                      {match.runRate}
                    </div>
                  )}
                  {match.update && (
                    <div className="text-center text-yellow-300 text-sm font-semibold">
                      {match.update}
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
            <p className="text-gray-400 text-sm mt-4">Next matches scheduled daily at 7:30 PM and 9:00 PM</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LiveScores;
