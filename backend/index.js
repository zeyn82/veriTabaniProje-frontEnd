const express = require('express');
const cors = require('cors');

const yolcuRoutes = require('./routes/yolcu.routes');
const ucusRoutes = require('./routes/ucus.routes');
const biletRoutes = require('./routes/bilet.routes');

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 TEST ENDPOINT
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend çalışıyor 🚀" });
});

// 🔹 ROUTES
app.use('/api', yolcuRoutes);
app.use('/api', ucusRoutes);
app.use('/api', biletRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});

