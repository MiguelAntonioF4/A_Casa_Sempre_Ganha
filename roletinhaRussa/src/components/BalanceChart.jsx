import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BalanceChart = ({ balanceHistory, showLast50 = false }) => {
  const data = showLast50 ? balanceHistory.slice(-50) : balanceHistory;
  
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border-2 border-yellow-600">
      <h3 className="text-lg font-bold text-yellow-400 mb-3">
        📈 Evolução do Saldo {showLast50 && '(Últimas 50 rodadas)'}
      </h3>
      <ResponsiveContainer width="100%" height={showLast50 ? 250 : 400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="round" 
            stroke="#888"
            label={!showLast50 ? { value: 'Rodadas', position: 'insideBottom', offset: -5, fill: '#888' } : undefined}
          />
          <YAxis 
            stroke="#888"
            label={!showLast50 ? { value: 'Saldo ($)', angle: -90, position: 'insideLeft', fill: '#888' } : undefined}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #fbbf24' }}
            labelStyle={{ color: '#fbbf24' }}
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#10b981" 
            strokeWidth={showLast50 ? 2 : 3}
            dot={false}
            name="Saldo do Jogador"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;