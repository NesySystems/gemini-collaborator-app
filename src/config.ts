export const config = {
  geminiApi: {
    baseUrl: process.env.REACT_APP_GEMINI_API_URL || 'wss://api.gemini.example.com/v1/ws',
    reconnectAttempts: 5,
    reconnectInterval: 5000
  }
};