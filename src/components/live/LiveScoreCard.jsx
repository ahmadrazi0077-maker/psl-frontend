import React, { useEffect, useState } from 'react';

const LiveScoreCard = ({ match, onRefresh }) => {
  const [detailedScore, setDetailedScore] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Your CricAPI key
  const API_KEY = '01f087aa-ed19-4c2f-a28e-1d3ed197af2a';
  const API_BASE = 'https://api.cricapi.com/v1';

  useEffect(() => {
    if (match.id) {
      fetchDetailedScore();
    }
  }, [match.id]);

  const fetchDetailedScore = async () => {
    setLoading(true);
    try {
      // Try CricAPI first
      const response = await fetch(`${API_BASE}/match_info?apikey=${API_KEY}&id=${match.id}`);
      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        // Transform CricAPI data to match your component's expected format
        const score = data.data.score?.[0] || {};
        setDetailedScore({
          battingTeam: score.battingTeam,
          runs: score.r,
          wickets: score.w,
          overs: score.o,
          runRate: score.rr,
          partnership: score.partnership,
          lastWicket: score.lastWicket
        });
      } else {
        // Fallback to Cricbuzz API if CricAPI fails
        const fallbackResponse = await fetch(`https://cricbuzz-live.vercel.app/v1/score/${match.id}`);
        const fallbackData = await fallbackResponse.json();
        setDetailedScore(fallbackData.data);
      }
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract team names from title
  const extractTeams = (title) => {
    if (!title) return { team1: 'Team 1', team2: 'Team 2' };
    const teams = title?.split(',')[0] || '';
    const [team1, team2] = teams.split(' vs ');
    return { team1: team1?.trim() || 'Team 1', team2: team2?.trim() || 'Team 2' };
  };

  const { team1, team2 } = extractTeams(match.title);
  
  // Parse live score from different formats
  const parseLiveScore = (liveScore) => {
    if (!liveScore) return { runs: 0, wickets: 0, overs: '0' };
    
    // Check if liveScore is a string and parse accordingly
    if (typeof liveScore === 'string') {
      // Check for score format like "LQ: 185/4 (18.2)"
      const match = liveScore.match(/(\w+):?\s*(\d+)\/(\d+)\s*\(([\d.]+)\s*(?:ov|Ovs)\)/i);
      if (match) {
        return { 
          battingTeam: match[1], 
          runs: match[2], 
          wickets: match[3], 
          overs: match[4] 
        };
      }
      
      // Try alternate format
      const altMatch = liveScore.match(/(\d+)\/(\d+)\s*\(([\d.]+)\s*ov\)/i);
      if (altMatch) {
        return { runs: altMatch[1], wickets: altMatch[2], overs: altMatch[3] };
      }
    }
    
    return { runs: 0, wickets: 0, overs: '0' };
  };

  const scoreInfo = parseLiveScore(match.liveScore);
  const isLive = match.matchStarted && !match.matchEnded;

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${
      isLive ? 'bg-gradient-to-r from-red-600 to-red-800' : 'bg-gradient-to-r from-green-700 to-green-600'
    }`}>
      <div className="bg-black bg-opacity-50 px-4 py-2">
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">{isLive ? '🔴 LIVE' : '📅 UPCOMING'}</span>
          <span className="text-white text-sm">{match.venue || match.timeAndPlace?.place || 'PSL 2026'}</span>
        </div>
      </div>
      
      <div className="p-4">
        {/* Teams */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-white font-bold text-lg">{team1}</span>
          <span className="text-white text-xl font-bold">VS</span>
          <span className="text-white font-bold text-lg">{team2}</span>
        </div>
        
        {/* Score */}
        <div className="text-center mb-3">
          <span className="text-white text-3xl font-bold">
            {match.liveScore || scoreInfo.runs > 0 ? `${scoreInfo.runs}/${scoreInfo.wickets} (${scoreInfo.overs} ov)` : '0/0 (0 ov)'}
          </span>
        </div>
        
        {/* Run Rate */}
        {(match.runRate || detailedScore?.runRate) && (
          <div className="text-center text-white text-opacity-80 text-sm mb-3">
            CRR: {match.runRate || detailedScore?.runRate}
          </div>
        )}
        
        {/* Match Update / Status */}
        {match.update && (
          <div className="text-center text-yellow-300 text-sm font-semibold">
            {match.update}
          </div>
        )}
        
        {/* Partnership info if available */}
        {detailedScore?.partnership && (
          <div className="text-center text-white text-opacity-70 text-xs mt-2">
            Partnership: {detailedScore.partnership}
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
