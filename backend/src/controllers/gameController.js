const { pool } = require('../config/database');

// Função auxiliar para formatar nome (Primeiro + Último)
const formatLeaderboardName = (fullName) => {
  const nameParts = fullName.trim().split(' ').filter(part => part.length > 0);
  if (nameParts.length === 1) {
    return nameParts[0];
  }
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  return `${firstName} ${lastName}`;
};

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
        'INSERT INTO game_sessions (user_id, current_balance, max_balance) VALUES (?, ?, ?)',
        [req.user.id, 1000.00, 1000.00]
      );
      
      const [newSession] = await pool.query(
        'SELECT * FROM game_sessions WHERE id = ?',
        [result.insertId]
      );

      // Criar registro no leaderboard se não existir
      const [user] = await pool.query('SELECT name FROM users WHERE id = ?', [req.user.id]);
      const leaderboardName = formatLeaderboardName(user[0].name);
      
      await pool.query(
        `INSERT INTO leaderboard (user_id, user_name, max_balance, total_rounds) 
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE user_id = user_id`,
        [req.user.id, leaderboardName, 1000.00, 0]
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

// Atualizar sessão de jogo (a cada jogada)
exports.updateGameSession = async (req, res) => {
  try {
    const { 
      current_balance, 
      total_rounds, 
      wins, 
      losses 
    } = req.body;

    // Buscar sessão atual para comparar
    const [currentSession] = await pool.query(
      'SELECT max_balance FROM game_sessions WHERE user_id = ?',
      [req.user.id]
    );

    const currentMaxBalance = parseFloat(currentSession[0]?.max_balance || 0);
    const newBalance = parseFloat(current_balance);
    
    // Determinar o novo max_balance (só aumenta se bater recorde)
    const newMaxBalance = Math.max(currentMaxBalance, newBalance);

    // Atualizar sessão
    await pool.query(
      `UPDATE game_sessions 
       SET current_balance = ?, 
           total_rounds = ?, 
           wins = ?, 
           losses = ?, 
           max_balance = ?
       WHERE user_id = ?`,
      [current_balance, total_rounds, wins, losses, newMaxBalance, req.user.id]
    );

    // Atualizar leaderboard (sempre com o max_balance)
    const [userName] = await pool.query(
      'SELECT name FROM users WHERE id = ?',
      [req.user.id]
    );

    const leaderboardName = formatLeaderboardName(userName[0].name);

    await pool.query(
      `INSERT INTO leaderboard (user_id, user_name, max_balance, total_rounds)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         max_balance = GREATEST(leaderboard.max_balance, ?),
         total_rounds = ?,
         user_name = ?`,
      [req.user.id, leaderboardName, newMaxBalance, total_rounds, newMaxBalance, total_rounds, leaderboardName]
    );

    // Buscar sessão atualizada
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

// Resetar jogo (IMPORTANTE: só reseta current_balance, mantém max_balance!)
exports.resetGame = async (req, res) => {
  try {
    // Buscar max_balance atual (NÃO vai mudar!)
    const [currentSession] = await pool.query(
      'SELECT max_balance FROM game_sessions WHERE user_id = ?',
      [req.user.id]
    );

    const maxBalance = currentSession[0]?.max_balance || 1000.00;

    // Resetar apenas current_balance, mantém max_balance
    await pool.query(
      `UPDATE game_sessions 
       SET current_balance = 1000.00, 
           total_rounds = 0, 
           wins = 0, 
           losses = 0,
           max_balance = ?
       WHERE user_id = ?`,
      [maxBalance, req.user.id]
    );

    res.json({
      success: true,
      message: 'Jogo resetado com sucesso (score mantido)'
    });
  } catch (error) {
    console.error('Erro ao resetar jogo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao resetar jogo' 
    });
  }
};