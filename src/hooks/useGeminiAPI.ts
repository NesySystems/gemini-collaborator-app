import { useCallback, useEffect, useRef, useState } from 'react';

interface GeminiAPIConfig {
  apiKey: string;
  baseUrl: string;
}

interface UseGeminiAPIOptions {
  onMessage?: (message: any) => void;
  onError?: (error: any) => void;
  autoReconnect?: boolean;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

export const useGeminiAPI = (config: GeminiAPIConfig, options: UseGeminiAPIOptions = {}) => {
  const {
    onMessage,
    onError,
    autoReconnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 5000
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setIsConnecting(true);
    const ws = new WebSocket(`${config.baseUrl}?key=${config.apiKey}`);

    ws.onopen = () => {
      setIsConnected(true);
      setIsConnecting(false);
      reconnectAttemptsRef.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage?.(data);
      } catch (error) {
        console.error('Failed to parse message:', error);
        onError?.(error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      onError?.(error);
    };

    ws.onclose = () => {
      setIsConnected(false);
      wsRef.current = null;

      if (autoReconnect && reconnectAttemptsRef.current < reconnectAttempts) {
        reconnectAttemptsRef.current += 1;
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, reconnectInterval);
      }
    };

    wsRef.current = ws;
  }, [config, onMessage, onError, autoReconnect, reconnectAttempts, reconnectInterval]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
  }, []);

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    isConnecting,
    sendMessage,
    connect,
    disconnect
  };
};