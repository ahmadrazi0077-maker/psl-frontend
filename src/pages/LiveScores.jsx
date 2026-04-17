import React, { useState, useEffect } from 'react';
import { liveScoreService } from '../services/liveScoreService';
import LiveScoreCard from '../components/live/LiveScoreCard';
import Loader from '../components/common/Loader';

const LiveScores = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchLiveMatches();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchLiveMatches();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchLiveMatches = async () => {
    try {
      const matches = await liveScoreService.getLiveMatches();
      setLiveMatches(matches);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchLiveMatches();
  };

  if (loading && liveMatches.length === 0) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🔴 Live Scores</h1>
          <p className="text-gray-500 text-sm mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <button 
          onClick={handleRefresh}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Refresh ↻
        </button>
      </div>
      
      {liveMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveMatches.map((match, index) => (
            <LiveScoreCard key={match.id || index} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No live matches at the moment</p>
          <p className="text-gray-400 mt-2">Check back during match hours</p>
        </div>
      )}
    </div>
  );
};

export default LiveScores;
