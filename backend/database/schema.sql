-- ============================================
-- A CASA SEMPRE GANHA - Database Schema
-- ============================================

-- Criar banco de dados (executar como superuser)
-- DROP DATABASE IF EXISTS casino_db;
-- CREATE DATABASE casino_db;

-- Conectar ao banco
\c casino_db;

-- ============================================
-- TABELA: users
-- ============================================
DROP TABLE IF EXISTS leaderboard CASCADE;
DROP TABLE IF EXISTS game_sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para busca por email
CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- TABELA: game_sessions
-- ============================================
CREATE TABLE game_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    initial_balance DECIMAL(10, 2) DEFAULT 1000.00,
    current_balance DECIMAL(10, 2) NOT NULL DEFAULT 1000.00,
    total_rounds INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    max_balance DECIMAL(10, 2) DEFAULT 1000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_game_sessions_user ON game_sessions(user_id);
CREATE INDEX idx_game_sessions_created ON game_sessions(created_at DESC);

-- ============================================
-- TABELA: leaderboard
-- ============================================
CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_name VARCHAR(100) NOT NULL,
    max_balance DECIMAL(10, 2) NOT NULL DEFAULT 1000.00,
    total_rounds INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para ranking (ordenado por max_balance)
CREATE INDEX idx_leaderboard_balance ON leaderboard(max_balance DESC);
CREATE INDEX idx_leaderboard_user ON leaderboard(user_id);

-- ============================================
-- TRIGGERS para atualizar updated_at
-- ============================================

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para users
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para game_sessions
CREATE TRIGGER update_game_sessions_updated_at 
    BEFORE UPDATE ON game_sessions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para leaderboard
CREATE TRIGGER update_leaderboard_updated_at 
    BEFORE UPDATE ON leaderboard 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DADOS DE TESTE (OPCIONAL)
-- ============================================

-- Inserir usuários de teste
-- SENHA: "123456" (hash bcrypt)
INSERT INTO users (name, email, password) VALUES
('Carlos Ritzmann', 'carlos@udesc.br', '$2a$10$XqZ5J5LZ5J5LZ5J5LZ5J5uN6J5LZ5J5LZ5J5LZ5J5LZ5J5LZ5J5LZ'),
('Kauan Werlich', 'kauan@udesc.br', '$2a$10$XqZ5J5LZ5J5LZ5J5LZ5J5uN6J5LZ5J5LZ5J5LZ5J5LZ5J5LZ5J5LZ'),
('Paulo Gonçalves', 'paulo@udesc.br', '$2a$10$XqZ5J5LZ5J5LZ5J5LZ5J5uN6J5LZ5J5LZ5J5LZ5J5LZ5J5LZ5J5LZ');

-- Inserir sessões de jogo iniciais
INSERT INTO game_sessions (user_id, current_balance, total_rounds, wins, losses, max_balance) VALUES
(1, 1250.00, 50, 28, 22, 1350.00),
(2, 890.00, 75, 32, 43, 1150.00),
(3, 1500.00, 100, 55, 45, 1800.00);

-- Inserir no leaderboard
INSERT INTO leaderboard (user_id, user_name, max_balance, total_rounds) VALUES
(3, 'Paulo Gonçalves', 1800.00, 100),
(1, 'Carlos Ritzmann', 1350.00, 50),
(2, 'Kauan Werlich', 1150.00, 75);

-- ============================================
-- VIEWS ÚTEIS (OPCIONAL)
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
        THEN ROUND((gs.wins::DECIMAL / gs.total_rounds * 100), 2)
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
    ROW_NUMBER() OVER (ORDER BY max_balance DESC) as rank
FROM leaderboard
ORDER BY max_balance DESC
LIMIT 10;

-- ============================================
-- PERMISSÕES (AJUSTAR CONFORME NECESSÁRIO)
-- ============================================

-- Criar usuário específico para a aplicação (opcional)
-- CREATE USER casino_app WITH PASSWORD 'sua_senha_segura';
-- GRANT ALL PRIVILEGES ON DATABASE casino_db TO casino_app;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO casino_app;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO casino_app;

-- ============================================
-- VERIFICAÇÕES
-- ============================================

-- Verificar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Contar registros
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'game_sessions', COUNT(*) FROM game_sessions
UNION ALL
SELECT 'leaderboard', COUNT(*) FROM leaderboard;

-- Testar view de ranking
SELECT * FROM v_top_players;

-- ============================================
-- BACKUP E RESTORE (COMANDOS)
-- ============================================

-- Para fazer backup:
-- pg_dump -U postgres -d casino_db -f casino_backup.sql

-- Para restaurar:
-- psql -U postgres -d casino_db -f casino_backup.sql