import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Loader from '../components/common/Loader';

const LiveMatch = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetchMatchDetails();
    
    // Auto-refresh every 10 seconds for live matches
    let interval;
    if (isLive) {
      interval = setInterval(() => {
        fetchMatchDetails();
      }, 10000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [id, isLive]);

  const fetchMatchDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          team1:team1_id (name, code, logo_url),
          team2:team2_id (name, code, logo_url),
          winner:winner_team_id (name)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setMatch(data);
      setIsLive(data.status === 'live');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRunRate = (runs, overs) => {
    if (!overs || overs === 0) return '0.00';
    return (runs / overs).toFixed(2);
  };

  const getRequiredRunRate = (target, currentRuns, oversRemaining) => {
    if (!oversRemaining || oversRemaining <= 0) return '0.00';
    const runsNeeded = target - currentRuns;
    if (runsNeeded <= 0) return '0.00';
    return (runsNeeded / oversRemaining).toFixed(2);
  };

  if (loading) return <Loader />;
  if (!match) return <div className="text-center py-20">Match not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Link to="/matches" className="text-green-600 hover:text-green-700 mb-4 inline-block">
        ← Back to Matches
      </Link>

      {/* Match Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              {match.team1?.name} vs {match.team2?.name}
            </h1>
            {match.status === 'live' && (
              <span className="bg-red-600 px-3 py-1 rounded-full text-sm animate-pulse">
                🔴 LIVE
              </span>
            )}
          </div>
          <p className="text-sm opacity-90 mt-1">{match.venue}</p>
          <p className="text-sm opacity-75">
            {new Date(match.match_date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Score Section */}
        <div className="p-6">
          {match.status === 'live' || match.status === 'completed' ? (
            <>
              {/* Team 1 Score */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    {match.team1?.logo_url && (
                      <img src={match.team1.logo_url} alt={match.team1.name} className="w-8 h-8" />
                    )}
                    <span className="font-bold text-lg">{match.team1?.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold">
                      {match.team1_runs || 0}/{match.team1_wickets || 0}
                    </span>
                    <span className="text-gray-500 ml-2">
                      ({match.team1_overs || 0} ov)
                    </span>
                  </div>
                </div>
                {match.status === 'live' && (
                  <div className="text-sm text-gray-500">
                    CRR: {getRunRate(match.team1_runs || 0, match.team1_overs || 0)}
                  </div>
                )}
              </div>

              {/* VS Separator */}
              <div className="text-center text-gray-400 my-4">VS</div>

              {/* Team 2 Score */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    {match.team2?.logo_url && (
                      <img src={match.team2.logo_url} alt={match.team2.name} className="w-8 h-8" />
                    )}
                    <span className="font-bold text-lg">{match.team2?.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold">
                      {match.team2_runs || 0}/{match.team2_wickets || 0}
                    </span>
                    <span className="text-gray-500 ml-2">
                      ({match.team2_overs || 0} ov)
                    </span>
                  </div>
                </div>
                {match.status === 'live' && (
                  <div className="text-sm text-gray-500">
                    CRR: {getRunRate(match.team2_runs || 0, match.team2_overs || 0)}
                  </div>
                )}
              </div>

              {/* Target Info */}
              {match.status === 'live' && match.team1_overs && (
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-center text-gray-700">
                    {match.team2_runs < (match.team1_runs || 0) ? (
                      <>
                        Need {((match.team1_runs || 0) - (match.team2_runs || 0) + 1)} runs from{' '}
                        {((match.team1_overs || 20) - (match.team2_overs || 0)).toFixed(1)} overs
                        <br />
                        <span className="text-sm">
                          RR: {getRequiredRunRate(match.team1_runs || 0, match.team2_runs || 0, 
                            ((match.team1_overs || 20) - (match.team2_overs || 0)))}
                        </span>
                      </>
                    ) : (
                      match.team2_runs >= (match.team1_runs || 0) && (
                        <span className="text-green-600 font-bold">Target achieved!</span>
                      )
                    )}
                  </p>
                </div>
              )}

              {/* Result */}
              {match.result && (
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-4">
                  <p className="font-semibold text-green-800">{match.result}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Match hasn't started yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Scheduled for {new Date(match.match_date).toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Auto-refresh indicator for live matches */}
      {match.status === 'live' && (
        <div className="text-center text-sm text-gray-500">
          <span className="animate-pulse">🟢</span> Auto-refreshing every 10 seconds
        </div>
      )}
    </div>
  );
};

export default LiveMatch;
