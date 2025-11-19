import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';

import { rouletteNumbers, MIN_BET, INITIAL_BALANCE } from './utils/rouletteConfig';
import { checkWin, calculatePayout, spinRoulette } from './utils/gameLogic';
import { calculateWinRate } from './utils/calculations';
import { useStorage } from './hooks/useStorage';
import { useGameState } from './hooks/useGameState';
import { useAutoMode } from './hooks/useAutoMode';

import Tutorial from './components/Tutorial';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import GameTab from './components/GameTab';
import StatsTab from './components/StatsTab';
import TheoryTab from './components/TheoryTab';
import LeaderboardTab from './components/LeaderboardTab';
import Footer from './components/Footer';
import { LogOut } from 'lucide-react';

function GameContent() {
  const { user, logout } = useAuth();

  // Storage Hook
  const { 
    leaderboard, 
    loadGameData, 
    saveGameData, 
    updateLeaderboard,
    deleteGameData 
  } = useStorage();

  // Game State Hook
  const {
    playerBalance,
    setPlayerBalance,
    betAmount,
    setBetAmount,
    betType,
    setBetType,
    betNumber,
    setBetNumber,
    spinning,
    setSpinning,
    result,
    setResult,
    message,
    setMessage,
    balanceHistory,
    setBalanceHistory,
    gameHistory,
    setGameHistory,
    totalRounds,
    setTotalRounds,
    wins,
    setWins,
    losses,
    setLosses,
    rotation,
    setRotation,
    resetGame: resetGameState
  } = useGameState(saveGameData);

  // Auto Mode Hook
  const {
    autoMode,
    autoRounds,
    setAutoRounds,
    currentAutoRound,
    autoBetType,
    setAutoBetType,
    autoBetAmount,
    setAutoBetAmount,
    startAutoMode,
    stopAutoMode
  } = useAutoMode(
    playerBalance,
    setPlayerBalance,
    setBalanceHistory,
    setWins,
    setLosses,
    setMessage,
    totalRounds
  );

  // UI States
  const [activeTab, setActiveTab] = useState('game');
  const [showTutorial, setShowTutorial] = useState(true);
  const [playerName, setPlayerName] = useState(user?.name || '');

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    const loadSavedData = async () => {
      const data = await loadGameData();
      if (data) {
        setPlayerBalance(data.balance || INITIAL_BALANCE);
        setBalanceHistory(data.history || [{ round: 0, balance: INITIAL_BALANCE }]);
        setGameHistory(data.gameHistory || []);
        setTotalRounds(data.totalRounds || 0);
        setWins(data.wins || 0);
        setLosses(data.losses || 0);
      }
    };
    loadSavedData();
  }, [loadGameData, setPlayerBalance, setBalanceHistory, setGameHistory, setTotalRounds, setWins, setLosses]);

  // Função para girar a roleta (modo manual)
  const handleSpin = () => {
    if (spinning) return;
    if (betAmount < MIN_BET) {
      setMessage(`❌ Aposta mínima: $${MIN_BET}`);
      return;
    }
    if (betAmount > playerBalance) {
      setMessage('❌ Saldo insuficiente!');
      return;
    }

    setSpinning(true);
    setMessage('🎰 Girando...');

    const { finalRotation, randomIndex } = spinRoulette(rotation);
    const resultNumber = rouletteNumbers[randomIndex];
    setRotation(finalRotation);

    setTimeout(() => {
      processResult(resultNumber);
      setSpinning(false);
    }, 3000);
  };

  // Processar resultado da rodada
  const processResult = (resultNumber) => {
    setResult(resultNumber);
    
    const won = checkWin(betType, betNumber, resultNumber);
    let newBalance = playerBalance - betAmount;
    let payout = 0;

    if (won) {
      payout = calculatePayout(betType, betAmount);
      newBalance += payout;
      setMessage(`🎉 Ganhou $${payout}! Número: ${resultNumber.num} ${getColorEmoji(resultNumber.color)}`);
      setWins(wins + 1);
    } else {
      setMessage(`😢 Perdeu $${betAmount}. Número: ${resultNumber.num} ${getColorEmoji(resultNumber.color)}`);
      setLosses(losses + 1);
    }

    const newRound = totalRounds + 1;
    setPlayerBalance(newBalance);
    setTotalRounds(newRound);
    setBalanceHistory([...balanceHistory, { round: newRound, balance: newBalance }]);
    setGameHistory([{
      round: newRound,
      bet: betAmount,
      betType,
      result: resultNumber.num,
      won,
      payout,
      balance: newBalance
    }, ...gameHistory].slice(0, 100));

    if (newBalance === 0) {
      setMessage('💸 RUÍNA! Você perdeu tudo. A casa sempre ganha!');
      if (playerName) {
        updateLeaderboard(playerName, newBalance, newRound);
      }
    }
  };

  const getColorEmoji = (color) => {
    switch(color) {
      case 'red': return '🔴';
      case 'black': return '⚫';
      case 'green': return '🟢';
      default: return '';
    }
  };

  // Reset completo do jogo
  const handleReset = () => {
    if (window.confirm('Deseja resetar o jogo? Todo o progresso será perdido.')) {
      resetGameState();
      deleteGameData();
    }
  };

  // Handler para atualizar leaderboard
  const handleUpdateLeaderboard = (name, balance, rounds) => {
    updateLeaderboard(name, balance, rounds);
    setMessage('✅ Nome registrado no ranking!');
  };

  // Calcular win rate
  const winRate = calculateWinRate(wins, totalRounds);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white">
      <Tutorial 
        showTutorial={showTutorial} 
        setShowTutorial={setShowTutorial} 
      />

      {/* Header com botão de logout */}
      <div className="bg-black bg-opacity-50 border-b-4 border-yellow-500 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">🎰 A Casa Sempre Ganha</h1>
            <p className="text-gray-400 text-sm">Teoria da Ruína do Jogador - Projeto Educativo UDESC</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-gray-400">Jogador: <span className="text-yellow-400 font-semibold">{user.name}</span></div>
              <div className="text-3xl font-bold text-green-400">${playerBalance.toFixed(2)}</div>
              <div className="text-xs text-gray-400">Capital do Jogador</div>
              <div className="text-xs text-yellow-300 mt-1">Casa: ∞ (Ilimitado)</div>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </div>

      <NavigationTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'game' && (
          <GameTab
            // Roleta
            rotation={rotation}
            result={result}
            message={message}
            
            // Apostas
            betType={betType}
            setBetType={setBetType}
            betNumber={betNumber}
            setBetNumber={setBetNumber}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            playerBalance={playerBalance}
            spinning={spinning}
            onSpin={handleSpin}
            
            // Modo Automático
            autoMode={autoMode}
            autoRounds={autoRounds}
            setAutoRounds={setAutoRounds}
            currentAutoRound={currentAutoRound}
            autoBetType={autoBetType}
            setAutoBetType={setAutoBetType}
            autoBetAmount={autoBetAmount}
            setAutoBetAmount={setAutoBetAmount}
            onAutoStartStop={startAutoMode}
            
            // Stats
            wins={wins}
            losses={losses}
            totalRounds={totalRounds}
            winRate={winRate}
            balanceHistory={balanceHistory}
            gameHistory={gameHistory}
            
            // Reset
            onReset={handleReset}
          />
        )}

        {activeTab === 'stats' && (
          <StatsTab
            playerBalance={playerBalance}
            totalRounds={totalRounds}
            wins={wins}
            losses={losses}
            winRate={winRate}
            betAmount={betAmount}
            balanceHistory={balanceHistory}
          />
        )}

        {activeTab === 'theory' && (
          <TheoryTab />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardTab
            leaderboard={leaderboard}
            playerName={playerName}
            setPlayerName={setPlayerName}
            onUpdateLeaderboard={handleUpdateLeaderboard}
            playerBalance={playerBalance}
            totalRounds={totalRounds}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

function AppContent() {
  const { user, isAuthenticated, loading } = useAuth();
  const [authScreen, setAuthScreen] = useState('login'); // 'login' ou 'register'

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-400 text-xl font-bold">🎰 Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar telas de login/registro
  if (!isAuthenticated) {
    return authScreen === 'login' ? (
      <LoginScreen onSwitchToRegister={() => setAuthScreen('register')} />
    ) : (
      <RegisterScreen onSwitchToLogin={() => setAuthScreen('login')} />
    );
  }

  // Se estiver autenticado, mostrar o jogo
  return <GameContent />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
