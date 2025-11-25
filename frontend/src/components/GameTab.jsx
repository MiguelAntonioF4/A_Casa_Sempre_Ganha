import React from 'react';
import RouletteWheel from './RouletteWheel';
import BettingPanel from './BettingPanel';
import AutoModePanel from './AutoModePanel';
import QuickStats from './QuickStats';
import BalanceChart from './BalanceChart';
import GameHistory from './GameHistory';

const GameTab = ({
  // Roleta
  rotation,
  result,
  message,
  
  // Apostas
  betType,
  setBetType,
  betNumber,
  setBetNumber,
  betAmount,
  setBetAmount,
  playerBalance,
  spinning,
  onSpin,
  
  // Modo Automático
  autoMode,
  autoRounds,
  setAutoRounds,
  currentAutoRound,
  autoBetType,
  setAutoBetType,
  autoBetAmount,
  setAutoBetAmount,
  onAutoStartStop,
  
  // Stats
  wins,
  losses,
  totalRounds,
  winRate,
  balanceHistory,
  gameHistory,
  
  // Reset
  onReset
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Coluna Esquerda - Roleta e Apostas */}
      <div className="lg:col-span-2 space-y-6">
        <RouletteWheel 
          rotation={rotation}
          result={result}
          message={message}
        />
        
        {!autoMode && (
          <BettingPanel
            betType={betType}
            setBetType={setBetType}
            betNumber={betNumber}
            setBetNumber={setBetNumber}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            playerBalance={playerBalance}
            spinning={spinning}
            onSpin={onSpin}
          />
        )}
        
        <AutoModePanel
          autoMode={autoMode}
          autoRounds={autoRounds}
          setAutoRounds={setAutoRounds}
          currentAutoRound={currentAutoRound}
          autoBetType={autoBetType}
          setAutoBetType={setAutoBetType}
          autoBetAmount={autoBetAmount}
          setAutoBetAmount={setAutoBetAmount}
          playerBalance={playerBalance}
          onStartStop={onAutoStartStop}
        />
      </div>

      {/* Coluna Direita - Stats */}
      <div className="space-y-6">
        <QuickStats
          wins={wins}
          losses={losses}
          totalRounds={totalRounds}
          currentAutoRound={currentAutoRound}
          winRate={winRate}
        />
        
        <BalanceChart 
          balanceHistory={balanceHistory}
          showLast50={true}
        />
        
        <GameHistory gameHistory={gameHistory} />
        
        <button
          onClick={onReset}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition border-2 border-gray-600"
        >
          🔄 Resetar Jogo
        </button>
      </div>
    </div>
  );
};

export default GameTab;