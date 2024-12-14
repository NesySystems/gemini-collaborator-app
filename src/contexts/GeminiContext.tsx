import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Define types for Gemini chat message
interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

// Define the context state type
interface GeminiContextState {
  messages: GeminiMessage[];
  isProcessing: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

// Create the context with an initial undefined state
const GeminiContext = createContext<GeminiContextState | undefined>(undefined);

// Define props for the provider component
interface GeminiProviderProps {
  children: ReactNode;
  apiKey?: string;
}

export const GeminiProvider: React.FC<GeminiProviderProps> = ({ children, apiKey }) => {
  const [messages, setMessages] = useState<GeminiMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to send message to Gemini API
  const sendMessage = useCallback(async (content: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Add user message to chat
      const userMessage: GeminiMessage = {
        role: 'user',
        content,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);

      // TODO: Implement actual Gemini API call here
      // This is a placeholder response
      const response = await new Promise<string>(resolve => 
        setTimeout(() => resolve("Response from Gemini API"), 1000)
      );

      // Add Gemini's response to chat
      const geminiMessage: GeminiMessage = {
        role: 'model',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, geminiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Function to clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  // Context value
  const contextValue: GeminiContextState = {
    messages,
    isProcessing,
    error,
    sendMessage,
    clearChat,
  };

  return (
    <GeminiContext.Provider value={contextValue}>
      {children}
    </GeminiContext.Provider>
  );
};

// Custom hook for using the Gemini context
export const useGemini = (): GeminiContextState => {
  const context = useContext(GeminiContext);
  if (context === undefined) {
    throw new Error('useGemini must be used within a GeminiProvider');
  }
  return context;
};