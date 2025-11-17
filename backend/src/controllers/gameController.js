const { pool } = require('../config/database');

// Pegar sessão de jogo atual
exports.getGameSession = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM game_sessions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      // Criar nova sessão se não existir
      const newSession = await pool.query(
        'INSERT INTO game_sessions (user_id, current_balance) VALUES ($1, $2) RETURNING *',
        [req.user.id, 1000.00]
      );
      return res.json({
        success: true,
        session: newSession.rows[0]
      });
    }

    res.json({
      success: true,
      session: result.rows[0]
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

    const result = await pool.query(
      `UPDATE game_sessions 
       SET current_balance = $1, 
           total_rounds = $2, 
           wins = $3, 
           losses = $4, 
           max_balance = GREATEST(max_balance, $5),
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $6
       RETURNING *`,
      [current_balance, total_rounds, wins, losses, max_balance, req.user.id]
    );

    // Atualizar leaderboard se atingiu novo máximo
    if (max_balance >= result.rows[0].max_balance) {
      const userName = await pool.query(
        'SELECT name FROM users WHERE id = $1',
        [req.user.id]
      );

      await pool.query(
        `INSERT INTO leaderboard (user_id, user_name, max_balance, total_rounds)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (user_id) 
         DO UPDATE SET 
           max_balance = GREATEST(leaderboard.max_balance, $3),
           total_rounds = $4,
           updated_at = CURRENT_TIMESTAMP`,
        [req.user.id, userName.rows[0].name, max_balance, total_rounds]
      );
    }

    res.json({
      success: true,
      message: 'Sessão atualizada com sucesso',
      session: result.rows[0]
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
           losses = 0,
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1`,
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