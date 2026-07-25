const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Stage 5 will implement full CRUD + label filtering + search here.
router.get('/', requireAuth, (req, res) => {
  res.json({ message: 'Exercises endpoint — coming in the Tracker stage.' });
});

module.exports = router;
