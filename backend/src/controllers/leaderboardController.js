const { pool } = require('../config/database');

// Pegar ranking global (top 10)
exports.getLeaderboard = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         user_id,
         user_name,
         max_balance,
         total_rounds,
         updated_at
       FROM leaderboard
       ORDER BY max_balance DESC
       LIMIT 10`
    );

    res.json({
      success: true,
      leaderboard: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar leaderboard:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao buscar ranking' 
    });
  }
};

// Pegar posição do usuário no ranking
exports.getUserRank = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         COUNT(*) + 1 as rank
       FROM leaderboard
       WHERE max_balance > (
         SELECT max_balance 
         FROM leaderboard 
         WHERE user_id = $1
       )`,
      [req.user.id]
    );

    const userData = await pool.query(
      'SELECT * FROM leaderboard WHERE user_id = $1',
      [req.user.id]
    );

    res.json({
      success: true,
      rank: result.rows[0].rank,
      userData: userData.rows[0] || null
    });
  } catch (error) {
    console.error('Erro ao buscar rank:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao buscar posição no ranking' 
    });
  }
};