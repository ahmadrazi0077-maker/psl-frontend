import React, { useState, useEffect } from 'react';
import Loader from '../components/common/Loader';

const LiveScores = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchLiveMatches();
    const interval = setInterval(() => fetchLiveMatches(), 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveMatches = async () => {
    try {
      // Using free cricket API
      const response = await fetch('https://cricbuzz-live.vercel.app/v1/matches/live');
      const data = await response.json();
      setLiveMatches(data.data?.matches || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching live matches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

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
          onClick={fetchLiveMatches}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Refresh ↻
        </button>
      </div>
      
      {liveMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveMatches.map((match, index) => (
            <div key={match.id || index} className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-black bg-opacity-50 px-4 py-2">
                <span className="text-white font-bold">🔴 LIVE</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-bold text-lg">
                    {match.title?.split(',')[0]?.split(' vs ')[0] || 'Team 1'}
                  </span>
                  <span className="text-white text-xl font-bold">VS</span>
                  <span className="text-white font-bold text-lg">
                    {match.title?.split(',')[0]?.split(' vs ')[1] || 'Team 2'}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-white text-3xl font-bold">
                    {match.liveScore || '0/0 (0)'}
                  </span>
                </div>
                {match.update && (
                  <div className="text-center text-yellow-300 text-sm mt-2">
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
          <p className="text-gray-400 mt-2">Check back during match hours</p>
        </div>
      )}
    </div>
  );
};

export default LiveScores;
