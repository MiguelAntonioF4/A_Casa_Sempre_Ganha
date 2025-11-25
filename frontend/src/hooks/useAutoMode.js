import { useState, useRef, useCallback } from 'react';
import { rouletteNumbers } from '../utils/rouletteConfig';
import { checkWin, calculatePayout } from '../utils/gameLogic';

export const useAutoMode = (
  playerBalance,
  setPlayerBalance,
  setBalanceHistory,
  setWins,
  setLosses,
  setMessage,
  totalRounds
) => {
  const [autoMode, setAutoMode] = useState(false);
  const [autoRounds, setAutoRounds] = useState(1000);
  const [currentAutoRound, setCurrentAutoRound] = useState(0);
  const [autoBetType, setAutoBetType] = useState('red');
  const [autoBetAmount, setAutoBetAmount] = useState(5);
  const autoIntervalRef = useRef(null);

  const stopAutoMode = useCallback(() => {
    setAutoMode(false);
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
    }
    setCurrentAutoRound(0);
  }, []);

  const startAutoMode = useCallback(() => {
    if (autoMode) {
      stopAutoMode();
      return;
    }

    setAutoMode(true);
    setCurrentAutoRound(0);

    autoIntervalRef.current = setInterval(() => {
      setCurrentAutoRound(prev => {
        if (prev >= autoRounds) {
          stopAutoMode();
          return prev;
        }

        // Executar rodada automática
        setPlayerBalance(currentBalance => {
          if (currentBalance >= autoBetAmount) {
            const randomIndex = Math.floor(Math.random() * rouletteNumbers.length);
            const resultNumber = rouletteNumbers[randomIndex];

            let won = checkWin(autoBetType, null, resultNumber);
            let newBalance = currentBalance - autoBetAmount;

            if (won) {
              const payout = calculatePayout(autoBetType, autoBetAmount);
              newBalance += payout;
              setWins(w => w + 1);
            } else {
              setLosses(l => l + 1);
            }

            const newRound = totalRounds + prev + 1;
            setBalanceHistory(h => [...h, { round: newRound, balance: newBalance }]);

            if (newBalance === 0) {
              stopAutoMode();
              setMessage('💸 RUÍNA! Modo automático parado.');
            }

            return newBalance;
          } else {
            stopAutoMode();
            setMessage('❌ Saldo insuficiente para continuar modo automático');
            return currentBalance;
          }
        });

        return prev + 1;
      });
    }, 100); // Velocidade da simulação
  }, [
    autoMode,
    autoRounds,
    autoBetType,
    autoBetAmount,
    playerBalance,
    setPlayerBalance,
    setBalanceHistory,
    setWins,
    setLosses,
    setMessage,
    stopAutoMode,
    totalRounds
  ]);

  return {
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
  };
};