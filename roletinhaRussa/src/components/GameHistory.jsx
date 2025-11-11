import React from 'react';
import { History } from 'lucide-react';

const GameHistory = ({ gameHistory }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border-2 border-yellow-600 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
        <History className="w-5 h-5" />
        Histórico Recente
      </h3>
      {gameHistory.length === 0 ? (
        <p className="text-gray-400 text-center py-4">Nenhuma jogada ainda</p>
      ) : (
        <div className="space-y-2">
          {gameHistory.slice(0, 10).map((game, idx) => (
            <div 
              key={idx}
              className={`p-2 rounded text-sm ${
                game.won 
                  ? 'bg-green-900 bg-opacity-30 border-l-4 border-green-500' 
                  : 'bg-red-900 bg-opacity-30 border-l-4 border-red-500'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">#{game.round}</span>
                <span className={game.won ? 'text-green-400' : 'text-red-400'}>
                  {game.won ? `+$${game.payout}` : `-$${game.bet}`}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Resultado: <span className="font-bold">{game.result}</span> | 
                Saldo: ${game.balance.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameHistory;