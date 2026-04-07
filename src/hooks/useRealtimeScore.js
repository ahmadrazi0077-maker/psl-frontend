// src/hooks/useRealtimeScore.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useRealtimeScore = (matchId) => {
  const [liveScore, setLiveScore] = useState(null);

  useEffect(() => {
    // Subscribe to match updates
    const channel = supabase
      .channel(`match-${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'matches',
          filter: `id=eq.${matchId}`,
        },
        (payload) => {
          setLiveScore(payload.new);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ball_by_ball',
          filter: `match_id=eq.${matchId}`,
        },
        (payload) => {
          setLiveScore(prev => ({ ...prev, lastBall: payload.new }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [matchId]);

  return liveScore;
};