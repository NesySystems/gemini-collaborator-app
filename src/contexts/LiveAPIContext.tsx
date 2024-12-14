import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_CONFIG } from '../config/api';

type LiveAPIContextType = {
  client: any;
  setConfig: (config: any) => void;
  isConnected: boolean;
};

const LiveAPIContext = createContext<LiveAPIContextType>({
  client: null,
  setConfig: () => {},
  isConnected: false
});

export const LiveAPIProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [client, setClient] = useState<any>(null);
  const [config, setConfig] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (config) {
      try {
        const genAI = new GoogleGenerativeAI(API_CONFIG.googleApiKey);
        const model = genAI.getGenerativeModel(config);
        setClient(model);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to initialize Google API:', error);
        setIsConnected(false);
      }
    }
  }, [config]);

  return (
    <LiveAPIContext.Provider value={{ client, setConfig, isConnected }}>
      {children}
    </LiveAPIContext.Provider>
  );
};

export const useLiveAPIContext = () => useContext(LiveAPIContext);