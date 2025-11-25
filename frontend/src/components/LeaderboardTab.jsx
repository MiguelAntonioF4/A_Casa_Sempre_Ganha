import React from 'react';
import { Award } from 'lucide-react';

const LeaderboardTab = ({ leaderboard }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-yellow-600">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
          <Award className="w-8 h-8" />
          🏆 Ranking Global - Maiores Scores
        </h2>

        <div className="mb-6 bg-blue-900 bg-opacity-30 p-4 rounded border-l-4 border-blue-500">
          <p className="text-sm text-blue-200">
            ℹ️ <strong>Seu score é salvo automaticamente!</strong> O ranking mostra o maior saldo que você já alcançou.
          </p>
        </div>

        {/* Tabela de Ranking */}
        <div className="bg-gray-800 bg-opacity-30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-yellow-600 text-black">
              <tr>
                <th className="px-4 py-3 text-left font-bold">#</th>
                <th className="px-4 py-3 text-left font-bold">Jogador</th>
                <th className="px-4 py-3 text-right font-bold">Score Máximo</th>
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
                    <td className="px-4 py-3 font-semibold">{player.user_name}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-green-400 font-bold text-lg">
                        ${parseFloat(player.max_balance).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400">
                      {player.total_rounds}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Estatísticas Globais */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-900 bg-opacity-30 p-4 rounded border-l-4 border-blue-500">
            <div className="text-blue-300 text-sm mb-1">Total de Jogadores</div>
            <div className="text-3xl font-bold">{leaderboard.length}</div>
          </div>
          <div className="bg-green-900 bg-opacity-30 p-4 rounded border-l-4 border-green-500">
            <div className="text-green-300 text-sm mb-1">Melhor Score</div>
            <div className="text-3xl font-bold">
              {leaderboard.length > 0 ? `$${parseFloat(leaderboard[0].max_balance).toFixed(2)}` : '$0'}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-900 bg-opacity-30 p-4 rounded border-l-4 border-yellow-500">
          <p className="text-sm text-gray-300">
            💡 <strong>Lembre-se:</strong> Mesmo o jogador com o maior score eventualmente perderá tudo 
            se continuar jogando. A casa sempre ganha a longo prazo!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTab;