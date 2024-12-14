// src/utils/websocket.ts
class WebSocketClient {
    private socket: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectTimeout = 1000;
  
    constructor(private url: string) {}
  
    connect() {
      try {
        this.socket = new WebSocket(this.url);
        this.setupEventHandlers();
      } catch (error) {
        console.error('WebSocket connection error:', error);
        this.handleReconnect();
      }
    }
  
    private setupEventHandlers() {
      if (!this.socket) return;
  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        this.handleReconnect();
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  
    private handleReconnect() {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(), this.reconnectTimeout);
      } else {
        console.error('Max reconnection attempts reached');
      }
    }
sendMessage(message: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  onMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          callback(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const wsClient = new WebSocketClient(import.meta.env.VITE_WEBSOCKET_URL);