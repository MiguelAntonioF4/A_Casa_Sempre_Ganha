const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const authMiddleware = require('../middleware/auth');

// GET /api/leaderboard (público)
router.get('/', leaderboardController.getLeaderboard);

// GET /api/leaderboard/rank (protegida)
router.get('/rank', authMiddleware, leaderboardController.getUserRank);

module.exports = router;