import React from 'react';
import { Play, Pause } from 'lucide-react';
import { autoBetTypes } from '../utils/rouletteConfig';

const AutoModePanel = ({
  autoMode,
  autoRounds,
  setAutoRounds,
  currentAutoRound,
  autoBetType,
  setAutoBetType,
  autoBetAmount,
  setAutoBetAmount,
  playerBalance,
  onStartStop
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-purple-600">
      <h3 className="text-xl font-bold text-purple-400 mb-4">🤖 Modo Automático</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Tipo de Aposta:</label>
          <select 
            value={autoBetType}
            onChange={(e) => setAutoBetType(e.target.value)}
            className="w-full bg-gray-700 border border-purple-600 rounded px-3 py-2"
            disabled={autoMode}
          >
            {autoBetTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Valor por Rodada:</label>
          <input
            type="number"
            min="5"
            step="5"
            value={autoBetAmount}
            onChange={(e) => setAutoBetAmount(parseInt(e.target.value) || 5)}
            className="w-full bg-gray-700 border border-purple-600 rounded px-3 py-2"
            disabled={autoMode}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2">Número de Rodadas: {autoRounds}</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={autoRounds}
            onChange={(e) => setAutoRounds(parseInt(e.target.value))}
            className="w-full"
            disabled={autoMode}
          />
        </div>
      </div>
      
      {autoMode && (
        <div className="mb-4 bg-purple-900 bg-opacity-50 p-3 rounded">
          <div className="flex justify-between items-center mb-2">
            <span>Progresso:</span>
            <span className="font-bold">{currentAutoRound} / {autoRounds}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-purple-500 h-3 rounded-full transition-all"
              style={{ width: `${(currentAutoRound / autoRounds) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <button
        onClick={onStartStop}
        disabled={playerBalance < autoBetAmount && !autoMode}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 rounded-lg transition shadow-lg flex items-center justify-center gap-2"
      >
        {autoMode ? (
          <>
            <Pause className="w-5 h-5" />
            PARAR SIMULAÇÃO
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            INICIAR SIMULAÇÃO ({autoRounds} rodadas)
          </>
        )}
      </button>
    </div>
  );
};

export default AutoModePanel;