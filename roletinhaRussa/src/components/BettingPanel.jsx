import React from 'react';
import { betTypes, MIN_BET } from '../utils/rouletteConfig';

const BettingPanel = ({ 
  betType, 
  setBetType, 
  betNumber, 
  setBetNumber, 
  betAmount, 
  setBetAmount, 
  playerBalance,
  spinning,
  onSpin
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-yellow-600">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">💰 Fazer Aposta</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Tipo de Aposta:</label>
          <select 
            value={betType}
            onChange={(e) => setBetType(e.target.value)}
            className="w-full bg-gray-700 border border-yellow-600 rounded px-3 py-2 text-white"
            disabled={spinning}
          >
            {betTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        {betType === 'number' && (
          <div>
            <label className="block text-sm font-semibold mb-2">Número (0-36 ou 00):</label>
            <input
              type="number"
              min="0"
              max="36"
              value={betNumber}
              onChange={(e) => setBetNumber(parseInt(e.target.value) || 0)}
              className="w-full bg-gray-700 border border-yellow-600 rounded px-3 py-2 text-white"
              disabled={spinning}
            />
          </div>
        )}
        
        <div className={betType === 'number' ? 'col-span-2' : ''}>
          <label className="block text-sm font-semibold mb-2">Valor da Aposta: ${betAmount}</label>
          <input
            type="range"
            min={MIN_BET}
            max={Math.max(MIN_BET, playerBalance)}
            step="10"
            value={betAmount}
            onChange={(e) => setBetAmount(parseInt(e.target.value))}
            className="w-full"
            disabled={spinning}
          />
        </div>
      </div>
      
      <button
        onClick={onSpin}
        disabled={spinning || playerBalance < betAmount}
        className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 rounded-lg text-xl transition shadow-lg"
      >
        {spinning ? '🎰 Girando...' : '🎲 GIRAR ROLETA'}
      </button>
    </div>
  );
};

export default BettingPanel;