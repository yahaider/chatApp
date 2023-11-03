const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    let userID = socket.id;
    console.log(`connected: ${userID}`);

    io.to(userID).emit('msgFromServer', {
      userID: userID,
      msg: "message from server ... !"
    })

    socket.on('msgFromClient', (data) => {
      console.log(data.msg)
    })

    socket.on('disconnect', () => {
        console.log(`disconnected: ${userID}`)
    });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});