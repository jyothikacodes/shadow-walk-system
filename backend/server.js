const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock database for "Shadow" reports (bad lighting/suspicious activity)
let shadowReports = [
    { id: 1, lat: 9.9312, lng: 76.2673, type: 'Poor Lighting' }
];

// Safety Algorithm: Calculates weight based on "Vibrancy" (Open Businesses)
app.post('/calculate-route', (req, res) => {
    const { start, end } = req.body;
    
    // In a real app, you'd call Google Places API here.
    // For the demo, we return a "Safe Path" vs "Fast Path"
    const safetyData = {
        safe_path: {
            coords: [[9.9312, 76.2673], [9.9350, 76.2700]], 
            safety_score: "High (4 Open Cafes nearby)",
            distance: "1.2 km"
        },
        fast_path: {
            coords: [[9.9312, 76.2673], [9.9320, 76.2680]], 
            safety_score: "Low (Industrial Area/Closed)",
            distance: "0.8 km"
        }
    };
    res.json(safetyData);
});

// Endpoint for the "Shadow" button
app.post('/report-shadow', (req, res) => {
    const report = { ...req.body, id: Date.now(), time: new Date() };
    shadowReports.push(report);
    console.log("🚨 New Shadow Report:", report);
    res.status(200).send({ message: "Report added to Living Map" });
});

app.listen(3000, () => console.log('🚀 Shadow-Walk Engine Live on Port 3000'));