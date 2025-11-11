import { useState, useEffect, useCallback } from 'react';

export const useStorage = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Carregar dados salvos do jogo
  const loadGameData = useCallback(async () => {
    try {
      const saved = await window.storage.get('casino-game-data');
      if (saved && saved.value) {
        return JSON.parse(saved.value);
      }
      return null;
    } catch (error) {
      console.log('Novo jogo iniciado');
      return null;
    }
  }, []);

  // Salvar dados do jogo
  const saveGameData = useCallback(async (gameData) => {
    try {
      await window.storage.set('casino-game-data', JSON.stringify(gameData));
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  }, []);

  // Carregar leaderboard
  const loadLeaderboard = useCallback(async () => {
    try {
      const result = await window.storage.get('casino-leaderboard', true);
      if (result && result.value) {
        setLeaderboard(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('Leaderboard vazio');
    }
  }, []);

  // Atualizar leaderboard
  const updateLeaderboard = useCallback(async (name, balance, rounds) => {
    try {
      let board = [...leaderboard];
      const existingIndex = board.findIndex(p => p.name === name);
      
      if (existingIndex >= 0) {
        if (balance > board[existingIndex].maxBalance) {
          board[existingIndex] = { name, maxBalance: balance, rounds, timestamp: Date.now() };
        }
      } else {
        board.push({ name, maxBalance: balance, rounds, timestamp: Date.now() });
      }
      
      board.sort((a, b) => b.maxBalance - a.maxBalance);
      board = board.slice(0, 10);
      
      setLeaderboard(board);
      await window.storage.set('casino-leaderboard', JSON.stringify(board), true);
    } catch (error) {
      console.error('Erro ao atualizar leaderboard:', error);
    }
  }, [leaderboard]);

  // Deletar dados salvos
  const deleteGameData = useCallback(async () => {
    try {
      await window.storage.delete('casino-game-data');
    } catch (error) {
      console.error('Erro ao deletar dados:', error);
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