const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const { validationResult } = require('express-validator');

// Função auxiliar para formatar nome (Primeiro + Último)
const formatLeaderboardName = (fullName) => {
  const nameParts = fullName.trim().split(' ').filter(part => part.length > 0);
  if (nameParts.length === 1) {
    return nameParts[0]; // Só um nome
  }
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  return `${firstName} ${lastName}`;
};

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    // Validar dados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, password } = req.body;

    // Validar nome completo (mínimo 2 palavras)
    const nameParts = name.trim().split(' ').filter(part => part.length > 0);
    if (nameParts.length < 2) {
      return res.status(400).json({ 
        success: false, 
        message: 'Por favor, informe nome e sobrenome completos' 
      });
    }

    // Verificar se email já existe
    const [userExists] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (userExists.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Este email já está cadastrado' 
      });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar usuário
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const userId = result.insertId;

    // Criar sessão de jogo inicial
    await pool.query(
      'INSERT INTO game_sessions (user_id, current_balance, max_balance) VALUES (?, ?, ?)',
      [userId, 1000.00, 1000.00]
    );

    // Criar registro no leaderboard automaticamente
    const leaderboardName = formatLeaderboardName(name);
    await pool.query(
      'INSERT INTO leaderboard (user_id, user_name, max_balance, total_rounds) VALUES (?, ?, ?, ?)',
      [userId, leaderboardName, 1000.00, 0]
    );

    // Gerar token JWT
    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: userId,
        name,
        email
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao criar usuário' 
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se usuário existe
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Email ou senha incorretos' 
      });
    }

    const user = users[0];

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Email ou senha incorretos' 
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao fazer login' 
    });
  }
};

// Pegar dados do usuário logado
exports.getMe = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuário não encontrado' 
      });
    }

    res.json({
      success: true,
      user: users[0]
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao buscar dados do usuário' 
    });
  }
};