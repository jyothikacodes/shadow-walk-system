const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../'))); // Serves your root folder

app.post('/report-shadow', (req, res) => {
    io.emit('new-alert', req.body);
    res.status(200).send("SOS Broadcasted");
});

server.listen(3000, () => {
    console.log('🚀 SYSTEM LIVE AT http://localhost:3000/dashboard/index.html');
});