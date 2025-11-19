import React from 'react';

const Header = ({ playerBalance }) => {
  return (
    <div className="bg-black bg-opacity-50 border-b-4 border-yellow-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-yellow-400">🎰 A Casa Sempre Ganha</h1>
          <p className="text-gray-400 text-sm">Teoria da Ruína do Jogador - Projeto Educativo SENAC</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-400">${playerBalance.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Capital do Jogador</div>
          <div className="text-xs text-yellow-300 mt-1">Casa: ∞ (Ilimitado)</div>
        </div>
      </div>
    </div>
  );
};

export default Header;