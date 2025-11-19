import React from 'react';

const Tutorial = ({ showTutorial, setShowTutorial }) => {
  if (!showTutorial) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 max-w-2xl border-2 border-yellow-500">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">🎰 Bem-vindo ao A Casa Sempre Ganha!</h2>
        <div className="space-y-3 text-gray-200">
          <p className="text-lg">Este é um <strong>jogo educativo</strong> que demonstra a <strong>Teoria da Ruína do Jogador</strong>.</p>
          <div className="bg-red-900 bg-opacity-50 p-4 rounded border-l-4 border-red-500">
            <h3 className="font-bold text-yellow-300 mb-2">⚠️ Conceito Principal:</h3>
            <p>Mesmo que o jogo pareça justo, matematicamente, <strong>você SEMPRE perderá</strong> a longo prazo contra a casa que tem recursos infinitos.</p>
          </div>
          <div className="space-y-2">
            <p><strong>🎯 Como jogar:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Escolha o tipo de aposta (cor, par/ímpar, número, etc.)</li>
              <li>Defina o valor da aposta (mínimo $5)</li>
              <li>Gire a roleta e veja o resultado</li>
              <li>Use o modo automático para simular 1000 rodadas</li>
            </ul>
          </div>
          <div className="bg-yellow-900 bg-opacity-30 p-3 rounded">
            <p className="text-sm"><strong>💡 Vantagem da Casa:</strong> A roleta americana tem 0 e 00 (verde), dando à casa 5.26% de vantagem matemática.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowTutorial(false)}
          className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition"
        >
          Começar a Jogar 🎲
        </button>
      </div>
    </div>
  );
};

export default Tutorial;