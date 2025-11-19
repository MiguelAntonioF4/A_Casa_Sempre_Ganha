const { pool } = require('../config/database');

// Pegar sessão de jogo atual
exports.getGameSession = async (req, res) => {
  try {
    const [sessions] = await pool.query(
      'SELECT * FROM game_sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [req.user.id]
    );

    if (sessions.length === 0) {
      // Criar nova sessão se não existir
      const [result] = await pool.query(
        'INSERT INTO game_sessions (user_id, current_balance) VALUES (?, ?)',
        [req.user.id, 1000.00]
      );
      
      const [newSession] = await pool.query(
        'SELECT * FROM game_sessions WHERE id = ?',
        [result.insertId]
      );
      
      return res.json({
        success: true,
        session: newSession[0]
      });
    }

    res.json({
      success: true,
      session: sessions[0]
    });
  } catch (error) {
    console.error('Erro ao buscar sessão:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao buscar sessão de jogo' 
    });
  }
};

// Atualizar sessão de jogo
exports.updateGameSession = async (req, res) => {
  try {
    const { 
      current_balance, 
      total_rounds, 
      wins, 
      losses, 
      max_balance 
    } = req.body;

    await pool.query(
      `UPDATE game_sessions 
       SET current_balance = ?, 
           total_rounds = ?, 
           wins = ?, 
           losses = ?, 
           max_balance = GREATEST(max_balance, ?)
       WHERE user_id = ?`,
      [current_balance, total_rounds, wins, losses, max_balance, req.user.id]
    );

    // Atualizar leaderboard se atingiu novo máximo
    const [userName] = await pool.query(
      'SELECT name FROM users WHERE id = ?',
      [req.user.id]
    );

    await pool.query(
      `INSERT INTO leaderboard (user_id, user_name, max_balance, total_rounds)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         max_balance = GREATEST(leaderboard.max_balance, ?),
         total_rounds = ?`,
      [req.user.id, userName[0].name, max_balance, total_rounds, max_balance, total_rounds]
    );

    const [updatedSession] = await pool.query(
      'SELECT * FROM game_sessions WHERE user_id = ?',
      [req.user.id]
    );

    res.json({
      success: true,
      message: 'Sessão atualizada com sucesso',
      session: updatedSession[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar sessão:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao atualizar sessão' 
    });
  }
};

// Resetar jogo
exports.resetGame = async (req, res) => {
  try {
    await pool.query(
      `UPDATE game_sessions 
       SET current_balance = 1000.00, 
           total_rounds = 0, 
           wins = 0, 
           losses = 0
       WHERE user_id = ?`,
      [req.user.id]
    );

    res.json({
      success: true,
      message: 'Jogo resetado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao resetar jogo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao resetar jogo' 
    });
  }
};