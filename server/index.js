const WebSocket = require('ws');

const WS_PORT = 8081;

const wss = new WebSocket.Server({ port: WS_PORT });

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    wss.clients.forEach(function (client) {
      if (client !== ws) {
        client.send(message);
      }
    });
  });
});

wss.on('listening', function () {
  console.log(`ws server listening on port ${WS_PORT}`);
});