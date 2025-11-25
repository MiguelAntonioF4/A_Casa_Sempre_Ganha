import { useState, useEffect, useCallback } from 'react';
import { gameAPI, leaderboardAPI } from '../services/api';

export const useStorage = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Carregar leaderboard do servidor
  const loadLeaderboard = useCallback(async () => {
    try {
      const response = await leaderboardAPI.getLeaderboard();
      setLeaderboard(response.leaderboard || []);
    } catch (error) {
      console.error('Erro ao carregar leaderboard:', error);
    }
  }, []);

  // Carregar dados do jogo do servidor (COM O SALDO REAL!)
  const loadGameData = useCallback(async () => {
    try {
      const response = await gameAPI.getSession();
      const session = response.session;
      
      return {
        balance: parseFloat(session.current_balance), // ← SALDO REAL!
        totalRounds: session.total_rounds,
        wins: session.wins,
        losses: session.losses,
        maxBalance: parseFloat(session.max_balance), // ← SCORE!
        history: [{ round: 0, balance: parseFloat(session.current_balance) }],
        gameHistory: []
      };
    } catch (error) {
      console.error('Erro ao carregar dados do jogo:', error);
      return null;
    }
  }, []);

  // Salvar dados do jogo no servidor (AUTOMATICAMENTE!)
  const saveGameData = useCallback(async (gameData) => {
    try {
      await gameAPI.updateSession({
        current_balance: gameData.balance,
        total_rounds: gameData.totalRounds,
        wins: gameData.wins,
        losses: gameData.losses
      });
      
      // Recarregar leaderboard após salvar
      await loadLeaderboard();
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }, [loadLeaderboard]);

  // Atualizar leaderboard
  const updateLeaderboard = useCallback(async () => {
    await loadLeaderboard();
  }, [loadLeaderboard]);

  // Deletar dados do jogo (RESET)
  const deleteGameData = useCallback(async () => {
    try {
      await gameAPI.resetGame();
      await loadLeaderboard(); // Atualizar ranking
    } catch (error) {
      console.error('Erro ao resetar jogo:', error);
    }
  }, [loadLeaderboard]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  return {
    leaderboard,
    loadGameData,
    saveGameData,
    loadLeaderboard,
    updateLeaderboard,
    deleteGameData
  };
};