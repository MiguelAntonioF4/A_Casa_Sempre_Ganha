import React from 'react';

const QuickStats = ({ wins, losses, totalRounds, currentAutoRound, winRate }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-lg p-4 border-2 border-green-600">
        <div className="text-green-300 text-sm mb-1">Vitórias</div>
        <div className="text-3xl font-bold">{wins}</div>
      </div>
      <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-lg p-4 border-2 border-red-600">
        <div className="text-red-300 text-sm mb-1">Derrotas</div>
        <div className="text-3xl font-bold">{losses}</div>
      </div>
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-4 border-2 border-blue-600">
        <div className="text-blue-300 text-sm mb-1">Total Rodadas</div>
        <div className="text-3xl font-bold">{totalRounds + currentAutoRound}</div>
      </div>
      <div className="bg-gradient-to-br from-yellow-800 to-yellow-900 rounded-lg p-4 border-2 border-yellow-600">
        <div className="text-yellow-300 text-sm mb-1">Taxa Vitória</div>
        <div className="text-3xl font-bold">{winRate}%</div>
      </div>
    </div>
  );
};

export default QuickStats;