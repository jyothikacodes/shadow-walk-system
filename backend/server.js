const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Simulation of Safe Street Lights for the Heatmap
const safePoints = [
    { lat: 12.9716, lng: 77.5946, intensity: 0.9 },
    { lat: 12.9720, lng: 77.5950, intensity: 0.7 },
    { lat: 12.9710, lng: 77.5940, intensity: 0.8 }
];

app.post('/report-shadow', (req, res) => {
    const report = req.body;
    console.log('🚨 Shadow Alert Received:', report);
    // Broadcast to all connected dashboards
    io.emit('new-shadow-alert', report);
    res.status(200).send({ status: "Success" });
});

server.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
});