import React, { useState, useEffect } from 'react';
import MatchCard from '../components/matches/MatchCard';
import Loader from '../components/common/Loader';
import { fetchLiveMatches, fetchUpcomingMatches, fetchPastMatches } from '../services/matchService';

const Matches = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const [live, upcoming, past] = await Promise.all([
        fetchLiveMatches(),
        fetchUpcomingMatches(),
        fetchPastMatches()
      ]);
      setLiveMatches(live);
      setUpcomingMatches(upcoming);
      setPastMatches(past);
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'live', label: 'LIVE', count: liveMatches.length },
    { id: 'upcoming', label: 'Upcoming', count: upcomingMatches.length },
    { id: 'past', label: 'Past', count: pastMatches.length }
  ];

  const getCurrentMatches = () => {
    switch(activeTab) {
      case 'live': return liveMatches;
      case 'upcoming': return upcomingMatches;
      case 'past': return pastMatches;
      default: return [];
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Matches</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === tab.id 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      {getCurrentMatches().length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentMatches().map(match => (
            <MatchCard key={match.id} match={match} type={activeTab} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No {activeTab} matches available</p>
        </div>
      )}
    </div>
  );
};

export default Matches;