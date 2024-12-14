export const API_CONFIG = {
  googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  wsUrl: process.env.REACT_APP_GEMINI_WS_URL || 'wss://api.gemini.example.com/v1/ws'
};

// Validate API key is present
if (!API_CONFIG.googleApiKey) {
  console.error('Google API Key is not configured. Please add it to your .env file.');
}
