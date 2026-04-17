import React, { useEffect, useState } from 'react';

const LiveScoreCard = ({ match, onRefresh }) => {
  const [detailedScore, setDetailedScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.id) {
      fetchDetailedScore();
    }
  }, [match.id]);

  const fetchDetailedScore = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://cricbuzz-live.vercel.app/v1/score/${match.id}`);
      const data = await response.json();
      setDetailedScore(data.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract team names from title
  const extractTeams = (title) => {
    const teams = title?.split(',')[0] || '';
    const [team1, team2] = teams.split(' vs ');
    return { team1, team2 };
  };

  const { team1, team2 } = extractTeams(match.title);
  
  // Parse live score
  const parseLiveScore = (liveScore) => {
    if (!liveScore) return { runs: 0, wickets: 0, overs: '0' };
    const match = liveScore.match(/(\w+)\s+(\d+)\/(\d+)\s*\(([\d.]+)\s*Ovs\)/);
    if (match) {
      return { battingTeam: match[1], runs: match[2], wickets: match[3], overs: match[4] };
    }
    return { runs: 0, wickets: 0, overs: '0' };
  };

  const scoreInfo = parseLiveScore(match.liveScore);

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg overflow-hidden">
      <div className="bg-black bg-opacity-50 px-4 py-2">
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">🔴 LIVE</span>
          <span className="text-white text-sm">{match.timeAndPlace?.place || 'Venue TBD'}</span>
        </div>
      </div>
      
      <div className="p-4">
        {/* Teams */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-white font-bold text-lg">{team1 || 'Team 1'}</span>
          <span className="text-white text-xl font-bold">VS</span>
          <span className="text-white font-bold text-lg">{team2 || 'Team 2'}</span>
        </div>
        
        {/* Score */}
        <div className="text-center mb-3">
          <span className="text-white text-3xl font-bold">
            {match.liveScore || '0/0 (0)'}
          </span>
        </div>
        
        {/* Run Rate */}
        {match.runRate && (
          <div className="text-center text-white text-opacity-80 text-sm mb-3">
            {match.runRate}
          </div>
        )}
        
        {/* Match Update */}
        {match.update && (
          <div className="text-center text-yellow-300 text-sm font-semibold">
            {match.update}
          </div>
        )}
        
        {/* Auto-refresh indicator */}
        <div className="mt-3 text-center">
          <span className="text-white text-opacity-50 text-xs">
            Auto-updates every 30 seconds
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveScoreCard;
