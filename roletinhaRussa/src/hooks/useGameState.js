import { useState, useEffect } from 'react';
import { INITIAL_BALANCE } from '../utils/rouletteConfig';

export const useGameState = (saveGameData) => {
  const [playerBalance, setPlayerBalance] = useState(INITIAL_BALANCE);
  const [betAmount, setBetAmount] = useState(10);
  const [betType, setBetType] = useState('red');
  const [betNumber, setBetNumber] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [balanceHistory, setBalanceHistory] = useState([{ round: 0, balance: INITIAL_BALANCE }]);
  const [gameHistory, setGameHistory] = useState([]);
  const [totalRounds, setTotalRounds] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Auto-save quando houver mudanças
  useEffect(() => {
    if (totalRounds > 0) {
      const gameData = {
        balance: playerBalance,
        history: balanceHistory.slice(-500),
        gameHistory: gameHistory.slice(-100),
        totalRounds,
        wins,
        losses,
        timestamp: Date.now()
      };
      saveGameData(gameData);
    }
  }, [playerBalance, totalRounds, balanceHistory, gameHistory, wins, losses, saveGameData]);

  const resetGame = () => {
    setPlayerBalance(INITIAL_BALANCE);
    setBalanceHistory([{ round: 0, balance: INITIAL_BALANCE }]);
    setGameHistory([]);
    setTotalRounds(0);
    setWins(0);
    setLosses(0);
    setMessage('🎰 Jogo resetado! Boa sorte!');
  };

  return {
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
    resetGame
  };
};