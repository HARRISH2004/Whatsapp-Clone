const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', socket => {
    // Receive new stream and broadcast it to other users
    socket.on('new-stream', stream => {
        socket.broadcast.emit('receive-stream', stream);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
