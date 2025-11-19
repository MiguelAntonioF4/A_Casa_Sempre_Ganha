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

  // Carregar dados do jogo do servidor
  const loadGameData = useCallback(async () => {
    try {
      const response = await gameAPI.getSession();
      return {
        balance: parseFloat(response.session.current_balance),
        totalRounds: response.session.total_rounds,
        wins: response.session.wins,
        losses: response.session.losses,
        history: [{ round: 0, balance: parseFloat(response.session.current_balance) }],
        gameHistory: []
      };
    } catch (error) {
      console.error('Erro ao carregar dados do jogo:', error);
      return null;
    }
  }, []);

  // Salvar dados do jogo no servidor
  const saveGameData = useCallback(async (gameData) => {
    try {
      await gameAPI.updateSession({
        current_balance: gameData.balance,
        total_rounds: gameData.totalRounds,
        wins: gameData.wins,
        losses: gameData.losses,
        max_balance: Math.max(...gameData.history.map(h => h.balance))
      });
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }, []);

  // Atualizar leaderboard (automático quando salvar sessão)
  const updateLeaderboard = useCallback(async () => {
    await loadLeaderboard();
  }, [loadLeaderboard]);

  // Deletar dados do jogo
  const deleteGameData = useCallback(async () => {
    try {
      await gameAPI.resetGame();
    } catch (error) {
      console.error('Erro ao resetar jogo:', error);
    }
  }, []);

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