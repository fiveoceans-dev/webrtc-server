const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const connections = new Set();

wss.on('connection', (ws) => {
  console.log('A client connected');

  connections.add(ws);

  ws.on('message', (message) => {
    console.log('Received message:', message);
    broadcastMessage(message, ws);
  });

  ws.on('close', () => {
    console.log('A client disconnected');
    connections.delete(ws);
  });
});

function broadcastMessage(message, sender) {
  connections.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

