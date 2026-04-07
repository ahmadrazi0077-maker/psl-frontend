import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

export const useLiveScore = (matchId) => {
  const [liveScore, setLiveScore] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const { lastMessage, isConnected, sendMessage } = useWebSocket(`/live/${matchId}`);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      setLiveScore(data);
      setIsLive(data.status === 'live');
    }
  }, [lastMessage]);

  const subscribeToMatch = () => {
    sendMessage({ type: 'subscribe', matchId });
  };

  const unsubscribeFromMatch = () => {
    sendMessage({ type: 'unsubscribe', matchId });
  };

  return {
    liveScore,
    isLive,
    isConnected,
    subscribeToMatch,
    unsubscribeFromMatch
  };
};