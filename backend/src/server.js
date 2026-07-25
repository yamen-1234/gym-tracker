require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Ensure DB tables exist on boot (safe to run repeatedly, uses IF NOT EXISTS)
require('./config/migrate');

const authRoutes = require('./routes/auth');
const exerciseRoutes = require('./routes/exercises');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);

app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🏋️  Gym Tracker API running on http://localhost:${PORT}`);
});
