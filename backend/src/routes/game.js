const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/auth');

// Todas as rotas protegidas
router.use(authMiddleware);

// GET /api/game/session
router.get('/session', gameController.getGameSession);

// PUT /api/game/session
router.put('/session', gameController.updateGameSession);

// POST /api/game/reset
router.post('/reset', gameController.resetGame);

module.exports = router;