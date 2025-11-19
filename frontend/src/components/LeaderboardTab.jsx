import React from 'react';
import { Award } from 'lucide-react';

const LeaderboardTab = ({ 
  leaderboard, 
  playerName, 
  setPlayerName, 
  onUpdateLeaderboard,
  playerBalance,
  totalRounds
}) => {
  const handleSave = () => {
    if (playerName.trim()) {
      onUpdateLeaderboard(playerName.trim(), playerBalance, totalRounds);
    }
  };

  const playerPosition = playerName && leaderboard.findIndex(p => p.name === playerName) >= 0 
    ? leaderboard.findIndex(p => p.name === playerName) + 1
    : null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-yellow-600">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
          <Award className="w-8 h-8" />
          🏆 Ranking Global - Maiores Saldos
        </h2>

        {/* Input de Nome */}
        <div className="mb-6 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
          <label className="block text-sm font-semibold mb-2">Registre seu nome para aparecer no ranking:</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Seu nome..."
              className="flex-1 bg-gray-700 border border-yellow-600 rounded px-4 py-2 text-white"
              maxLength={20}
            />
            <button
              onClick={handleSave}
              disabled={!playerName.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black font-bold px-6 py-2 rounded transition"
            >
              Salvar
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Seu melhor saldo será salvo automaticamente no ranking global
          </p>
        </div>

        {/* Tabela de Ranking */}
        <div className="bg-gray-800 bg-opacity-30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-yellow-600 text-black">
              <tr>
                <th className="px-4 py-3 text-left font-bold">#</th>
                <th className="px-4 py-3 text-left font-bold">Jogador</th>
                <th className="px-4 py-3 text-right font-bold">Maior Saldo</th>
                <th className="px-4 py-3 text-right font-bold">Rodadas</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-400">
                    Nenhum jogador no ranking ainda. Seja o primeiro!
                  </td>
                </tr>
              ) : (
                leaderboard.map((player, idx) => (
                  <tr 
                    key={idx}
                    className={`border-b border-gray-700 ${
                      idx === 0 ? 'bg-yellow-900 bg-opacity-30' :
                      idx === 1 ? 'bg-gray-700 bg-opacity-30' :
                      idx === 2 ? 'bg-orange-900 bg-opacity-20' :
                      'hover:bg-gray-800 bg-opacity-20'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className={`font-bold text-lg ${
                        idx === 0 ? 'text-yellow-400' :
                        idx === 1 ? 'text-gray-400' :
                        idx === 2 ? 'text-orange-400' :
                        'text-gray-500'
                      }`}>
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">{player.name}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-green-400 font-bold text-lg">
                        ${player.maxBalance.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400">
                      {player.rounds}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Estatísticas Globais */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-blue-900 bg-opacity-30 p-4 rounded border-l-4 border-blue-500">
            <div className="text-blue-300 text-sm mb-1">Total de Jogadores</div>
            <div className="text-3xl font-bold">{leaderboard.length}</div>
          </div>
          <div className="bg-green-900 bg-opacity-30 p-4 rounded border-l-4 border-green-500">
            <div className="text-green-300 text-sm mb-1">Melhor Saldo</div>
            <div className="text-3xl font-bold">
              {leaderboard.length > 0 ? `$${leaderboard[0].maxBalance.toFixed(2)}` : '$0'}
            </div>
          </div>
          <div className="bg-purple-900 bg-opacity-30 p-4 rounded border-l-4 border-purple-500">
            <div className="text-purple-300 text-sm mb-1">Sua Posição</div>
            <div className="text-3xl font-bold">
              {playerPosition ? `#${playerPosition}` : '-'}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-900 bg-opacity-30 p-4 rounded border-l-4 border-yellow-500">
          <p className="text-sm text-gray-300">
            💡 <strong>Lembre-se:</strong> Mesmo o jogador com o maior saldo eventualmente perderá tudo 
            se continuar jogando. A casa sempre ganha a longo prazo!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTab;