import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Scoreboard from '../components/matches/Scoreboard';
import Loader from '../components/common/Loader';
import { useWebSocket } from '../hooks/useWebSocket';
import { fetchMatchDetails } from '../services/matchService';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LiveMatch = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lastMessage, isConnected } = useWebSocket(`/live/${id}`);

  const loadMatch = useCallback(async () => {
    try {
      const data = await fetchMatchDetails(id);
      setMatch(data);
    } catch (error) {
      console.error('Error loading match:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadMatch();
  }, [loadMatch]);

  useEffect(() => {
    if (lastMessage) {
      const updatedScore = JSON.parse(lastMessage.data);
      setMatch(prev => ({ ...prev, ...updatedScore }));
    }
  }, [lastMessage]);

  if (loading) return <Loader />;
  if (!match) return <div>Match not found</div>;

  return (
    <div className="space-y-6">
      <Link to="/matches" className="inline-flex items-center text-green-600 hover:text-green-700">
        <FaArrowLeft className="mr-2" /> Back to Matches
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            {match.team1?.name || 'Team 1'} vs {match.team2?.name || 'Team 2'}
          </h1>
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'Live Updates' : 'Reconnecting...'}
            </span>
          </div>
        </div>
        
        <div className="text-center py-4 bg-gray-50 rounded">
          <p className="text-gray-600">{match.venue}</p>
          <p className="text-sm text-gray-500 mt-1">{match.date}</p>
        </div>
      </div>

      {match.currentInnings && <Scoreboard innings={match.currentInnings} />}
      
      {match.secondInnings && <Scoreboard innings={match.secondInnings} />}

      {match.summary && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-3">Match Summary</h3>
          <p className="text-gray-700">{match.summary}</p>
          {match.result && (
            <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-600">
              <p className="font-semibold text-green-800">{match.result}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveMatch;
