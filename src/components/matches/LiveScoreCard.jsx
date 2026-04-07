import { useEffect, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './LiveScoreCard.css';

const LiveScoreCard = ({ matchId }) => {
  const [score, setScore] = useState(null);
  const { lastMessage } = useWebSocket(`/live/${matchId}`);

  useEffect(() => {
    if (lastMessage) {
      setScore(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);

  if (!score) return <Loader />;

  return (
    <div className="live-score-card bg-red-600 text-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="team">
          <h3>{score.team1}</h3>
          <p className="text-2xl font-bold">
            {score.team1_runs}/{score.team1_wickets}
          </p>
          <p className="text-sm">{score.team1_overs} overs</p>
        </div>
        
        <div className="vs text-xl font-bold">VS</div>
        
        <div className="team">
          <h3>{score.team2}</h3>
          <p className="text-2xl font-bold">
            {score.team2_runs}/{score.team2_wickets}
          </p>
          <p className="text-sm">{score.team2_overs} overs</p>
        </div>
      </div>
      
      <div className="match-status mt-3 text-center">
        <span className="live-badge animate-pulse">● LIVE</span>
        <p className="mt-2">{score.current_status}</p>
      </div>
    </div>
  );
};