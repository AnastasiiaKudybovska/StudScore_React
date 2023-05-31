/* istanbul ignore file */
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let count = 0;




wss.on('connection', ws => {
  ws.send(count.toString());

  ws.on('message', message => {
    const mess = JSON.parse(message)

    if (mess.action === 'increment_donation') {
      count++;
      wss.clients.forEach(client => {
        console.log(count.toString())
        if (client.readyState === WebSocket.OPEN) {
        //   console.log(count.toString())
          client.send(count.toString());
        }
      });
    }
    
    
 
  });
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});
