import { useEffect, useState, useRef, useCallback } from 'react';

export const useWebSocket = (url) => {
  const [lastMessage, setLastMessage] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const wsRef = useRef(null);

  // Only connect in development and if URL is provided
  const connect = useCallback(() => {
    // Don't connect in production or if no URL
    if (process.env.NODE_ENV === 'production' || !url) {
      console.log('WebSocket disabled in production');
      return;
    }

    try {
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';
      wsRef.current = new WebSocket(`${wsUrl}${url}`);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionError(null);
      };

      wsRef.current.onmessage = (event) => {
        setLastMessage(event);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionError('WebSocket connection error');
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
      };
    } catch (error) {
      setConnectionError(error.message);
    }
  }, [url]);

  useEffect(() => {
    connect();
    
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
      return true;
    }
    return false;
  }, []);

  return { lastMessage, isConnected, connectionError, sendMessage };
};
