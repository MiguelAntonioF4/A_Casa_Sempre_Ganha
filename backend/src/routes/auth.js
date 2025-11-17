const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres')
  ],
  authController.register
);

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/me (protegida)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;