import React from 'react';
import BalanceChart from './BalanceChart';
import { INITIAL_BALANCE, HOUSE_EDGE } from '../utils/rouletteConfig';
import { calculateExpectedLoss, calculateActualLoss, formatCurrency } from '../utils/calculations';

const StatsTab = ({ 
  playerBalance, 
  totalRounds, 
  wins, 
  losses, 
  winRate, 
  betAmount,
  balanceHistory 
}) => {
  const actualLoss = calculateActualLoss(INITIAL_BALANCE, playerBalance);
  const expectedLoss = calculateExpectedLoss(totalRounds, betAmount, HOUSE_EDGE);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-yellow-600">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">📊 Estatísticas Detalhadas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Estatísticas Gerais */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">Desempenho</h3>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Saldo Atual</div>
              <div className="text-3xl font-bold text-green-400">${playerBalance.toFixed(2)}</div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Saldo Inicial</div>
              <div className="text-2xl font-bold">${INITIAL_BALANCE.toFixed(2)}</div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Lucro/Prejuízo</div>
              <div className={`text-2xl font-bold ${actualLoss > 0 ? 'text-red-400' : actualLoss < 0 ? 'text-green-400' : 'text-gray-400'}`}>
                {actualLoss > 0 ? '-' : actualLoss < 0 ? '+' : ''}{formatCurrency(actualLoss)}
              </div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Total Apostado</div>
              <div className="text-2xl font-bold">${(totalRounds * betAmount).toFixed(2)}</div>
            </div>
          </div>

          {/* Estatísticas de Jogadas */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">Jogadas</h3>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Total de Rodadas</div>
              <div className="text-3xl font-bold text-blue-400">{totalRounds}</div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Vitórias</div>
              <div className="text-2xl font-bold text-green-400">{wins}</div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Derrotas</div>
              <div className="text-2xl font-bold text-red-400">{losses}</div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Taxa de Vitória</div>
              <div className="text-2xl font-bold text-yellow-400">{winRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Esperado: ~47.37%</div>
            </div>
          </div>

          {/* Análise Matemática */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">Análise Matemática</h3>
            <div className="bg-red-900 bg-opacity-50 p-4 rounded border-l-4 border-red-500">
              <div className="text-red-300 text-sm mb-1">Vantagem da Casa</div>
              <div className="text-3xl font-bold">{HOUSE_EDGE}%</div>
              <div className="text-xs text-gray-400 mt-1">Roleta Americana (0 e 00)</div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Perda Esperada (teórica)</div>
              <div className="text-2xl font-bold text-orange-400">-${expectedLoss}</div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded">
              <div className="text-gray-400 text-sm">Perda Real</div>
              <div className="text-2xl font-bold text-red-400">-${actualLoss.toFixed(2)}</div>
            </div>
            <div className="bg-purple-900 bg-opacity-50 p-4 rounded border-l-4 border-purple-500">
              <div className="text-purple-300 text-sm mb-1">Probabilidade de Ruína</div>
              <div className="text-3xl font-bold">{playerBalance > 0 ? '~100%' : '100%'}</div>
              <div className="text-xs text-gray-400 mt-1">A longo prazo</div>
            </div>
          </div>
        </div>

        {/* Gráfico Grande */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-yellow-300 mb-4">📈 Evolução Completa do Saldo</h3>
          <div className="bg-gray-800 bg-opacity-30 p-4 rounded">
            <BalanceChart balanceHistory={balanceHistory} />
          </div>
        </div>

        {/* Mensagens Educativas */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-900 bg-opacity-30 p-4 rounded border-l-4 border-yellow-500">
            <div className="font-bold text-yellow-300 mb-2">💡 Você sabia?</div>
            <p className="text-sm text-gray-300">
              Com {totalRounds} rodadas jogadas, a matemática diz que você deveria ter perdido aproximadamente ${expectedLoss}. 
              {actualLoss > parseFloat(expectedLoss) 
                ? ' Você está perdendo mais que o esperado!' 
                : actualLoss < parseFloat(expectedLoss)
                ? ' Você está com sorte... por enquanto.'
                : ' Você está seguindo a expectativa matemática.'}
            </p>
          </div>
          <div className="bg-red-900 bg-opacity-30 p-4 rounded border-l-4 border-red-500">
            <div className="font-bold text-red-300 mb-2">⚠️ Aviso Importante</div>
            <p className="text-sm text-gray-300">
              A casa tem recursos infinitos. Mesmo que você ganhe temporariamente, 
              matematicamente é impossível vencer a longo prazo. A ruína é inevitável.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTab;