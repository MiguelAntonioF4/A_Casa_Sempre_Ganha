# 🎰 A Casa Sempre Ganha - Backend

Backend do projeto educativo sobre Teoria da Ruína do Jogador.

## 🚀 Tecnologias

- Node.js + Express
- PostgreSQL
- JWT (autenticação)
- bcryptjs (hash de senhas)

## 📦 Instalação

1. Instalar dependências:
```bash
npm install
```

2. Configurar PostgreSQL:
```bash
# Criar banco de dados
createdb casino_db

# Ou via psql
psql -U postgres
CREATE DATABASE casino_db;
```

3. Configurar `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=casino_db
JWT_SECRET=sua_chave_secreta
CORS_ORIGIN=http://localhost:3000
```

4. Rodar servidor:
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário (protegida)

### Jogo
- `GET /api/game/session` - Pegar sessão atual (protegida)
- `PUT /api/game/session` - Atualizar sessão (protegida)
- `POST /api/game/reset` - Resetar jogo (protegida)

### Leaderboard
- `GET /api/leaderboard` - Top 10 ranking (pública)
- `GET /api/leaderboard/rank` - Posição do usuário (protegida)

### Health Check
- `GET /api/health` - Status do servidor

## 🗄️ Estrutura do Banco

### Tabela: users
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR UNIQUE)
- password (VARCHAR - hash)
- created_at (TIMESTAMP)

### Tabela: game_sessions
- id (SERIAL PRIMARY KEY)
- user_id (FK users)
- initial_balance (DECIMAL)
- current_balance (DECIMAL)
- total_rounds (INTEGER)
- wins (INTEGER)
- losses (INTEGER)
- max_balance (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Tabela: leaderboard
- id (SERIAL PRIMARY KEY)
- user_id (FK users - UNIQUE)
- user_name (VARCHAR)
- max_balance (DECIMAL)
- total_rounds (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## 🔒 Autenticação

O sistema usa JWT (JSON Web Tokens). Para rotas protegidas, envie o token no header:
```
Authorization: Bearer seu_token_aqui
```

## 👥 Autores

Carlos Ritzmann, Kauan Werlich, Paulo Gonçalves - UDESC