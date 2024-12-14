import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

type LiveAPIContextType = {
  client: GenerativeModel | null;
  setConfig: (config: any) => void;
  isConnected: boolean;
};

const LiveAPIContext = createContext<LiveAPIContextType>({
  client: null,
  setConfig: () => {},
  isConnected: false
});

export const LiveAPIProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [client, setClient] = useState<GenerativeModel | null>(null);
  const [config, setConfig] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (config) {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel(config);
      setClient(model);
      setIsConnected(true);
    }
  }, [config]);

  return (
    <LiveAPIContext.Provider value={{ client, setConfig, isConnected }}>
      {children}
    </LiveAPIContext.Provider>
  );
};

export const useLiveAPIContext = () => useContext(LiveAPIContext);