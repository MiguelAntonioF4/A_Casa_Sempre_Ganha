🎰 A Casa Sempre Ganha

Projeto educativo sobre a Teoria da Ruína do Jogador, simulando um jogo de roleta para demonstrar conceitos de probabilidade e gerenciamento de capital ao longo do tempo.

✨ Visão Geral

O projeto é dividido em dois módulos principais:

    backend: API RESTful desenvolvida em Node.js com Express para gerenciar autenticação, sessões de jogo e placar (Leaderboard).

    frontend: Aplicação web em React para a interface do jogo, visualização de estatísticas e a roleta.

🚀 Tecnologias

Módulo	Tecnologia Principal	Dependências Chave
Backend	Node.js, Express	MySQL, JWT, bcryptjs, dotenv
Frontend	ReactJS	Axios, Recharts, Tailwind CSS, lucide-react

📦 Instalação e Configuração

1. Pré-requisitos

    Node.js e npm instalados.

    Um servidor MySQL (como XAMPP, WAMP ou MySQL Workbench).

2. Configuração do Backend (backend/)

O backend está configurado para usar MySQL.

Passo a passo:

    Instalar Dependências:
    Bash

cd backend
npm install

Configurar Variáveis de Ambiente (backend/.env): Crie o arquivo .env na pasta backend/ com as seguintes variáveis. A configuração abaixo está otimizada para MySQL (XAMPP padrão).
Snippet de código

# Servidor
PORT=5000
NODE_ENV=development

# Banco de Dados MySQL (Padrão XAMPP)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=casino_db

# JWT Secret
JWT_SECRET=casino_super_secret_key_udesc_2024_ritzmann_werlich_goncalves

# CORS
CORS_ORIGIN=http://localhost:3000

Configurar o Banco de Dados: O projeto utiliza um script para inicializar o banco de dados e criar todas as tabelas e views necessárias (o schema.sql é executado).
Bash

npm run setup-db

(Este comando cria o banco casino_db e popula as tabelas users, game_sessions e leaderboard).

Rodar o Servidor:
Bash

    # Desenvolvimento (com auto-reload usando nodemon)
    npm run dev

    # Produção
    npm start

    O servidor será iniciado na porta 5000. O Health Check pode ser acessado em http://localhost:5000/api/health.

3. Configuração do Frontend (frontend/)

O frontend é uma aplicação React.

Passo a passo:

    Instalar Dependências:
    Bash

cd ../frontend
npm install

Configurar Variáveis de Ambiente (frontend/.env): Crie o arquivo .env na pasta frontend/ para apontar para a API do backend.
Snippet de código

REACT_APP_API_URL=http://localhost:5000/api

Rodar a Aplicação:
Bash

    npm start

    A aplicação React será iniciada na porta padrão (geralmente 3000), e a comunicação com o backend será feita via http://localhost:5000/api.

🗄️ Estrutura do Banco de Dados (MySQL)

O esquema do banco de dados está definido em backend/database/schema.sql.

Tabelas Principais

Tabela	Descrição	Colunas Chave
users	Armazena informações dos usuários.	id (PK), name, email (UNIQUE), password (hash)
game_sessions	Registra o estado atual da sessão de jogo de cada usuário.	id (PK), user_id (FK users), current_balance, total_rounds, wins, losses, max_balance
leaderboard	Mantém o registro do maior saldo já alcançado por cada usuário.	id (PK), user_id (FK users, UNIQUE), user_name, max_balance, total_rounds

Views Úteis

    v_game_stats: Estatísticas detalhadas do usuário (saldo atual, taxa de vitória, maior saldo).

    v_top_players: View para o top 10 do ranking por max_balance.

📡 Endpoints da API (/api)

Todas as rotas são prefixadas com /api/.

Autenticação (/api/auth)

Método	Rota	Descrição	Protegida (JWT)
POST	/api/auth/register	Registrar novo usuário.	Não
POST	/api/auth/login	Realizar login e obter JWT.	Não
GET	/api/auth/me	Retorna os dados do usuário logado.	Sim

Jogo (/api/game)

Método	Rota	Descrição	Protegida (JWT)
GET	/api/game/session	Pega a sessão de jogo atual do usuário.	Sim
PUT	/api/game/session	Atualiza o estado da sessão de jogo (após uma rodada).	Sim
POST	/api/game/reset	Reseta o jogo para o saldo inicial.	Sim

Leaderboard (/api/leaderboard)

Método	Rota	Descrição	Protegida (JWT)
GET	/api/leaderboard	Pega o Top 10 ranking global.	Não
GET	/api/leaderboard/rank	Pega a posição do usuário logado no ranking.	Sim

Status do Servidor

Método	Rota	Descrição	Protegida (JWT)
GET	/api/health	Verifica o status do servidor.	Não

🔒 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para proteger as rotas. Para acessar as rotas protegidas (indicadas na tabela acima), o token deve ser enviado no cabeçalho da requisição no formato:

Authorization: Bearer seu_token_aqui

👥 Autores

Este projeto foi desenvolvido como um trabalho educativo por:

    Luiz Felipe

    Natanael

    Miguel

Instituição: Senac
