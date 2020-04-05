class WebSocketManager {
  constructor(url, handle) {
    this.ws = new WebSocket(url);

    this.ws.addEventListener('message', async (event) => {
      if (event.type === 'message' && event.data) {
        try {
          await handle(JSON.parse(event.data));
        } catch (e) {
          console.error(e);
        }
      } else {
        console.error('Raw event:', event);
      }
    });
  }

  send(payload) {
    this.ws.send(JSON.stringify(payload))
  }

  close() {
    this.ws.close();
  }
}

export default WebSocketManager;