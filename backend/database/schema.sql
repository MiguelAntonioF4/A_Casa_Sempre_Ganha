-- ============================================
-- A CASA SEMPRE GANHA - MySQL Schema
-- ============================================

-- Criar banco de dados
DROP DATABASE IF EXISTS casino_db;
CREATE DATABASE casino_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o banco
USE casino_db;

-- ============================================
-- TABELA: users
-- ============================================
DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS game_sessions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: game_sessions
-- ============================================
CREATE TABLE game_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    initial_balance DECIMAL(10, 2) DEFAULT 1000.00,
    current_balance DECIMAL(10, 2) NOT NULL DEFAULT 1000.00,
    total_rounds INT DEFAULT 0,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    max_balance DECIMAL(10, 2) DEFAULT 1000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_game_sessions_user (user_id),
    INDEX idx_game_sessions_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: leaderboard
-- ============================================
CREATE TABLE leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    max_balance DECIMAL(10, 2) NOT NULL DEFAULT 1000.00,
    total_rounds INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_leaderboard_balance (max_balance DESC),
    INDEX idx_leaderboard_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View para estatísticas gerais
CREATE OR REPLACE VIEW v_game_stats AS
SELECT 
    u.id,
    u.name,
    u.email,
    gs.current_balance,
    gs.total_rounds,
    gs.wins,
    gs.losses,
    CASE 
        WHEN gs.total_rounds > 0 
        THEN ROUND((gs.wins / gs.total_rounds * 100), 2)
        ELSE 0 
    END as win_rate,
    gs.max_balance,
    l.max_balance as leaderboard_max,
    gs.updated_at
FROM users u
LEFT JOIN game_sessions gs ON u.id = gs.user_id
LEFT JOIN leaderboard l ON u.id = l.user_id
ORDER BY gs.max_balance DESC;

-- View para top 10 ranking
CREATE OR REPLACE VIEW v_top_players AS
SELECT 
    user_name,
    max_balance,
    total_rounds,
    updated_at,
    ROW_NUMBER() OVER (ORDER BY max_balance DESC) as `rank`
FROM leaderboard
ORDER BY max_balance DESC
LIMIT 10;

-- ============================================
-- FIM - Banco pronto para uso
-- ============================================